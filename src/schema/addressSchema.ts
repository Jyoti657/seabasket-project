import { z } from "zod";
const addressSchema = z.object({
  AddressLine1: z
    .string()
  
    .trim(),
  AddressLine2: z
    .string()
    .trim(),
  PostalCode: z.number(),
  state: z.string().trim(),
  city: z.string().trim(),
  country: z.string().trim(),
});
export type addressSchemaType = z.infer<typeof addressSchema>;
export default addressSchema;
