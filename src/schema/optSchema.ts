import { z } from "zod";
const otpSchema = z.object({
    otp: z
      .string()
      .min(6, "OTP must be 6 digits")
      .max(6, "OTP must be 6 digits")
      .regex(/^\d+$/, "OTP must be numeric"),
      email:z
      .string()
      .trim()
      .email({ message: "Invalid email address" }),
      
  });
  
  export type OtpSchemaType = z.infer<typeof otpSchema>;
  export default otpSchema;