import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../views/LoginPage.vue';
import HomeView from '../views/HomeView.vue';
import { useSesionStore } from '../stores/sesionStore';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/home',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/',
    redirect: '/login',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Guardia global para proteger rutas
router.beforeEach((to, from, next) => {
  const sessionStore = useSesionStore();
  const isAuthenticated = sessionStore.isAuthenticated;

  if (to.name !== 'Login' && !isAuthenticated) {
    next({ name: 'Login' }); // Redirige al login si no está autenticado
  } else if (to.name === 'Login' && isAuthenticated) {
    next({ name: 'Home' }); // Si está autenticado, redirige a Home
  } else {
    next(); // Continua normalmente
  }
});

export default router;
