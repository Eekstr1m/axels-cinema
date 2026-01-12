import type { Meta, StoryObj } from "@storybook/react-vite";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";

import { PaymentForm } from "../../components";
import { createMockStore } from "../utils/storyHelpers";

const meta = {
  component: PaymentForm,
  tags: ["autodocs"],
  decorators: [
    (Story) => {
      const store = createMockStore();
      return (
        <Provider store={store}>
          <MemoryRouter>
            <Story />
          </MemoryRouter>
        </Provider>
      );
    },
  ],
} satisfies Meta<typeof PaymentForm>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {};

export const ProcessingPayment: Story = {
  decorators: [
    (Story) => {
      const store = createMockStore({ isProcessingPayment: true });

      return (
        <Provider store={store}>
          <Story />
        </Provider>
      );
    },
  ],
};

export const PaymentSuccessful: Story = {
  decorators: [
    (Story) => {
      const store = createMockStore({ isPaymentSuccessful: true });

      return (
        <Provider store={store}>
          <Story />
        </Provider>
      );
    },
  ],
};

export const WithValidationErrors: Story = {
  play: async ({ canvasElement }) => {
    const canvas = canvasElement;
    const submitButton = canvas.querySelector('button[type="submit"]');
    if (submitButton) {
      (submitButton as HTMLButtonElement).click();
    }
  },
};

export const PrefilledForm: Story = {
  decorators: [
    (Story) => {
      const store = createMockStore({});
      return (
        <Provider store={store}>
          <Story />
        </Provider>
      );
    },
  ],
  play: async ({ canvasElement }) => {
    const inputs = canvasElement.querySelectorAll("input");
    const [fullName, email, phone, cardNumber, expiryDate, cvv] = inputs;

    if (fullName) (fullName as HTMLInputElement).value = "John Doe";
    if (email) (email as HTMLInputElement).value = "john.doe@example.com";
    if (phone) (phone as HTMLInputElement).value = "+1234567890";
    if (cardNumber)
      (cardNumber as HTMLInputElement).value = "4532 0151 1283 0366";
    if (expiryDate) (expiryDate as HTMLInputElement).value = "12/30";
    if (cvv) (cvv as HTMLInputElement).value = "123";

    inputs.forEach((input) => {
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.dispatchEvent(new Event("blur", { bubbles: true }));
    });
  },
};
