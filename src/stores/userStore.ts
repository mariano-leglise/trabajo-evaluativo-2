// src/stores/userStore.ts
import { defineStore } from 'pinia';

export interface User {
  nombre: string;
  rol: 'administrador' | 'usuario';
}

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [
      { nombre: 'mariano', rol: 'administrador' },
      { nombre: 'juan', rol: 'usuario' },
    ] as User[],
  }),
  actions: {
    addUser(nombre: string, rol: 'administrador' | 'usuario') {
      this.users.push({ nombre, rol });
    },
  },
});
