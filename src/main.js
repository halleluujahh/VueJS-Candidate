// import css
import './assets/styles/base/commons.css'
import './assets/styles/components/modal.css'
import './assets/styles/components/toast.css'
import './assets/styles/pages/candidate.css'

import { createApp } from 'vue'
// import vue modules
import App from './App.vue'
import router from './router'
// import custom components
import Toast from './components/toast/Toast'
// import seed data
import { seedData } from './stores/SeedData'
const app = createApp(App)

app.use(router)
app.use(Toast)

// Load seed data before mounting
seedData().then(() => {
    app.mount('#app')
})
