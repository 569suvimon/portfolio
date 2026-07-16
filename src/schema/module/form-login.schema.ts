import * as zod from "zod";

export const FormLoginValidationSchema = zod.object({
    username: zod
      .string()
      .min(1, "This is required"),
    password: zod
      .string()
      .min(1, "This is required"),
  });