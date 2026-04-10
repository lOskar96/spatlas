import { z } from 'zod'

export const loginSchema = z.object({
  email: z.email('Email no válido').min(1, 'El email es requerido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres')
})

export type LoginFormValues = z.infer<typeof loginSchema>

export interface LoginResponse {
  accessToken: {
    token: string
    expiration: string
  }
  refreshToken: {
    token: string
    expiration: string
  }
}
