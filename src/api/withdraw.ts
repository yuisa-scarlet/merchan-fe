import type { Transaction } from "@/types/Transaction"
import { axiosInstance } from "@/utils/axios"
import { useMutation, useQueryClient } from "@tanstack/vue-query"
import camelcaseKeys from "camelcase-keys"
import { z } from "zod"

/* =============== *
 * POST withdrawal *
 * =============== */

const withdrawPayloadSchema = z.object({
  amount: z
    .number()
    .min(1, { message: "Amount withdrawal at least 1" })
    .refine((val) => Number(val.toFixed(2)) === val, {
      message: "Amount must have exactly two decimal places (e.g., 1000.00)",
    }),
})
type WithdrawPayloadSchema = z.infer<typeof withdrawPayloadSchema>

async function withdraw(data: WithdrawPayloadSchema): Promise<Transaction> {
  const response = await axiosInstance.post("/v1/withdrawal", data)
  return camelcaseKeys(response.data.data) as Transaction
}
function useStoreWithdraw() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: WithdrawPayloadSchema) => withdraw(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["withdraw"],
      })
    },
  })
}

export type { WithdrawPayloadSchema }
export { useStoreWithdraw, withdrawPayloadSchema }
