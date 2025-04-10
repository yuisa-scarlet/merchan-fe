import type { User } from "@/api/auth"

export interface Transaction {
  id: number
  user_id: number
  amount: number
  transactionType: string
  status: string
  externalRef: string
  createdAt: string
  updatedAt: string
  user: User
}
