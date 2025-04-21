import { z } from "zod";

const profileSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name must not be more than 50 characters")
    .trim(),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name must not be more than 50 characters")
    .trim(),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address")
    .trim(),
  phone: z
    .string()
    .min(10, "Phone number must be valid")
    .max(10, "Phone number must be valid")
    .trim(),
  gender: z.enum(["male", "female", "other"]).optional(),
  birthDate: z.string().min(1, "Birthdate is required").optional(),
  address: z.object({
    address: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    postalCode: z.string().optional(),
    country: z.string().optional(),
  }).optional(),
  image: z.string().optional(),
});

export type profileSchemaType = z.infer<typeof profileSchema>;

export default profileSchema;
