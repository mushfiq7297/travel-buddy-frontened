/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import z from "zod";
import { redirect } from "next/navigation";
import { getDefaultDashboardRoute, isValidRedirectForRole, UserRole } from "@/lib/auth-utils";
import { setCookie } from "./tokenHandlers";

const loginValidationZodSchema = z.object({
  email: z.email({
    message: "Email is required",
  }),
  password: z
    .string("Password is required")
    .min(6, {
      error: "Password must be at least 6 characters long",
    })
    .max(100, {
      error: "Password must be at most 100 characters long",
    }),
});

export const loginUser = async (_currentState: any, formData: any) => {
  try {
     const redirectTo = formData.get('redirect') || null;
    const loginData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const validated = loginValidationZodSchema.safeParse(loginData);

    if (!validated.success) {
      return {
        success: false,
        errors: validated.error.issues.map((i) => ({
          field: i.path[0],
          message: i.message,
        })),
      };
    }



    // Call backend
    const res = await fetch("http://localhost:5000/api/v1/auth/login", {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
   
    console.log("Login Response:", data.data);

    if (!data.success) {
            throw new Error(data.message || "Login failed");
        }

   
  await   setCookie("accessToken", data.data.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60, // 1 hour
    });

   await   setCookie("refreshToken", data.data.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 90, // 90 days
    });

    const verifiedToken: JwtPayload | string = jwt.verify(data.data.accessToken, process.env.JWT_ACCESS_SECRET as string)

      if (typeof verifiedToken === "string") {
            throw new Error("Invalid token");

        }

        const userRole: UserRole = verifiedToken.role;
        console.log(verifiedToken.role)

         if (redirectTo) {
            const requestedPath = redirectTo.toString();
            if (isValidRedirectForRole(requestedPath, userRole)) {
                 redirect(`${requestedPath}?loggedIn=true`);
            } else {
                 redirect(`${getDefaultDashboardRoute(userRole)}?loggedIn=true`);
            }
        }else {
            redirect(`${getDefaultDashboardRoute(userRole)}?loggedIn=true`);
        }


    return {
      success: true,
      user: data.data.user,
    };
  } catch (error: any) {
        // Re-throw NEXT_REDIRECT errors so Next.js can handle them
        if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error;
        }
        console.log(error);
       return { success: false, message: `${process.env.NODE_ENV === 'development' ? error.message : "Login Failed. You might have entered incorrect email or password."}` };
    }
};
