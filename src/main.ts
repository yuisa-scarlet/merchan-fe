import "./style.css"
import { createApp } from "vue"
import { createPinia } from "pinia"
import { VueQueryPlugin } from "@tanstack/vue-query"

import App from "@/App.vue"
import routes from "@/router/index.ts"

const app = createApp(App)
app.use(createPinia())
app.use(routes)
app.use(VueQueryPlugin)

app.mount("#app")
