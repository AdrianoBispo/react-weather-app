import { z } from 'zod';

export const authSchema = z.object({
  email: z.string().email({ message: 'Por favor, insira um e-mail válido.' }),
  password: z.string().min(8, { message: 'A senha deve ter no mínimo 8 caracteres.' }),
});

export type AuthFormData = z.infer<typeof authSchema>;
