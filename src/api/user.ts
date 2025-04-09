import { axiosInstance } from "@/utils/axios"
import type { Role } from "./auth"
import { useQuery } from "@tanstack/vue-query"

interface Profile {
  id: number
  name: string
  email: string
  balance: string
  role: Role
}

async function profile(): Promise<Profile> {
  const response = await axiosInstance.get("/v1/profile")
  return response.data.data
}
function useProfile() {
  return useQuery({
    queryKey: ["user"],
    queryFn: profile,
  })
}

export { useProfile }
