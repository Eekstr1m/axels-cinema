import { render, screen } from "@testing-library/react";
import FormSubmitButton from "./FormSubmitButton";

describe(FormSubmitButton, () => {
  test("FormSubmitButton renders with default text 'Submit'", () => {
    render(<FormSubmitButton />);
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  test("FormSubmitButton renders with custom text", () => {
    render(<FormSubmitButton text="Confirm Payment" />);
    expect(
      screen.getByRole("button", { name: /confirm payment/i }),
    ).toBeInTheDocument();
  });

  test("FormSubmitButton is disabled when disabled prop is true", () => {
    render(<FormSubmitButton disabled />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  test("FormSubmitButton is enabled by default", () => {
    render(<FormSubmitButton />);
    expect(screen.getByRole("button")).toBeEnabled();
  });

  test("FormSubmitButton has type submit", () => {
    render(<FormSubmitButton />);
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });

  test("FormSubmitButton matches snapshot", () => {
    const { asFragment } = render(<FormSubmitButton text="Sign In" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
