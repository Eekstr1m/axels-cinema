import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DateSelector from "./DateSelector";

const mockDates = ["2025-12-25", "2025-12-26", "2025-12-27"];

describe(DateSelector, () => {
  const onDateSelect = jest.fn();

  beforeEach(() => {
    onDateSelect.mockClear();
  });

  test("DateSelector renders", () => {
    render(
      <DateSelector
        dates={mockDates}
        selectedDate={"2025-12-25"}
        onDateSelect={onDateSelect}
      />,
    );

    expect(screen.getByText("Select a date")).toBeInTheDocument();
  });

  test("DateSelector renders all dates", () => {
    render(
      <DateSelector
        dates={mockDates}
        selectedDate={"2025-12-25"}
        onDateSelect={onDateSelect}
      />,
    );

    // Check for day "25"
    expect(screen.getByText("25")).toBeInTheDocument();

    // Check for month "Dec"
    const monthElements = screen.getAllByText("Dec");
    expect(monthElements.length).toBeGreaterThan(0);
  });

  test("DateSelector renders with empty dates and no selected date", () => {
    render(
      <DateSelector dates={[]} selectedDate={""} onDateSelect={onDateSelect} />,
    );

    expect(screen.getByText("Select a date")).toBeInTheDocument();
    expect(
      screen.queryByText(/^[A-Za-z]{3}, [A-Za-z]{3} \d{2}$/),
    ).not.toBeInTheDocument();
  });

  test("Clicking a date calls onDateSelect with correct date", async () => {
    render(
      <DateSelector
        dates={mockDates}
        selectedDate={"2025-12-25"}
        onDateSelect={onDateSelect}
      />,
    );

    const user = userEvent.setup();
    await user.click(screen.getByText(/26/));
    expect(onDateSelect).toHaveBeenCalledWith("2025-12-26");
    expect(onDateSelect).toHaveBeenCalledTimes(1);
  });

  test("DateSelector matches snapshot", () => {
    const { asFragment } = render(
      <DateSelector
        dates={mockDates}
        selectedDate={"2025-12-25"}
        onDateSelect={onDateSelect}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
