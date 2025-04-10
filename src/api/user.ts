import { axiosInstance } from "@/utils/axios"
import type { Role } from "./auth"
import { useQuery } from "@tanstack/vue-query"
import camelcaseKeys from "camelcase-keys"

interface Profile {
  id: number
  name: string
  email: string
  balance: string
  role: Role
  totalDeposit: string
  totalWithdrawal: string
}

/* ============ *
 * GET profile *
 * ============ */

async function profile(): Promise<Profile> {
  const response = await axiosInstance.get("/v1/profile")
  return camelcaseKeys(response.data.data)
}
function useProfile() {
  return useQuery({
    queryKey: ["user"],
    queryFn: profile,
  })
}

export { useProfile }
