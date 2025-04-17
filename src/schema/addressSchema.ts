import {z} from "zod"
 const addressSchema=z.object({
    email: z
    .string()
    .min(1, "Email is required ")
    .email("Invalid email adrees")
    .trim(),
  name: z
    .string()
    .min(3, {message:"The name must be at least 3 characters "})
    .max(50, { message:"Name must not be more than 225 characters"})
    .trim(),
  phone: z.string()
  .min(10,{message:"Must be  a valid  mobile Number "})
  .max(14,{message:"Must be valid mobile Number"}),
  pincode:z.number(),

  state:z.string().trim(),
    city:z.string().trim(),
    courty:z.string().trim()

  

 })
 export type addressSchemaType=z.infer<typeof addressSchema>;
 export default addressSchema