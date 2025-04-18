<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogDescription,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue"
import { CheckCircleIcon, XCircleIcon } from "@heroicons/vue/24/outline"

defineProps<{
  isOpen: boolean
  type: "success" | "error"
  message: string
}>()

const emit = defineEmits<{
  (e: "close"): void
}>()

function closeModal() {
  emit("close")
}
</script>

<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <div class="flex items-center justify-center mb-4">
                <CheckCircleIcon v-if="type === 'success'" class="h-12 w-12 text-green-500" />
                <XCircleIcon v-else class="h-12 w-12 text-red-500" />
              </div>

              <DialogTitle as="h3" class="text-lg font-medium leading-6 text-center text-gray-900">
                {{ type === "success" ? "Pembayaran Berhasil" : "Pembayaran Gagal" }}
              </DialogTitle>

              <DialogDescription class="mt-2 text-center">
                <p class="text-sm text-gray-500">
                  {{ message }}
                </p>
              </DialogDescription>

              <div class="mt-6">
                <button
                  type="button"
                  class="w-full inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="closeModal"
                >
                  Tutup
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
