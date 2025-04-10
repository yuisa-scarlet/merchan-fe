<script setup lang="ts">
import { useForm } from "vee-validate"
import { toTypedSchema } from "@vee-validate/zod"
import { ref } from "vue"
import { depositPayloadSchema, useStoreDeposit } from "@/api/deposit"

const props = defineProps<{ onClose: () => void }>()

const isSubmitting = ref(false)

const { handleSubmit, defineField, errors } = useForm({
  initialValues: {
    amount: 0,
  },
  validationSchema: toTypedSchema(depositPayloadSchema),
})

const [amount, amountAttrs] = defineField("amount")

const { mutate: storeDeposit, isPending } = useStoreDeposit()

const onSubmit = handleSubmit((values) => {
  isSubmitting.value = true
  storeDeposit(values, {
    onSuccess: (data) => {
      console.info("Deposit successful", data)
      isSubmitting.value = false
      props.onClose()

      window.open(`${import.meta.env.VITE_APP_URL}/transaction/${data?.id}`, "_blank")
    },
    onError: (error) => {
      console.error("Deposit failed", error)
      isSubmitting.value = false
    },
  })
})
</script>

<template>
  <form @submit.prevent="onSubmit" class="flex flex-col gap-y-3">
    <div class="max-w-sm">
      <label for="input-label" class="block text-sm font-medium mb-2">
        Amount<span class="text-red-500">*</span>
      </label>
      <input
        v-model="amount"
        v-bind="amountAttrs"
        name="amount"
        type="number"
        id="input-label"
        class="py-2.5 sm:py-3 px-4 block w-full border border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
        placeholder="Example: 1000.00"
      />
      <span class="text-sm text-red-500">{{ errors.amount }}</span>
    </div>
    <button
      class="bg-blue-600 rounded-md py-2.5 text-white hover:bg-blue-700 w-full shadow-sm"
      type="submit"
    >
      {{ isPending ? "Processing..." : "Deposit Now" }}
    </button>
  </form>
</template>
