import TextField from "@mui/material/TextField";
import type { ChangeEvent } from "react";

interface AppTextFieldProps {
  label: string;
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
  autoComplete?: string;
  type?: string;
  maxLength?: number;

  register: any;

  variant?:
    | "letters"
    | "numbers"
    | "phone"
    | "card"
    | "default";
}

export default function AppTextField({
  variant = "default",
  maxLength,
  register,
  ...props
}: AppTextFieldProps) {
  function sanitize(value: string) {
    switch (variant) {
      case "letters":
        return value.replace(/[^A-Za-zÀ-ÿ\s]/g, "");

      case "numbers":
        return value.replace(/\D/g, "");

      case "phone":
        return value.replace(/\D/g, "").slice(0, 10);

      case "card":
        return value.replace(/\D/g, "").slice(0, 16);

      default:
        return value;
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.value = sanitize(e.target.value);

    register.onChange(e);
  };

  return (
    <TextField
      {...props}
      name={register.name}
      inputRef={register.ref}
      onBlur={register.onBlur}
      onChange={handleChange}
      slotProps={{
        htmlInput: {
          maxLength,
          inputMode:
            variant === "numbers" ||
            variant === "phone" ||
            variant === "card"
              ? "numeric"
              : undefined,
        },
      }}
    />
  );
}