import { z } from "zod";
const addressSchema = z.object({
  addressLine1: z
    .string()
   .trim(),
  addressLine2: z
    .string()
    .trim(),
  postalCode: z.string().trim().min(6," Postal code should be six digit"),
  state: z.string().trim(),
  city: z.string().trim(),
  country: z.string().trim(),
});
export type addressSchemaType = z.infer<typeof addressSchema>;
export default addressSchema;
