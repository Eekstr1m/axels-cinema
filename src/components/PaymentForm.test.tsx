import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { BrowserRouter } from "react-router";
import cinemaReducer from "../redux/cinemaSlice";
import PaymentForm from "./PaymentForm";

const mockStore = configureStore({
  reducer: {
    cinema: cinemaReducer,
  },
});

describe(PaymentForm, () => {
  test("PaymentForm renders Personal Information section", () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <PaymentForm />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("Personal Information")).toBeInTheDocument();
    expect(screen.getByLabelText("Full Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Phone Number")).toBeInTheDocument();
  });

  test("PaymentForm renders Payment Information section", () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <PaymentForm />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("Payment Information")).toBeInTheDocument();
    expect(screen.getByLabelText("Card Number")).toBeInTheDocument();
    expect(screen.getByLabelText("Expiry Date")).toBeInTheDocument();
    expect(screen.getByLabelText("CVV")).toBeInTheDocument();
  });

  test("PaymentForm renders Submit button", () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <PaymentForm />
        </BrowserRouter>
      </Provider>
    );

    expect(
      screen.getByRole("button", { name: /confirm payment/i })
    ).toBeInTheDocument();
  });

  test("PaymentForm shows validation errors on empty submit", async () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <PaymentForm />
        </BrowserRouter>
      </Provider>
    );

    const submitButton = screen.getByRole("button", {
      name: /confirm payment/i,
    });
    const user = userEvent.setup();

    await user.click(submitButton);
    // There should be 6 fields with required validation errors
    expect(screen.getAllByText(/is required/i)).toHaveLength(6);
  });

  test("PaymentForm shows errors for invalid data inputs", async () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <PaymentForm />
        </BrowserRouter>
      </Provider>
    );

    const user = userEvent.setup();

    const fullNameInput = screen.getByLabelText("Full Name");
    await user.type(fullNameInput, "A");
    // Trigger onBlur validation mode
    await user.tab();
    expect(
      await screen.findByText("Full Name must be at least 2 characters")
    ).toBeInTheDocument();

    await user.type(fullNameInput, "1");
    await user.tab();
    expect(
      await screen.findByText("Full Name can only contain letters")
    ).toBeInTheDocument();

    const emailInput = screen.getByLabelText("Email");
    await user.type(emailInput, "invalidEmail");
    await user.tab();
    expect(await screen.findByText("Invalid email format")).toBeInTheDocument();

    const phoneInput = screen.getByLabelText("Phone Number");
    await user.type(phoneInput, "123");
    await user.tab();
    expect(await screen.findByText("Invalid Phone Number")).toBeInTheDocument();

    const cardNumberInput = screen.getByLabelText("Card Number");
    await user.type(cardNumberInput, "1234");
    await user.tab();
    expect(
      await screen.findByText("Card Number must be 13 to 19 digits")
    ).toBeInTheDocument();
    await user.clear(cardNumberInput);

    await user.type(cardNumberInput, "1234567890101112");
    await user.tab();
    expect(await screen.findByText("Invalid Card Number")).toBeInTheDocument();

    const expiryDateInput = screen.getByLabelText("Expiry Date");
    await user.type(expiryDateInput, "1325");
    await user.tab();
    expect(
      await screen.findByText("Expiry Date must be in MM/YY format")
    ).toBeInTheDocument();
    await user.clear(expiryDateInput);

    await user.type(expiryDateInput, "1020");
    await user.tab();
    expect(await screen.findByText("Card has expired")).toBeInTheDocument();

    const cvvInput = screen.getByLabelText("CVV");
    await user.type(cvvInput, "1");
    await user.tab();
    expect(
      await screen.findByText("CVV must be 3 or 4 digits")
    ).toBeInTheDocument();
  });

  test("PaymentForm submits form with valid data and dispatches processPayment action", async () => {
    const store = configureStore({
      reducer: {
        cinema: cinemaReducer,
      },
    });

    const dispatchSpy = jest.spyOn(store, "dispatch");

    render(
      <Provider store={store}>
        <BrowserRouter>
          <PaymentForm />
        </BrowserRouter>
      </Provider>
    );

    const user = userEvent.setup();

    await user.type(screen.getByLabelText("Full Name"), "John Doe");
    await user.type(screen.getByLabelText("Email"), "john.doe@example.com");
    await user.type(screen.getByLabelText("Phone Number"), "+1234567890");
    await user.type(screen.getByLabelText("Card Number"), "4532015112830366");
    await user.type(screen.getByLabelText("Expiry Date"), "1230");
    await user.type(screen.getByLabelText("CVV"), "123");

    const submitButton = screen.getByRole("button", {
      name: /confirm payment/i,
    });

    await user.click(submitButton);

    // Check that no validation errors are shown
    expect(screen.queryByText(/is required/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/must be at least/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/can only contain/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/invalid/i)).not.toBeInTheDocument();

    // Verify that dispatch was called with processPayment action
    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "cinema/processPayment",
        payload: expect.objectContaining({
          fullName: "John Doe",
          email: "john.doe@example.com",
          phone: "+1234567890",
          cardNumber: "4532 0151 1283 0366",
          expiryDate: "12/30",
          cvv: "123",
        }),
      })
    );

    expect(dispatchSpy).toHaveBeenCalledTimes(1);

    dispatchSpy.mockRestore();
  });

  test('PaymentForm shows success message after successful payment', async () => {
    const successStore = configureStore({
        reducer: {
            cinema: (state = { isPaymentSuccessful: true }) => state
        }
    })

    render(<Provider store={successStore}>
        <BrowserRouter>
          <PaymentForm />
        </BrowserRouter>
    </Provider>)
  })

  test("PaymentForm matches snapshot", () => {
    const { asFragment } = render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <PaymentForm />
        </BrowserRouter>
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
