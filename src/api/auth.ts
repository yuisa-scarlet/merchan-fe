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
  email: z
    .string()
    .min(1, { message: "Required" })
    .email({ message: "Invalid format email address" }),
  password: z
    .string()
    .min(1, { message: "Required" })
    .min(8, { message: "Password must be at least 8 characters" }),
})
type UserLoginPayloadSchema = z.infer<typeof userLoginPayloadSchema>

async function login(data: UserLoginPayloadSchema): Promise<UserLoginResponse> {
  const response = await axiosInstance.post("/v1/login", data)
  return response.data.data
}
function useLogin() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UserLoginPayloadSchema) => login(data),
    onSuccess: (data) => {
      localStorage.setItem("access_token", data.access_token)
      localStorage.setItem("role", data.user.role.name)
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
    name: z
      .string()
      .min(1, { message: "Required" })
      .min(3, { message: "Name must be at least 3 characters" })
      .max(50, { message: "Cannot enter more than 50 characters" }),
    email: z
      .string()
      .min(1, { message: "Required" })
      .email({ message: "Invalid format email address" }),
    password: z
      .string()
      .min(1, { message: "Required" })
      .min(8, { message: "Password must be at least 8 characters" }),
    password_confirmation: z
      .string()
      .min(1, { message: "Required" })
      .min(8, { message: "Password confirmation must be at least 8 characters" }),
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

/* ============= *
 * POST logout *
 * ============= */

async function logout(): Promise<void> {
  const response = await axiosInstance.post("/v1/logout")
  return response.data
}
function useLogout() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      localStorage.removeItem("access_token")
      localStorage.removeItem("role")
      queryClient.invalidateQueries({
        queryKey: ["user"],
      })
      queryClient.clear()
    },
  })
}

export type { Role, User, UserLoginResponse, UserLoginPayloadSchema, UserRegisterPayloadSchema }
export { useLogin, useRegister, useLogout, userLoginPayloadSchema, userRegisterPayloadSchema }
