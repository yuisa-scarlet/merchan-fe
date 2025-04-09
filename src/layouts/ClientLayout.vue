<script setup lang="ts">
import { useLogout } from "@/api/auth"
import { useProfile } from "@/api/user"
import NavLinkDashboard from "@/components/ui/NavLinkDashboard.vue"
import Slideover from "@/components/ui/Slideover.vue"
import DepositForm from "@/views/deposit/DepositForm.vue"
import WithdrawForm from "@/views/withdraw/WithdrawForm.vue"
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue"
import { Bars3Icon, ChevronDownIcon, XMarkIcon } from "@heroicons/vue/24/outline"
import { BanknoteArrowUp, BanknoteArrowDown } from "lucide-vue-next"
import { ref } from "vue"
import { useRouter } from "vue-router"
import { RouterLink, RouterView } from "vue-router"

const router = useRouter()
const role = localStorage.getItem("role")

const user = {
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
}

const navigation = [
  { name: "Overview", href: "dashboard" },
  { name: "Transactions", href: "transactions" },
]

const userNavigation = [{ name: "Your Profile", href: "#" }]

const { data: profile } = useProfile()
const { mutate: logoutMutate } = useLogout()

function handleLogout() {
  logoutMutate(undefined, {
    onSuccess: () => {
      router.push({ name: "home" })
    },
    onError: (error) => {
      console.error("Logout failed", error)
    },
  })
}

const showDeposit = ref(false)
const showWithdraw = ref(false)
</script>

<template>
  <div class="min-h-full">
    <Disclosure as="nav" class="bg-slate-50" v-slot="{ open }">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 justify-between items-center">
          <h1
            class="font-bold text-xl bg-gradient-to-br from-blue-700 to-blue-600 bg-clip-text text-transparent"
          >
            Merchan
          </h1>
          <div class="flex">
            <div class="hidden sm:-my-px sm:flex sm:space-x-3">
              <NavLinkDashboard v-for="item in navigation" :key="item.name" :item="item"
                >{{ item.name }}
              </NavLinkDashboard>
            </div>
          </div>
          <div class="flex gap-2">
            <div class="text-right" v-if="role === 'user'">
              <Menu as="div" class="relative inline-block text-left" v-slot="{ open }">
                <div>
                  <MenuButton
                    class="inline-flex w-full justify-center rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                  >
                    <ChevronDownIcon
                      :class="[
                        'mr-2 h-5 w-5 text-white transition-transform duration-300',
                        open ? 'rotate-180' : 'rotate-0',
                      ]"
                    />
                    Create
                  </MenuButton>
                </div>

                <transition
                  enter-active-class="transition duration-100 ease-out"
                  enter-from-class="transform scale-95 opacity-0"
                  enter-to-class="transform scale-100 opacity-100"
                  leave-active-class="transition duration-75 ease-in"
                  leave-from-class="transform scale-100 opacity-100"
                  leave-to-class="transform scale-95 opacity-0"
                >
                  <MenuItems
                    class="absolute right-0 mt-2 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
                  >
                    <div class="px-1 py-1">
                      <MenuItem v-slot="{ active }">
                        <button
                          @click="showDeposit = true"
                          :class="[
                            active ? 'bg-blue-500 text-white hover:text-white' : 'text-gray-900',
                            'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                          ]"
                        >
                          <BanknoteArrowUp
                            class="mr-2 h-5 w-5 text-gray-400 group-hover:text-white"
                            aria-hidden="true"
                          />
                          Deposit
                        </button>
                      </MenuItem>
                      <MenuItem v-slot="{ active }">
                        <button
                          @click="showWithdraw = true"
                          :class="[
                            active ? 'bg-blue-500 text-white hover:text-white' : 'text-gray-900',
                            'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                          ]"
                        >
                          <BanknoteArrowDown
                            class="mr-2 h-5 w-5 text-gray-400 group-hover:text-white"
                            aria-hidden="true"
                          />
                          Withdraw
                        </button>
                      </MenuItem>
                    </div>
                  </MenuItems>
                </transition>
              </Menu>
            </div>
            <hr class="hidden sm:block sm:ml-2 sm:h-8 sm:w-px sm:bg-gray-200" />
            <div class="hidden sm:ml-2 sm:flex sm:items-center">
              <!-- Profile dropdown -->
              <Menu as="div" class="relative ml-3">
                <div>
                  <MenuButton
                    class="relative flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span class="absolute -inset-1.5" />
                    <span class="sr-only">Open user menu</span>
                    <img class="size-8 rounded-full" :src="user.imageUrl" alt="" />
                  </MenuButton>
                </div>
                <transition
                  enter-active-class="transition ease-out duration-200"
                  enter-from-class="transform opacity-0 scale-95"
                  enter-to-class="transform opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-75"
                  leave-from-class="transform opacity-100 scale-100"
                  leave-to-class="transform opacity-0 scale-95"
                >
                  <MenuItems
                    class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none"
                  >
                    <MenuItem>
                      <div class="ml-3 py-2">
                        <div class="text-sm font-medium text-gray-800">{{ profile?.name }}</div>
                        <div class="text-sm font-medium text-gray-500">{{ profile?.email }}</div>
                      </div>
                    </MenuItem>
                    <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                      <RouterLink
                        :to="item.href"
                        :class="[
                          active ? 'bg-gray-100 outline-none' : '',
                          'block px-4 py-2 text-sm text-gray-700',
                        ]"
                      >
                        {{ item.name }}
                      </RouterLink>
                    </MenuItem>
                    <MenuItem>
                      <button
                        @click="handleLogout"
                        class="w-full hover:bg-gray-100 text-left block px-4 py-2 text-sm text-gray-700"
                      >
                        Sign out
                      </button>
                    </MenuItem>
                  </MenuItems>
                </transition>
              </Menu>
            </div>
            <div class="-mr-2 flex items-center sm:hidden">
              <!-- Mobile menu button -->
              <DisclosureButton
                class="relative inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span class="absolute -inset-0.5" />
                <span class="sr-only">Open main menu</span>
                <Bars3Icon v-if="!open" class="block size-6" aria-hidden="true" />
                <XMarkIcon v-else class="block size-6" aria-hidden="true" />
              </DisclosureButton>
            </div>
          </div>
        </div>
      </div>

      <DisclosurePanel class="sm:hidden">
        <div class="space-y-1 pb-3 pt-2">
          <DisclosureButton v-for="item in navigation" :key="item.name" as="a" :href="item.href">
            {{ item.name }}
          </DisclosureButton>
        </div>
        <div class="border-t border-gray-200 pb-3 pt-4">
          <div class="flex items-center px-4">
            <div class="shrink-0">
              <img class="size-10 rounded-full" :src="user.imageUrl" alt="" />
            </div>
            <div class="ml-3">
              <div class="text-base font-medium text-gray-800">{{ profile?.name }}</div>
              <div class="text-sm font-medium text-gray-500">{{ profile?.email }}</div>
            </div>
          </div>
          <div class="mt-3 space-y-1">
            <DisclosureButton
              v-for="item in userNavigation"
              :key="item.name"
              as="a"
              :href="item.href"
              class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
            >
              {{ item.name }}
            </DisclosureButton>
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>

    <main class="bg-slate-50 p-2">
      <div class="bg-white h-screen rounded-2xl border border-gray-200">
        <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <RouterView />
        </div>
      </div>
    </main>

    <Slideover v-model="showDeposit">
      <template #header>
        <h2 class="text-lg font-semibold">Deposit</h2>
        <button @click="showDeposit = false" class="text-gray-400 hover:text-gray-700 text-xl">
          &times;
        </button>
      </template>
      <div class="p-2">
        <DepositForm :on-close="() => (showDeposit = false)" />
      </div>
    </Slideover>

    <Slideover v-model="showWithdraw">
      <template #header>
        <h2 class="text-lg font-semibold">Withdraw</h2>
        <button @click="showWithdraw = false" class="text-gray-400 hover:text-gray-700 text-xl">
          &times;
        </button>
      </template>
      <div class="p-2">
        <WithdrawForm :on-close="() => (showWithdraw = false)" />
      </div>
    </Slideover>
  </div>
</template>
