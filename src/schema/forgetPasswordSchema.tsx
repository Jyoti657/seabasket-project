 import {z} from "zod";

 const forgetPasswordSchema = z.object({
        email: z
        .string()
        .trim()
        .email({ message: "Invalid email address" }),
    });
export type ForgetPasswordSchemaType = z.infer<typeof forgetPasswordSchema>;
export default forgetPasswordSchema;