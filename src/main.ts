import './style.css'
import { createApp } from 'vue'
import App from '@/App.vue'
import routes from '@/router/index.ts'
import { VueQueryPlugin } from '@tanstack/vue-query'

const app = createApp(App)
app.use(routes)
app.use(VueQueryPlugin, {
  enableDevtoolsV6Plugin: true,
})

app.mount('#app')
