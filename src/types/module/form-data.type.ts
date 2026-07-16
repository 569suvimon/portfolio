import * as zod from "zod";
import { FormLoginValidationSchema,  FormSignupValidationSchema} from "@/schema";

export type LoginFormData = zod.infer<typeof FormLoginValidationSchema>;
export type SignupFormData = zod.infer<typeof FormSignupValidationSchema>;

