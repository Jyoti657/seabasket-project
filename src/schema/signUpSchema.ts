import { z } from "zod";
const signUpSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, { message: "The name must be at least 3 characters" })
      .max(50, { message: "Name must not  be more than 255 characters" }),
    phone: z
      .string()
      .min(10, { message: "Must be valid Mobile number" })
      .max(10, { message: "Must be valid Mobile Number" })
      .trim(),
    email: z.string().email().trim(),
    password: z
      .string()
      .min(6, "Password  must be at least 6 characters")
      .max(10),
     
    confirmPassword: z
      .string()
      .min(6, "confirm password is required")
      .max(10)
      .trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "password do not  match",
    path: ["confirmPassword"],
  });
export type signUpSchemaType = z.infer<typeof signUpSchema>;
export default signUpSchema;
