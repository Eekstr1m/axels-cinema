import type { Meta, StoryObj } from "@storybook/react-vite";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";

import { SessionsPage } from "../../pages";
import { createMockStore } from "../utils/storyHelpers";

const meta = {
  component: SessionsPage,
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
} satisfies Meta<typeof SessionsPage>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (Story) => {
      const store = createMockStore({
        schedule: [
          {
            date: "2026-01-12",
            sessions: [
              { id: "session-1", time: "10:00" },
              { id: "session-2", time: "12:30" },
              { id: "session-3", time: "15:00" },
              { id: "session-4", time: "18:00" },
            ],
          },
          {
            date: "2026-01-13",
            sessions: [
              { id: "session-5", time: "11:00" },
              { id: "session-6", time: "14:00" },
              { id: "session-7", time: "17:00" },
              { id: "session-8", time: "20:00" },
            ],
          },
          {
            date: "2026-01-14",
            sessions: [
              { id: "session-9", time: "13:00" },
              { id: "session-10", time: "16:00" },
              { id: "session-11", time: "19:00" },
            ],
          },
        ],
        selectedDate: "2026-01-12",
      });

      return (
        <Provider store={store}>
          <Story />
        </Provider>
      );
    },
  ],
};

export const LoadingSchedule: Story = {
  decorators: [
    (Story) => {
      const store = createMockStore({
        isLoadingSchedule: true,
      });

      return (
        <Provider store={store}>
          <Story />
        </Provider>
      );
    },
  ],
};

export const NoSessionsForSelectedDate: Story = {
  decorators: [
    (Story) => {
      const store = createMockStore({
        schedule: [
          {
            date: "2026-01-12",
            sessions: [],
          },
          {
            date: "2026-01-13",
            sessions: [
              { id: "session-1", time: "14:00" },
              { id: "session-2", time: "18:00" },
            ],
          },
        ],
        selectedDate: "2026-01-12",
      });

      return (
        <Provider store={store}>
          <Story />
        </Provider>
      );
    },
  ],
};

export const SingleDaySchedule: Story = {
  decorators: [
    (Story) => {
      const store = createMockStore({
        schedule: [
          {
            date: "2026-01-15",
            sessions: [
              { id: "session-1", time: "18:00" },
              { id: "session-2", time: "20:30" },
            ],
          },
        ],
        selectedDate: "2026-01-15",
      });

      return (
        <Provider store={store}>
          <Story />
        </Provider>
      );
    },
  ],
};

export const EmptySchedule: Story = {
  decorators: [
    (Story) => {
      const store = createMockStore({
        schedule: [],
        selectedDate: "",
      });

      return (
        <Provider store={store}>
          <Story />
        </Provider>
      );
    },
  ],
};
