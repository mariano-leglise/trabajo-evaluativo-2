// src/stores/authStore.ts
import { defineStore } from 'pinia';
import { Sesion } from '../models/Sesion';

export const useAuthStore = defineStore('auth', {
  state: () => ({}),
  actions: {
    async login(username: string, password: string): Promise<Sesion> {
      console.log('Intentando login con:', username, password); // Depuración

      const response = await fakeApiLogin(username, password);
      if (response) {
        const sessionData: Sesion = {
          tokenPayload: response.token,
          createdAt: new Date(),
          expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hora
          refreshAt: new Date(Date.now() + 3 * 60 * 1000), // 3 minutos para refrescar
          nombre: username, // Agregar el nombre del usuario
          rol: username === 'mariano' ? 'administrador' : 'usuario', // Asignar rol
        };
        return sessionData;
      } else {
        throw new Error('Login fallido');
      }
    },
  },
});

// Simulación de llamada a la API
async function fakeApiLogin(username: string, password: string) {
  console.log('Verificando credenciales...', username, password); // Depuración

  if (username === 'mariano' && password === '123') {
    console.log('Credenciales válidas para Mariano'); // Confirmación
    return { token: 'fake-token', nombre: 'Mariano', rol: 'administrador' }; // Simula una respuesta exitosa
  } else if (username === 'juan' && password === '123') {
    console.log('Credenciales válidas para Juan'); // Confirmación
    return { token: 'fake-token-juan', nombre: 'Juan', rol: 'usuario' }; // Simula una respuesta exitosa para Juan
  } else {
    console.log('Credenciales inválidas'); // Si no coinciden
    return null; // Simula un fallo en la autenticación
  }
}