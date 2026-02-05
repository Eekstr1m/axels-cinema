import type { ReactNode } from "react";
import type { TextFieldProps } from "@mui/material/TextField";
import type {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import {
  ColoredInputAdornment,
  StyledTextField,
} from "../../styled/components/common/FormTextField.styled";

type FormTextFieldProps<T extends FieldValues> = Omit<
  TextFieldProps,
  "name"
> & {
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  icon?: ReactNode;
};

export default function FormTextField<T extends FieldValues>({
  name,
  register,
  errors,
  icon,
  slotProps,
  helperText,
  ...props
}: FormTextFieldProps<T>) {
  const fieldError = errors[name] as { message?: string } | undefined;

  return (
    <StyledTextField
      {...props}
      {...register(name)}
      error={!!fieldError}
      helperText={fieldError?.message ? String(fieldError.message) : helperText}
      slotProps={{
        ...slotProps,
        input: {
          startAdornment: icon ? (
            <ColoredInputAdornment position="start">
              {icon}
            </ColoredInputAdornment>
          ) : null,
        },
      }}
    />
  );
}
