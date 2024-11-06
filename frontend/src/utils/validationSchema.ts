import { z } from "zod";

export const formSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),

  repassword: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export const formPage = z.object({
  email: z
    .string()
    .email({ message: "'@gmail.com' хэсгийг оруулна уу." })
    .trim(),
  password: z.string(),
});
