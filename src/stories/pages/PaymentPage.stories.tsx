import type { Meta, StoryObj } from "@storybook/react-vite";

import { PaymentPage } from "../../pages";
import { createMockStore } from "../utils/storyHelpers";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";

const meta = {
  component: PaymentPage,
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
} satisfies Meta<typeof PaymentPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (Story) => {
      const store = createMockStore({
        bookedTicket: {
          sessionId: "session-1",
          date: "2026-01-05",
          time: "14:00",
          seats: [
            { row: 1, number: 5 },
            { row: 1, number: 6 },
          ],
        },
      });
      return (
        <Provider store={store}>
          <Story />
        </Provider>
      );
    },
  ],
};

export const EmptyBookingInfo: Story = {
  decorators: [
    (Story) => {
      const store = createMockStore({
        bookedTicket: {
          sessionId: "",
          date: "",
          time: "",
          seats: [],
        },
      });
      return (
        <Provider store={store}>
          <Story />
        </Provider>
      );
    },
  ],
};

export const ManySeats: Story = {
  decorators: [
    (Story) => {
      const store = createMockStore({
        bookedTicket: {
          sessionId: "session-4",
          date: "2026-01-20",
          time: "18:30",
          seats: [
            { row: 3, number: 5 },
            { row: 3, number: 6 },
            { row: 3, number: 7 },
            { row: 3, number: 8 },
            { row: 4, number: 5 },
            { row: 4, number: 6 },
          ],
        },
      });
      return (
        <Provider store={store}>
          <Story />
        </Provider>
      );
    },
  ],
};

export const ProcessingPayment: Story = {
  decorators: [
    (Story) => {
      const store = createMockStore({
        bookedTicket: {
          sessionId: "session-6",
          date: "2026-01-18",
          time: "21:00",
          seats: [
            { row: 4, number: 7 },
            { row: 4, number: 8 },
          ],
        },
        isProcessingPayment: true,
      });
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
      const store = createMockStore({
        bookedTicket: {
          sessionId: "session-7",
          date: "2026-01-25",
          time: "19:30",
          seats: [
            { row: 2, number: 10 },
            { row: 2, number: 11 },
          ],
        },
        isPaymentSuccessful: true,
      });
      return (
        <Provider store={store}>
          <Story />
        </Provider>
      );
    },
  ],
};
export const WithValidationErrors: Story = {
  decorators: [
    (Story) => {
      const store = createMockStore({
        bookedTicket: {
          sessionId: "session-8",
          date: "2026-01-30",
          time: "15:00",
          seats: [
            { row: 6, number: 9 },
            { row: 6, number: 10 },
          ],
        },
      });
      return (
        <Provider store={store}>
          <Story />
        </Provider>
      );
    },
  ],
  play: async ({ canvasElement }) => {
    const canvas = canvasElement;
    const submitButton = canvas.querySelector('button[type="submit"]');
    if (submitButton) {
      (submitButton as HTMLButtonElement).click();
    }
  },
};
