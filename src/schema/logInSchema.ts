import { z } from "zod";
const logInSchema = z.object({
    email: z.string().min(1,"Email is required").email("Invalid email address").trim(),
    password: z.string().min(6,"password must be at least 6 character")
    .max(20,"password can't exceed 20 characters")
    .trim()
  });
 export  type logInSchemaType = z.infer<typeof logInSchema>;
export default logInSchema