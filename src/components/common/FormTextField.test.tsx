import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm, type FieldErrors } from "react-hook-form";
import FormTextField from "./FormTextField";

type TestFormData = {
  email: string;
  name: string;
};

function TestWrapper({
  defaultValues = {},
  errors = {},
}: {
  defaultValues?: Partial<TestFormData>;
  errors?: FieldErrors<TestFormData>;
}) {
  const { register } = useForm<TestFormData>({ defaultValues });

  return (
    <FormTextField<TestFormData>
      label="Email"
      name="email"
      register={register}
      errors={errors}
    />
  );
}

describe(FormTextField, () => {
  test("FormTextField renders with a label", () => {
    render(<TestWrapper />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  test("FormTextField shows error message when there is a field error", () => {
    render(
      <TestWrapper
        errors={{
          email: { message: "Email is required", type: "required" },
        }}
      />,
    );
    expect(screen.getByText("Email is required")).toBeInTheDocument();
  });

  test("FormTextField accepts user input", async () => {
    render(<TestWrapper />);
    const user = userEvent.setup();
    const input = screen.getByLabelText("Email");
    await user.type(input, "test@example.com");
    expect(input).toHaveValue("test@example.com");
  });

  test("FormTextField is in error state when error is present", () => {
    render(
      <TestWrapper
        errors={{
          email: { message: "Invalid email", type: "validate" },
        }}
      />,
    );
    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  test("FormTextField matches snapshot", () => {
    const { asFragment } = render(<TestWrapper />);
    expect(asFragment()).toMatchSnapshot();
  });
});
