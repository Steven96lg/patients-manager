import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

const app = createApp(App)

// Register Pinia before the router to ensure stores are ready in all hooks/components
app.use(createPinia())
app.use(router)

app.mount('#app')
