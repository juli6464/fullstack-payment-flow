import { Button, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  checkoutSchema,
  type CheckoutFormData,
} from "../schemas/checkout.schema";

import AppTextField from "../components/form/AppTextField";

interface Props {
  onSubmit: (data: CheckoutFormData) => Promise<void> | void;
}

export default function CheckoutForm({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
      isValid,
    },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),

    mode: "onChange",

    reValidateMode: "onChange",
  });

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Customer Information
      </Typography>

      <Stack spacing={2}>

        <AppTextField
          label="Full Name"
          variant="letters"
          fullWidth
          autoComplete="name"
          register={register("fullName")}
          error={!!errors.fullName}
          helperText={
            errors.fullName?.message ??
            "Only letters. Minimum 3 characters."
          }
        />

        <AppTextField
          label="Email"
          type="email"
          fullWidth
          autoComplete="email"
          register={register("email")}
          error={!!errors.email}
          helperText={
            errors.email?.message ??
            "Example: user@email.com"
          }
        />

        <AppTextField
          label="Address"
          fullWidth
          autoComplete="street-address"
          register={register("address")}
          error={!!errors.address}
          helperText={
            errors.address?.message ??
            "Street, avenue and house number."
          }
        />

        <AppTextField
          label="City"
          variant="letters"
          fullWidth
          register={register("city")}
          error={!!errors.city}
          helperText={
            errors.city?.message ??
            "Only letters."
          }
        />

        <AppTextField
          label="Phone"
          variant="phone"
          maxLength={10}
          fullWidth
          autoComplete="tel"
          register={register("phone")}
          error={!!errors.phone}
          helperText={
            errors.phone?.message ??
            "10 numeric digits."
          }
        />

        <Typography variant="h5" sx={{ mt: 4 }}>
          Payment Information
        </Typography>

        <AppTextField
          label="Card Holder"
          variant="letters"
          fullWidth
          autoComplete="cc-name"
          register={register("cardHolder")}
          error={!!errors.cardHolder}
          helperText={
            errors.cardHolder?.message ??
            "Name exactly as printed on the card."
          }
        />

        <AppTextField
          label="Card Number"
          variant="card"
          maxLength={16}
          fullWidth
          autoComplete="cc-number"
          register={register("cardNumber")}
          error={!!errors.cardNumber}
          helperText={
            errors.cardNumber?.message ??
            "16 digits without spaces."
          }
        />

        <Stack direction="row" spacing={2}>

          <AppTextField
            label="MM"
            variant="numbers"
            maxLength={2}
            fullWidth
            register={register("expMonth")}
            error={!!errors.expMonth}
            helperText={
              errors.expMonth?.message ??
              "01-12"
            }
          />

          <AppTextField
            label="YY"
            variant="numbers"
            maxLength={2}
            fullWidth
            register={register("expYear")}
            error={!!errors.expYear}
            helperText={
              errors.expYear?.message ??
              "Example: 28"
            }
          />

          <AppTextField
            label="CVC"
            variant="numbers"
            maxLength={3}
            fullWidth
            register={register("cvc")}
            error={!!errors.cvc}
            helperText={
              errors.cvc?.message ??
              "3 digits."
            }
          />

        </Stack>

        <Button
          variant="contained"
          type="submit"
          size="large"
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? "Processing..." : "Pay Now"}
        </Button>

      </Stack>
    </form>
  );
}