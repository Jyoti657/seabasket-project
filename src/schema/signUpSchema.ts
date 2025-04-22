import { z } from "zod";

const signUpSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(2, { message: "First name must be at least 2 characters" })
      .max(50, { message: "First name must not be more than 50 characters" }),

    lastName: z
      .string()
      .trim()
      .min(2, { message: "Last name must be at least 2 characters" })
      .max(50, { message: "Last name must not be more than 50 characters" }),

    email: z
      .string()
      .trim()
      .email({ message: "Invalid email address" }),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(10, "Password must not be more than 10 characters"),

    confirmPassword: z
      .string()
      .min(6, "Confirm password is required")
      .max(10, "Confirm password must not be more than 10 characters"),

    mobile: z
      .string()
      .min(10, { message: "Mobile number must be 10 digits" })
      .max(15, { message: "Mobile number too long" })
      .regex(/^[0-9]+$/, { message: "Mobile number must contain only digits" }),

    isAdmin: z.boolean().optional(),
    is2FAEnabled: z.boolean().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type signUpSchemaType = z.infer<typeof signUpSchema>;
export default signUpSchema;
