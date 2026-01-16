$(function () {
  const API_BASE = "https://dummyjson.com";
  const PAGE_SIZE = 12;

  let todos = [];
  let total = 0;
  let skip = 0;
  let loading = false;

  const $todoList = $("#todoList");
  const $loader = $("#loader");
  const $loadMoreBtn = $("#loadMoreBtn");

  fetchTodos({ reset: true });

  $("#addTodoForm").on("submit", function (e) {
    e.preventDefault();
    addTodo();
  });

  $todoList.on("change", ".toggle", function () {
    const id = Number($(this).closest(".todo-card").data("id"));
    const completed = $(this).is(":checked");
    updateTodo(id, completed);
  });

  $todoList.on("click", ".delete-btn", function () {
    const id = Number($(this).closest(".todo-card").data("id"));
    removeTodo(id);
  });

  $loadMoreBtn.on("click", function () {
    fetchTodos({ reset: false });
  });

  function fetchTodos({ reset }) {
    if (loading) return;
    loading = true;
    $loader.removeAttr("hidden");

    const currentSkip = reset ? 0 : skip;

    $.ajax({
      url: `${API_BASE}/todos`,
      method: "GET",
      data: { limit: PAGE_SIZE, skip: currentSkip },
      success: function (data) {
        total = data.total || data.todos.length;
        todos = reset ? data.todos : todos.concat(data.todos);
        skip = todos.length;
        renderTodos();
        $("#statTotal").text(total);
        const hasMore = todos.length < total;
        $loadMoreBtn.attr("hidden", !hasMore);
      },
      complete: function () {
        loading = false;
        $loader.attr("hidden", true);
      },
    });
  }

  function addTodo() {
    const value = $.trim($("#todoInput").val());
    if (!value) return;

    $("#addBtn").prop("disabled", true);

    $.ajax({
      url: `${API_BASE}/todos/add`,
      method: "POST",
      contentType: "application/json",
      dataType: "json",
      data: JSON.stringify({
        todo: value,
        completed: false,
        userId: Math.floor(Math.random() * 30) + 1,
      }),
      success: function (data) {
        const newTodo = {
          id: data.id || Date.now(),
          todo: data.todo,
          completed: false,
          userId: data.userId,
        };
        todos.unshift(newTodo);
        skip = todos.length;
        total += 1;
        $("#todoInput").val("");
        renderTodos();
        $("#statTotal").text(total);
        const hasMore = todos.length < total;
        $loadMoreBtn.attr("hidden", !hasMore);
      },
      complete: function () {
        $("#addBtn").prop("disabled", false);
      },
    });
  }

  function updateTodo(id, completed) {
    todos = todos.map(function (item) {
      if (item.id === id) {
        return Object.assign({}, item, { completed: completed });
      }
      return item;
    });
    renderTodos();

    $.ajax({
      url: `${API_BASE}/todos/${id}`,
      method: "PUT",
      contentType: "application/json",
      data: JSON.stringify({ completed: completed }),
    });
  }

  function removeTodo(id) {
    todos = todos.filter(function (item) {
      return item.id !== id;
    });
    skip = todos.length;
    total = Math.max(0, total - 1);
    renderTodos();
    $("#statTotal").text(total);
    const hasMore = todos.length < total;
    $loadMoreBtn.attr("hidden", !hasMore);

    $.ajax({
      url: `${API_BASE}/todos/${id}`,
      method: "DELETE",
    });
  }

  function renderTodos() {
    if (!todos.length) {
      $todoList.html('<div class="empty-state">No tasks</div>');
      return;
    }

    const html = todos
      .map(function (todo) {
        return (
          '<div class="todo-card' +
          (todo.completed ? " completed" : "") +
          '" data-id="' +
          todo.id +
          '">' +
          '<label class="todo-checkbox">' +
          '<input type="checkbox" class="toggle" ' +
          (todo.completed ? "checked" : "") +
          ' />' +
          '<span class="checkmark"></span>' +
          "</label>" +
          '<div class="todo-body">' +
          '<div class="todo-title">' +
          todo.todo +
          "</div>" +
          '<div class="todo-meta">User #' +
          todo.userId +
          "</div>" +
          "</div>" +
          '<button class="delete-btn" aria-label="Remove">✕</button>' +
          "</div>"
        );
      })
      .join("");

    $todoList.html(html);
  }
});
