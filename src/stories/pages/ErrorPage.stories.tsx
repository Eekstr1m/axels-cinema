import type { Meta, StoryObj } from "@storybook/react-vite";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";

import { ErrorPage } from "../../pages";
import { createMockStore } from "../utils/storyHelpers";

const meta = {
  component: ErrorPage,
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
} satisfies Meta<typeof ErrorPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithCustomErrorMessage: Story = {
  decorators: [
    (Story) => {
      const store = createMockStore({
        isError: true,
        errorMessage: "Failed to load cinema schedule.",
      });
      return (
        <Provider store={store}>
          <Story />
        </Provider>
      );
    },
  ],
};
