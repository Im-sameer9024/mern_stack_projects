import z from "zod";

export const SignupFormSchema = z
  .object({
    accountType: z.enum(["Student", "Instructor"], {
      errorMap: () => ({
        message: "Account type must be either Student or Instructor.",
      }),
    }),
    firstName: z
      .string()
      .min(3, { message: "First name must be at least 3 characters long." })
      .max(50, { message: "First name must be no more than 50 characters." }),
    lastName: z
      .string()
      .min(3, { message: "Last name must be at least 3 characters long." })
      .max(50, { message: "Last name must be no more than 50 characters." }),
    email: z
      .string()
      .email({ message: "Please enter a valid email address." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." })
      .max(64, { message: "Password must be no more than 64 characters." })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter.",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter.",
      })
      .regex(/[0-9]/, {
        message: "Password must contain at least one digit.",
      })
      .regex(/[@$!%*#?&]/, {
        message: "Password must contain at least one special character.",
      }),
    confirmPassword: z
      .string()
      .min(8, {
        message: "Confirm password must be at least 8 characters long.",
      }),
    phone: z
      .string()
      .regex(/^\d{10}$/, {
        message: "Phone number must be exactly 10 digits long.",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });