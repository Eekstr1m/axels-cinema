// Elements
const todoList = document.getElementById("todoList");
const addTodoForm = document.getElementById("addTodoForm");
const todoInput = document.getElementById("todoInput");
const statTotal = document.getElementById("statTotal");
const loader = document.getElementById("loader");
const loadMoreBtn = document.getElementById("loadMoreBtn");

// API
const API_URL = "https://dummyjson.com/todos";
const LIMIT = 12;

// State
const todos$ = new rxjs.BehaviorSubject([]);
const currentSkip$ = new rxjs.BehaviorSubject(0);
const totalTodos$ = new rxjs.BehaviorSubject(0);
const loading$ = new rxjs.BehaviorSubject(false);

// Actions
const addTodo$ = new rxjs.Subject();
const toggleTodo$ = new rxjs.Subject();
const deleteTodo$ = new rxjs.Subject();
const loadMore$ = new rxjs.Subject();

function fetchTodos(skip = 0) {
  loading$.next(true);

  return rxjs.ajax
    .ajax({
      url: `${API_URL}?limit=${LIMIT}&skip=${skip}`,
      method: "GET",
      crossDomain: true,
    })
    .pipe(
      rxjs.map((response) => ({
        todos: response.response.todos,
        total: response.response.total,
      })),
      rxjs.catchError((error) => {
        console.error("Error fetching todos:", error);
        loading$.next(false);
        return rxjs.of({ todos: [], total: 0 });
      }),
    );
}

addTodo$
  .pipe(
    rxjs.filter((todoText) => todoText.trim() !== ""),
    rxjs.switchMap((todoText) => {
      return rxjs.ajax
        .ajax({
          url: `${API_URL}/add`,
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: { todo: todoText, completed: false, userId: 1 },
        })
        .pipe(
          rxjs.map((response) => response.response),
          rxjs.catchError((error) => {
            console.error("Error adding todo:", error);
            return rxjs.of({
              id: Date.now(),
              todo: todoText,
              completed: false,
              userId: 1,
            });
          }),
        );
    }),
  )
  .subscribe((newTodo) => {
    const currentTodos = todos$.value;
    todos$.next([newTodo, ...currentTodos]);
    totalTodos$.next(totalTodos$.value + 1);
    todoInput.value = "";
  });

toggleTodo$
  .pipe(
    rxjs.switchMap((todoId) => {
      const currentTodos = todos$.value;
      const todo = currentTodos.find((t) => t.id === todoId);

      return rxjs.ajax
        .ajax({
          url: `${API_URL}/${todoId}`,
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: { completed: !todo.completed },
        })
        .pipe(
          rxjs.map(() => todoId),
          rxjs.catchError((error) => {
            console.error("Error toggling todo:", error);
            return rxjs.of(todoId);
          }),
        );
    }),
  )
  .subscribe((todoId) => {
    const currentTodos = todos$.value;
    const updatedTodos = currentTodos.map((todo) =>
      todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
    );
    todos$.next(updatedTodos);
  });

deleteTodo$
  .pipe(
    rxjs.switchMap((todoId) => {
      return rxjs.ajax
        .ajax({
          url: `${API_URL}/${todoId}`,
          method: "DELETE",
        })
        .pipe(
          rxjs.map(() => todoId),
          rxjs.catchError((error) => {
            console.error("Error deleting todo:", error);
            return rxjs.of(todoId);
          }),
        );
    }),
  )
  .subscribe((todoId) => {
    const currentTodos = todos$.value;
    const updatedTodos = currentTodos.filter((todo) => todo.id !== todoId);
    todos$.next(updatedTodos);
    totalTodos$.next(totalTodos$.value - 1);
  });

loadMore$
  .pipe(rxjs.switchMap(() => fetchTodos(currentSkip$.value)))
  .subscribe(({ todos, total }) => {
    const currentTodos = todos$.value;
    todos$.next([...currentTodos, ...todos]);
    currentSkip$.next(currentSkip$.value + LIMIT);
    totalTodos$.next(total);
    loading$.next(false);
  });

function renderTodos(todos) {
  if (todos.length === 0) {
    todoList.innerHTML = '<div class="empty-state">No todos yet</div>';
    return;
  }

  todoList.innerHTML = todos
    .map(
      (todo) => `
    <div class="todo-card ${todo.completed ? "completed" : ""}" data-id="${todo.id}">
      <label class="todo-checkbox">
        <input type="checkbox" ${todo.completed ? "checked" : ""} data-id="${todo.id}" />
        <span class="checkmark"></span>
      </label>
      <div class="todo-body">
        <div class="todo-title">${todo.todo}</div>
        <div class="todo-meta">User ID: ${todo.userId}</div>
      </div>
      <button class="delete-btn" data-id="${todo.id}">Delete</button>
    </div>
  `,
    )
    .join("");

  attachEventListeners();
}

function attachEventListeners() {
  const checkboxes = todoList.querySelectorAll(
    '.todo-checkbox input[type="checkbox"]',
  );
  checkboxes.forEach((checkbox) => {
    rxjs.fromEvent(checkbox, "change").subscribe(() => {
      const todoId = parseInt(checkbox.dataset.id);
      toggleTodo$.next(todoId);
    });
  });

  const deleteButtons = todoList.querySelectorAll(".delete-btn");
  deleteButtons.forEach((button) => {
    rxjs.fromEvent(button, "click").subscribe(() => {
      const todoId = parseInt(button.dataset.id);
      deleteTodo$.next(todoId);
    });
  });
}

function updateLoadMoreButton(currentTodosCount, total) {
  if (currentTodosCount >= total) {
    loadMoreBtn.hidden = true;
  } else {
    loadMoreBtn.hidden = false;
  }
}

// Subscribes
todos$.subscribe((todos) => {
  renderTodos(todos);
  updateLoadMoreButton(todos.length, totalTodos$.value);
});
totalTodos$.subscribe((total) => (statTotal.textContent = total));
loading$.subscribe((isLoading) => (loader.hidden = !isLoading));

// Events
rxjs
  .fromEvent(addTodoForm, "submit")
  .pipe(rxjs.tap((e) => e.preventDefault()))
  .subscribe(() => {
    addTodo$.next(todoInput.value.trim());
  });

rxjs.fromEvent(loadMoreBtn, "click").subscribe(() => {
  loadMore$.next();
});

// Initial fetch
fetchTodos(0).subscribe(({ todos, total }) => {
  todos$.next(todos);
  currentSkip$.next(LIMIT);
  totalTodos$.next(total);
  loading$.next(false);
});
