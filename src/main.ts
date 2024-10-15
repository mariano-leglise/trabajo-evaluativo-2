
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import { useSesionStore } from './stores/sesionStore';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

// Cargar sesión desde localStorage al iniciar
const sessionStore = useSesionStore();
sessionStore.loadFromStorage();

app.mount('#app');
