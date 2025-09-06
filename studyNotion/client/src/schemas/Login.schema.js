import z from "zod";

export const LoginFormSchema = z.object({
  accountType: z.enum(["Student", "Instructor"], {
    errorMap: () => ({ message: "Account type must be  Student or Instructor." }),
  }),
  email: z
    .string()
    .min(5, { message: "Email must be at least 5 characters long." })
    .max(254, { message: "Email must be under 254 characters." })
    .email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .max(64, { message: "Password must not exceed 64 characters." })
    // .regex(/[A-Z]/, { message: "Password must include at least one uppercase letter." })
    // .regex(/[a-z]/, { message: "Password must include at least one lowercase letter." })
    // .regex(/\d/, { message: "Password must include at least one number." })
    // .regex(/[^A-Za-z0-9]/, { message: "Password must include at least one special character." }),
});