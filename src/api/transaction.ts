import type { Transaction } from "@/types/Transaction"
import { axiosInstance } from "@/utils/axios"
import { useQuery } from "@tanstack/vue-query"
import camelcaseKeys from "camelcase-keys"

/* ================ *
 * GET transactions *
 * ================ */

async function transactions(): Promise<Transaction[]> {
  const response = await axiosInstance.get("/v1/transactions")
  return camelcaseKeys(response.data.data) as Transaction[]
}
function useGetTransactions() {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: transactions,
  })
}

/* ======================= *
 * GET transactions detail *
 * ======================= */

async function transactionDetail(id: string): Promise<Transaction> {
  const response = await axiosInstance.get(`/v1/transaction/${id}`)
  return camelcaseKeys(response.data.data) as Transaction
}
function useGetTransactionDetail(id?: string) {
  return useQuery({
    queryKey: ["transaction", id],
    queryFn: () => transactionDetail(id as string),
  })
}

export { useGetTransactions, useGetTransactionDetail }
