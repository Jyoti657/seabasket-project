import { z } from "zod";
const profileSchema = z.object({
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
  

});
export type profileSchemaType = z.infer<typeof profileSchema>;
export default profileSchema;
