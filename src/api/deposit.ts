import type { Transaction } from "@/types/Transaction"
import { axiosInstance } from "@/utils/axios"
import { useMutation, useQueryClient } from "@tanstack/vue-query"
import camelcaseKeys from "camelcase-keys"
import { z } from "zod"

/* ============ *
 * POST deposit *
 * ============ */

const depositPayloadSchema = z.object({
  amount: z
    .number()
    .min(1, { message: "Amount deposit at least 1" })
    .refine((val) => Number(val.toFixed(2)) === val, {
      message: "Amount must have exactly two decimal places (e.g., 1000.00)",
    }),
})
type DepositPayloadSchema = z.infer<typeof depositPayloadSchema>

async function deposit(data: DepositPayloadSchema): Promise<Transaction> {
  const response = await axiosInstance.post("/v1/deposit", data)
  return camelcaseKeys(response.data.data) as Transaction
}
function useStoreDeposit() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: DepositPayloadSchema) => deposit(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["deposit"],
      })
    },
  })
}

export type { DepositPayloadSchema }
export { useStoreDeposit, depositPayloadSchema }
