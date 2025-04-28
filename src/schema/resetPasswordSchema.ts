import { z } from "zod";

const resetPasswordSchema = z.object({
  password: z.string().min(6, "there must be 6 character long"),
  token: z.string().uuid().optional(),
});
export type resetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;
export default resetPasswordSchema;
