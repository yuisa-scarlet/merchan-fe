<script setup lang="ts">
import { useForm } from "vee-validate"
import { toTypedSchema } from "@vee-validate/zod"
import { useRegister, userRegisterPayloadSchema } from "@/api/auth"
import { useRouter } from "vue-router"

const router = useRouter()

const { handleSubmit, defineField, errors } = useForm({
  initialValues: {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  },
  validationSchema: toTypedSchema(userRegisterPayloadSchema),
})

const [name, nameAttrs] = defineField("name")
const [email, emailAttrs] = defineField("email")
const [password, passwordAttrs] = defineField("password")
const [passwordConfirmation, passwordConfirmationAttrs] = defineField("password_confirmation")

const { mutate: register, isPending } = useRegister()

const onSubmit = handleSubmit((values) => {
  register(values, {
    onSuccess: () => {
      router.push({ name: "login" })
      console.info("Registration successful")
    },
    onError: (error) => {
      console.error("Registration failed", error)
    },
  })
})
</script>

<template>
  <div class="p-4 max-w-md mx-auto">
    <h2 class="text-2xl font-bold mb-4">Create an Account</h2>
    <form @submit.prevent="onSubmit" class="flex flex-col gap-y-3">
      <div class="max-w-sm">
        <label for="input-label" class="block text-sm font-medium mb-2"
          >Name<span class="text-red-500">*</span></label
        >
        <input
          v-model="name"
          v-bind="nameAttrs"
          name="name"
          type="text"
          id="input-label"
          class="py-2.5 sm:py-3 px-4 block w-full border border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
          placeholder="you@site.com"
        />
        <span class="text-sm text-red-500">{{ errors.name }}</span>
      </div>
      <div class="max-w-sm">
        <label for="input-label" class="block text-sm font-medium mb-2"
          >Email<span class="text-red-500">*</span></label
        >
        <input
          v-model="email"
          v-bind="emailAttrs"
          name="email"
          type="email"
          id="input-label"
          class="py-2.5 sm:py-3 px-4 block w-full border border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
          placeholder="you@site.com"
        />
        <span class="text-sm text-red-500">{{ errors.email }}</span>
      </div>
      <div class="max-w-sm">
        <label for="input-label" class="block text-sm font-medium mb-2"
          >Password<span class="text-red-500">*</span></label
        >
        <input
          v-model="password"
          v-bind="passwordAttrs"
          name="password"
          type="password"
          id="input-label"
          class="py-2.5 sm:py-3 px-4 block w-full border border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
          placeholder="Your password"
        />
        <span class="text-sm text-red-500">{{ errors.password }}</span>
      </div>
      <div class="max-w-sm">
        <label for="input-label" class="block text-sm font-medium mb-2"
          >Password Confirmation<span class="text-red-500">*</span></label
        >
        <input
          v-model="passwordConfirmation"
          v-bind="passwordConfirmationAttrs"
          name="password_confirmation"
          type="password"
          id="input-label"
          class="py-2.5 sm:py-3 px-4 block w-full border border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
          placeholder="Your password"
        />
        <span class="text-sm text-red-500">{{ errors.password_confirmation }}</span>
      </div>
      <button
        class="bg-blue-600 rounded-md py-2.5 text-white hover:bg-blue-700 w-full shadow-sm"
        type="submit"
      >
        {{ isPending ? "Registering..." : "Create Account" }}
      </button>
      <span class="text-sm"
        >Already have an account?
        <RouterLink
          :to="{ name: 'login' }"
          class="text-sm text-blue-600 font-medium hover:text-blue-500"
          >Sign In</RouterLink
        ></span
      >
    </form>
  </div>
</template>
