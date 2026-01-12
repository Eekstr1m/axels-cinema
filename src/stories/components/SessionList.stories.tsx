import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import SessionList from "../../components/SessionList";
import type { SessionListItem } from "../../types";

const sessions: SessionListItem[] = [
  {
    id: "session-2025-12-25-0",
    time: "10:00",
  },
  {
    id: "session-2025-12-25-1",
    time: "12:00",
  },
  {
    id: "session-2025-12-25-2",
    time: "14:00",
  },
  {
    id: "session-2025-12-25-5",
    time: "20:00",
  },
];

const meta = {
  component: SessionList,
  tags: ["autodocs"],
  args: { onSessionSelect: fn() },
  argTypes: {
    sessions: { control: "object" },
  },
} satisfies Meta<typeof SessionList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    sessions,
  },
};

export const WithoutSessions: Story = {
  args: {
    sessions: [],
  },
};

export const SingleSession: Story = {
  args: {
    sessions: [
      {
        id: "session-solo",
        time: "18:00",
      },
    ],
  },
};

export const FullDaySchedule: Story = {
  args: {
    sessions: [
      { id: "session-1", time: "10:00" },
      { id: "session-2", time: "12:00" },
      { id: "session-3", time: "14:00" },
      { id: "session-4", time: "16:00" },
      { id: "session-5", time: "18:00" },
      { id: "session-6", time: "20:00" },
    ],
  },
};
