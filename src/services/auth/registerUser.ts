/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { z } from "zod";
import { loginUser } from "./loginUser";

const registerValidationZodSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),

    email: z.email({ message: "Valid email is required" }),

    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" })
      .max(100, { message: "Password must be at most 100 characters long" }),

    confirmPassword: z
      .string()
      .min(6, {
        message: "Confirm Password must be at least 6 characters long",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const registerUser = async (
  _currentState: any,
  formData: any
): Promise<any> => {
  try {
    const validationData = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };

    const validatedFields =
      registerValidationZodSchema.safeParse(validationData);

   

    if (!validatedFields.success) {
      return {
        success: false,
        errors: validatedFields.error.issues.map((issue) => {
          return {
            field: issue.path[0],
            message: issue.message,
          };
        }),
      };
    }

    const registerData = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

   const res = await fetch("http://localhost:5000/api/v1/user/register", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(registerData),
});


  
const result = await res.json();

if (result.success) {
            await loginUser(_currentState, formData);
        }

return result;

  } catch (error: any) {
        // Re-throw NEXT_REDIRECT errors so Next.js can handle them
        if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error;
        }
        console.log(error);
        return { success: false, message: `${process.env.NODE_ENV === 'development' ? error.message : "Registration Failed. Please try again."}` };
    }
};
