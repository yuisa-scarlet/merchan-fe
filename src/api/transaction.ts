import type { Transaction } from "@/types/Transaction"
import { axiosInstance } from "@/utils/axios"
import { generateQueryParams } from "@/utils/generateQueryParams"
import { useQuery, type QueryFunctionContext } from "@tanstack/vue-query"
import camelcaseKeys from "camelcase-keys"

/* ============ *
 * GET transactions *
 * ============ */

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

export { useGetTransactions }
