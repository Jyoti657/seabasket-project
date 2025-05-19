import { z } from "zod";

const addressSchema = z.object({
  addressLine1: z.string().trim().min(1, "Address Line 1 is required"),
  addressLine2: z.string().trim().min(1, "Address Line 2 is required"),
  postalCode: z
    .string()
    .trim()
    .min(6, "Postal code should be at least 6 digits"),
  state: z.string().trim().min(1, "State is required"),
  city: z.string().trim().min(1, "City is required"),
  country: z.string().trim().min(1, "Country is required"),
});

export type addressSchemaType = z.infer<typeof addressSchema>;
export default addressSchema;
