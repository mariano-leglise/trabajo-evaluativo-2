// src/stores/sesionStore.ts
import { defineStore } from 'pinia';
import { Sesion } from '../models/Sesion';

export const useSesionStore = defineStore('sesion', {
  state: () => ({
    sessionData: null as Sesion | null,
  }),
  actions: {
    update(session: Sesion) {
      this.sessionData = session;
      localStorage.setItem('session', JSON.stringify(session)); // Guardar en localStorage
    },
    loadFromStorage() {
      const storedSession = localStorage.getItem('session');
      if (storedSession) {
        this.sessionData = JSON.parse(storedSession);
      }
    },
    logout() {
      this.sessionData = null;
      localStorage.removeItem('session');
    },
    refreshSession() {
      const now = new Date();
      // Verifica si la sesión existe y si es necesario refrescarla
      if (this.sessionData && now >= this.sessionData.refreshAt) {
        console.log('Refrescando sesión...');
        // Actualiza refreshAt para que expire en 3 minutos a partir de ahora
        this.sessionData.refreshAt = new Date(Date.now() + 3 * 60 * 1000); 
        // Aquí podrías implementar una lógica para refrescar el JWT si fuese necesario.
        // Por ejemplo, puedes llamar a la API para obtener un nuevo token.
      }
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.sessionData,
  },
});
