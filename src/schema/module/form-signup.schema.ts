import * as zod from "zod";

export const FormSignupValidationSchema = zod.object({
    name: zod
        .string()
        .min(1, "This is required"),
    phone: zod
        .string()
        .min(1, "This is required")
        .optional()
        .nullable(),

    email: zod
        .string()
        .min(1, "This is required")
        .optional()
        .nullable(),
    password: zod
        .string()
        .min(1, "This is required"),
    confirm_password: zod
        .string()
        .min(1, "This is required"),
});