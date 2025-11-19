import { email, z, url } from 'zod';


export const signupPostRequestBodySchema = z.object({
    first_name: z.string(),
    last_name: z.string().optional(),
    email: z.string().email(),
    password: z.string().min(5),
});

export const loginPostRequestBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(5),
});

export const shortenPostRequestBodySchema = z.object({
    url: z.string().url(),
    code: z.string().optional()
});