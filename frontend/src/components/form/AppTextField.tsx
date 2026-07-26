import TextField from "@mui/material/TextField";

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
        return value
          .replace(/\D/g, "")
          .slice(0, 10);

      case "card":
        return value
          .replace(/\D/g, "")
          .slice(0, 16);

      default:
        return value;
    }
  }

  return (
    <TextField
      {...props}
      {...register}
      slotProps={{
        htmlInput: {
          maxLength,
          inputMode:
            variant === "default" || variant === "letters"
              ? undefined
              : "numeric",
        },
      }}
      onChange={(e) => {
        e.target.value = sanitize(e.target.value);

        register.onChange(e);
      }}
    />
  );
}