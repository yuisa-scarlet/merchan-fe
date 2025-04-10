<script setup lang="ts">
import { useForm } from "vee-validate"
import { toTypedSchema } from "@vee-validate/zod"
import { useLogin, userLoginPayloadSchema } from "@/api/auth"
import { useRouter } from "vue-router"

const router = useRouter()

const { handleSubmit, defineField, errors } = useForm({
  initialValues: {
    email: "",
    password: "",
  },
  validationSchema: toTypedSchema(userLoginPayloadSchema),
})

const [email, emailAttrs] = defineField("email")
const [password, passwordAttrs] = defineField("password")

const { mutate: login, isPending } = useLogin()

const onSubmit = handleSubmit((values) => {
  login(values, {
    onSuccess: (data) => {
      const role = data.user.role.name

      if (role === "user") {
        router.push({ name: "dashboard.client" })
      } else if (role === "admin") {
        router.push({ name: "dashboard.admin" })
      }

      console.info("Login successful")
    },
    onError: (error) => {
      console.error("Login failed", error)
    },
  })
})
</script>

<template>
  <div class="p-4 max-w-md mx-auto">
    <h2 class="text-2xl font-bold mb-4">Login</h2>
    <form @submit.prevent="onSubmit" class="flex flex-col gap-y-3">
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
      <button
        class="bg-blue-600 rounded-md py-2.5 text-white hover:bg-blue-700 w-full shadow-sm"
        type="submit"
      >
        {{ isPending ? "Loading..." : "Login" }}
      </button>
      <span class="text-sm"
        >Don't have an account?
        <RouterLink
          :to="{ name: 'register' }"
          class="text-sm text-blue-600 font-medium hover:text-blue-500"
          >Create Account</RouterLink
        ></span
      >
    </form>
  </div>
</template>
