import { z } from "zod";

export const ProfileSchema = z.object({
  name: z.string().min(2),

  bio: z.string().max(300).optional(),

  currentLocation: z.string().optional(),

  gender: z.enum(["male", "female", "other"]).optional(),

  age: z.coerce.number().min(1).max(120).optional(), // ✅ FIXED

  profileImage: z.string().url().optional(),

  travelInterests: z.array(z.string()).optional(),

  visitedCountries: z.array(z.string()).optional(),

  socialLinks: z
    .object({
      facebook: z.string().url().optional(),
      instagram: z.string().url().optional(),
      twitter: z.string().url().optional(),
    })
    .optional(),
});

export type ProfileSchemaType = z.infer<typeof ProfileSchema>;
