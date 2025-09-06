import z from "zod";

export const signupSchemaValidator = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(3, "Name must be at least 3 characters long")
    .max(20, "Name must not exceed 20 characters"),

  email: z
    .string({ required_error: "Email is required" })
    .email("Please enter a valid email address"),

  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must not exceed 20 characters"),

  accountType: z.enum(["user", "admin"], {
    required_error: "Account type is required",
    invalid_type_error: "Account type must be either 'user' or 'admin'",
  }),
  otp: z.string({ required_error: "OTP is required" }),
});

export const loginSchemaValidator = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Please enter a valid email address"),

  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must not exceed 20 characters"),
});
