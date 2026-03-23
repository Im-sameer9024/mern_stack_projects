import z from "zod";

const LoginValidationSchema = z.object({
  email: z.email({ message: "Email is not valid" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 char" })
    .max(18, { message: "Password must be at most 18 char" })
    .regex(/[a-z]/, { message: "Password must contain one lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain one number" })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must contain  one special character",
    }),
});

const SignupValidationSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 char" })
    .max(25, { message: "Name must be at most 25 char" }),
  email: z.email({ message: "Email is not valid" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 char" })
    .max(18, { message: "Password must be at most 18 char" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, { message: "Password must contain one lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain one number" })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must contain  one special character",
    }),
});

export { LoginValidationSchema, SignupValidationSchema };
