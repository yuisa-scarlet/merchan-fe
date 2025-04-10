<script setup lang="ts">
import { useGetTransactionDetail } from "@/api/transaction"
import { useRoute } from "vue-router"

const route = useRoute()
const { data: transaction } = useGetTransactionDetail(route.params.id as string)
</script>

<template>
  <div class="relative overflow-hidden">
    <div aria-hidden="true" class="absolute inset-0 overflow-hidden"></div>

    <div
      class="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-32 text-center sm:py-64 lg:px-0"
    >
      <div class="w-1/2 mx-auto p-6 bg-white rounded-xl shadow space-y-5">
        <div
          class="bg-blue-900 text-white p-4 rounded-lg flex flex-col gap-y-4 items-center justify-between"
        >
          <div>
            <div class="text-xs opacity-70">Transaction ID #{{ transaction?.externalRef }}</div>
          </div>
          <div class="text-center">
            <div class="text-sm">Total</div>
            <div class="text-lg font-bold">Rp{{ transaction?.amount }}</div>
          </div>
        </div>

        <div class="space-y-4">
          <div class="flex items-center justify-between pt-2">
            <div class="text-xs text-gray-500">Secure payments by Merchan</div>
            <div class="flex space-x-2">
              <img src="https://img.icons8.com/color/32/visa.png" alt="Visa" class="h-5" />
              <img
                src="https://img.icons8.com/color/32/mastercard.png"
                alt="Mastercard"
                class="h-5"
              />
              <img src="https://img.icons8.com/color/32/amex.png" alt="Amex" class="h-5" />
            </div>
          </div>

          <button
            class="bg-gray-800 text-white w-full py-2.5 rounded-md hover:bg-gray-950 transition"
          >
            {{ "Bayar Sekarang" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
