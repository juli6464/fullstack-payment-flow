import { z } from "zod";

export const checkoutSchema = z.object({

  fullName: z
    .string()
    .trim()
    .min(3)
    .max(80)
    .regex(
      /^[A-Za-zÀ-ÿ\s]+$/,
      "Only letters are allowed",
    ),

  email: z
    .string()
    .trim()
    .email(),

  address: z
    .string()
    .trim()
    .min(5)
    .max(120),

  city: z
    .string()
    .trim()
    .min(2)
    .regex(
      /^[A-Za-zÀ-ÿ\s]+$/,
      "Only letters are allowed",
    ),

  phone: z.string().regex(
    /^\d{10}$/,
    "Phone must contain 10 digits",
  ),

  cardHolder: z
    .string()
    .trim()
    .min(3)
    .regex(
      /^[A-Za-zÀ-ÿ\s]+$/,
      "Only letters are allowed",
    ),

  cardNumber: z.string().regex(
    /^\d{16}$/,
    "Card number must contain 16 digits",
  ),

  expMonth: z.string().regex(
    /^(0[1-9]|1[0-2])$/,
    "Invalid month",
  ),

  expYear: z.string().regex(
    /^\d{2}$/,
    "Invalid year",
  ),

  cvc: z.string().regex(
    /^\d{3}$/,
    "Invalid CVC",
  ),

});

export type CheckoutFormData =
  z.infer<typeof checkoutSchema>;