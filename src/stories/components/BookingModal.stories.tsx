import AccessTimeIcon from "@mui/icons-material/AccessTime";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState, type ComponentProps } from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import { fn } from "storybook/test";

import { BookingModal } from "../../components";
import {
  SessionCard,
  SessionTimeText,
  TimeBox,
} from "../../styled/components/SessionList.styled";
import type { SessionDetails } from "../../types";
import { createMockStore } from "../utils/storyHelpers";

const sessionDetails: SessionDetails = {
  sessionId: "session-1",
  date: "2026-01-10",
  time: "18:00",
  totalSeats: 20,
  bookedSeats: 5,
  availableSeats: 15,
  seats: [
    [
      { row: 1, number: 1, isBooked: false },
      { row: 1, number: 2, isBooked: false },
      { row: 1, number: 3, isBooked: true },
      { row: 1, number: 4, isBooked: false },
    ],
    [
      { row: 2, number: 1, isBooked: false },
      { row: 2, number: 2, isBooked: true },
      { row: 2, number: 3, isBooked: false },
      { row: 2, number: 4, isBooked: false },
    ],
  ],
};

type StoryProps = ComponentProps<typeof BookingModal>;

const meta: Meta<StoryProps> = {
  component: BookingModal,
  tags: ["autodocs"],
  argTypes: {
    open: { control: "boolean" },
    onClose: { action: "closed" },
    date: { control: "text" },
    sessionDetails: { control: "object" },
  },
  args: {
    onClose: fn(),
  },
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
} satisfies Meta<typeof BookingModal>;

export default meta;
type Story = StoryObj<typeof meta>;

function ModalWrapper(modalProps: StoryProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <SessionCard
        onClick={() => setOpen(true)}
        sx={{ margin: "0 auto", maxWidth: 300 }}
      >
        <TimeBox>
          <AccessTimeIcon color="primary" />
          <SessionTimeText variant="h5">{sessionDetails.time}</SessionTimeText>
        </TimeBox>
      </SessionCard>
      <BookingModal
        {...modalProps}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

export const Default: Story = {
  args: {
    open: false,
    date: "2026-01-10",
    sessionDetails,
  },
  render: (args) => <ModalWrapper {...args} />,
};

export const LoadingState: Story = {
  args: {
    open: false,
    date: "2026-01-10",
    sessionDetails: null,
  },
  render: (args) => <ModalWrapper {...args} />,
};

export const NoDateSelected: Story = {
  args: {
    open: false,
    date: "",
    sessionDetails,
  },
  render: (args) => <ModalWrapper {...args} />,
};

export const FullyAvailableSeats: Story = {
  args: {
    open: false,
    date: "2026-01-10",
    sessionDetails: {
      ...sessionDetails,
      availableSeats: 20,
      bookedSeats: 0,
      seats: sessionDetails.seats.map((row) =>
        row.map((seat) => ({ ...seat, isBooked: false }))
      ),
    },
  },
  render: (args) => <ModalWrapper {...args} />,
};

export const NoAvailableSeats: Story = {
  args: {
    open: false,
    date: "2026-01-10",
    sessionDetails: {
      ...sessionDetails,
      availableSeats: 0,
      bookedSeats: 20,
      seats: sessionDetails.seats.map((row) =>
        row.map((seat) => ({ ...seat, isBooked: true }))
      ),
    },
  },
  render: (args) => <ModalWrapper {...args} />,
};

export const LargeSeatingLayout: Story = {
  args: {
    open: false,
    date: "2026-01-10",
    sessionDetails: {
      sessionId: "session-large",
      date: "2026-01-10",
      time: "20:00",
      totalSeats: 80,
      bookedSeats: 25,
      availableSeats: 55,
      seats: Array.from({ length: 8 }, (_, rowIndex) =>
        Array.from({ length: 10 }, (_, seatIndex) => ({
          row: rowIndex + 1,
          number: seatIndex + 1,
          isBooked: Math.random() > 0.7,
        }))
      ),
    },
  },
  render: (args) => <ModalWrapper {...args} />,
};

export const SingleRow: Story = {
  args: {
    open: false,
    date: "2026-01-10",
    sessionDetails: {
      sessionId: "session-single",
      date: "2026-01-10",
      time: "14:00",
      totalSeats: 8,
      bookedSeats: 2,
      availableSeats: 6,
      seats: [
        Array.from({ length: 8 }, (_, i) => ({
          row: 1,
          number: i + 1,
          isBooked: i === 2 || i === 5,
        })),
      ],
    },
  },
  render: (args) => <ModalWrapper {...args} />,
};
