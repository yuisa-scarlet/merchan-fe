import { axiosInstance } from "@/utils/axios"
import { useMutation, useQueryClient } from "@tanstack/vue-query"
import { z } from "zod"

interface Role {
  id: number
  name: string
  description: string
}

interface User {
  id: number
  name: string
  email: string
  balance: string
  role: Role
}

interface UserLoginResponse {
  access_token: string
  user: User
}

/* ========== *
 * POST login *
 * ========== */

const userLoginPayloadSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})
type UserLoginPayloadSchema = z.infer<typeof userLoginPayloadSchema>

async function login(data: UserLoginPayloadSchema): Promise<UserLoginResponse> {
  const response = await axiosInstance.post("/v1/login", data)
  return response.data
}
function useLogin() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UserLoginPayloadSchema) => login(data),
    onSuccess: (data) => {
      localStorage.setItem("access_token", data.access_token)
      queryClient.invalidateQueries({
        queryKey: ["user"],
      })
    },
  })
}

/* ============= *
 * POST register *
 * ============= */

const userRegisterPayloadSchema = z
  .object({
    name: z.string().min(3).max(50),
    email: z.string().email(),
    password: z.string().min(8),
    password_confirmation: z.string().min(8),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ["password_confirmation"],
  })
type UserRegisterPayloadSchema = z.infer<typeof userRegisterPayloadSchema>

async function register(data: UserRegisterPayloadSchema): Promise<User> {
  const response = await axiosInstance.post("/v1/register", data)
  return response.data
}
function useRegister() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UserRegisterPayloadSchema) => register(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      })
    },
  })
}

export type { Role, User, UserLoginResponse, UserLoginPayloadSchema, UserRegisterPayloadSchema }
export { useLogin, useRegister, userLoginPayloadSchema, userRegisterPayloadSchema }
