<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  DialogOverlay,
  TransitionRoot,
  TransitionChild,
} from "@headlessui/vue"
import { watch } from "vue"

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits(["update:modelValue"])
const close = () => emit("update:modelValue", false)

watch(
  () => props.modelValue,
  (val) => {
    document.body.style.overflow = val ? "hidden" : ""
  },
)
</script>

<template>
  <TransitionRoot :show="modelValue" as="template">
    <Dialog as="div" class="relative z-50" @close="close">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <DialogOverlay class="fixed inset-0 bg-black/40" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div class="fixed inset-y-0 right-0 flex max-w-full pl-10">
            <TransitionChild
              as="template"
              enter="transform-gpu transition ease-in-out duration-300"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transform-gpu transition ease-in-out duration-200"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <DialogPanel
                class="pointer-events-auto w-screen max-w-md bg-white shadow-xl flex flex-col will-change-transform"
              >
                <div class="p-4 border-b flex justify-between items-center">
                  <slot name="header">
                    <Dialog.Title class="text-lg font-medium text-gray-900">Panel</Dialog.Title>
                    <button @click="close" class="text-gray-400 hover:text-black text-2xl">
                      &times;
                    </button>
                  </slot>
                </div>
                <div class="p-4 overflow-y-auto max-h-screen">
                  <slot />
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
