import type { Transaction } from "@/types/Transaction"
import { axiosInstance } from "@/utils/axios"
import { useMutation, useQueryClient } from "@tanstack/vue-query"
import camelcaseKeys from "camelcase-keys"
import snakecaseKeys from "snakecase-keys"
import { z } from "zod"

/* ============ *
 * POST payment *
 * ============ */

const paymentPayloadSchema = z.object({
  externalRef: z.string().min(1, { message: "External reference is required" }),
  amount: z
    .number()
    .min(1, { message: "Amount payment at least 1" })
    .refine((val) => Number(val.toFixed(2)) === val, {
      message: "Amount must have exactly two decimal places (e.g., 1000.00)",
    }),
  status: z.enum(["paid", "failed", "canceled"]),
})
type PaymentPayloadSchema = z.infer<typeof paymentPayloadSchema>

async function storePayment(data: PaymentPayloadSchema): Promise<Transaction> {
  const payload = snakecaseKeys(data)

  const response = await axiosInstance.post("/v1/payment", payload)
  return camelcaseKeys(response.data.data) as Transaction
}
function useStorePayment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: PaymentPayloadSchema) => storePayment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["payment"],
      })
    },
  })
}

export type { PaymentPayloadSchema }
export { useStorePayment, paymentPayloadSchema }
