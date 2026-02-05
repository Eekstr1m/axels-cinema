import { SubmitButton } from "../../styled/components/common/FormSubmitButton.styled";

export default function FormSubmitButton({
  variant = "contained",
  size = "large",
  disabled = false,
  text = "Submit",
}: {
  variant?: "contained" | "outlined" | "text";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  text?: string;
}) {
  return (
    <SubmitButton
      type="submit"
      variant={variant}
      size={size}
      fullWidth
      disabled={disabled}
    >
      {text}
    </SubmitButton>
  );
}
