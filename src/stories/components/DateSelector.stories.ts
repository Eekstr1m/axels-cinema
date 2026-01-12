import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ComponentProps } from "react";
import { fn } from "storybook/test";

import { DateSelector } from "../../components";

type StoryProps = ComponentProps<typeof DateSelector>;

const dates = [
  "2026-01-01",
  "2026-01-02",
  "2026-01-03",
  "2026-01-04",
  "2026-01-05",
];

const meta: Meta<StoryProps> = {
  component: DateSelector,
  tags: ["autodocs"],
  args: { onDateSelect: fn() },
  argTypes: {
    dates: { options: dates, control: "object" },
    selectedDate: { control: "select", options: dates },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    dates: [
      "2026-01-12",
      "2026-01-13",
      "2026-01-14",
      "2026-01-15",
      "2026-01-16",
      "2026-01-17",
      "2026-01-18",
    ],
    selectedDate: "2026-01-15",
  },
};

export const WithoutDates: Story = {
  args: {
    dates: [],
    selectedDate: undefined,
  },
};

export const SingleDate: Story = {
  args: {
    dates: ["2026-01-15"],
    selectedDate: "2026-01-15",
  },
};

export const NoSelection: Story = {
  args: {
    dates: dates,
    selectedDate: "",
  },
};
