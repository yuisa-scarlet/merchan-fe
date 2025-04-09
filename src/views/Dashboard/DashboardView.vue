<script setup lang="ts">
import { useProfile } from "@/api/user"
import { useGetTransactions } from "@/api/transaction"
import { BanknoteArrowUp, BanknoteArrowDown } from "lucide-vue-next"

const { data: profile } = useProfile()
const { data: transactions } = useGetTransactions()
</script>

<template>
  <div>
    <h2 class="text-3xl font-semibold">Overview</h2>
    <div class="mt-10">
      <span class="text-gray-400">Total balances</span>
      <h3 class="text-2xl font-semibold">Rp{{ profile?.balance }}</h3>
    </div>
    <div class="mt-6 flex gap-x-4">
      <div class="h-24 w-64 border border-gray-100 rounded-lg p-4">
        <span class="text-green-500 inline-flex gap-x-2"><BanknoteArrowUp /> Total Deposit</span>
        <h3 class="text-2xl font-semibold">Rp{{ profile?.balance }}</h3>
      </div>
      <div class="h-24 w-64 border border-gray-100 rounded-lg p-4">
        <span class="text-red-500 inline-flex gap-x-2"><BanknoteArrowDown />Total Withdraw</span>
        <h3 class="text-2xl font-semibold">Rp{{ profile?.balance }}</h3>
      </div>
    </div>
    <div class="mt-10">
      <h6 class="text-lg font-semibold">Recent Transactions</h6>
      <ul>
        <li
          v-for="transaction in transactions"
          :key="transaction.id"
          class="flex justify-between items-center border-b border-gray-200 py-2"
        >
          <div class="flex gap-x-3">
            <div class="flex gap-x-2 w-28">
              <span v-if="transaction?.transactionType === 'deposit'" class="text-green-500"
                ><BanknoteArrowUp
              /></span>
              <span v-if="transaction?.transactionType === 'withdrawal'" class="text-red-500"
                ><BanknoteArrowDown
              /></span>
              <span>{{ transaction?.transactionType }}</span>
            </div>
            <span v-if="transaction?.status === 'paid'" class="text-green-500">{{
              transaction?.status
            }}</span>
            <span v-if="transaction?.status === 'pending'" class="text-yellow-500">{{
              transaction?.status
            }}</span>
          </div>
          <span
            >{{ transaction?.transactionType === "deposit" ? "+" : "-" }}Rp{{
              transaction?.amount
            }}</span
          >
        </li>
      </ul>
    </div>
  </div>
</template>
