<template>
  <div class="login-form">
    <Form @submit="onSubmit" autocomplete="off">
      <h1 class="login-title">Iniciar Sesión</h1>
      <div class="form-group">
        <label for="username">Usuario</label>
        <Field
          v-model="username"
          type="text"
          id="username"
          class="input-field"
          name="username"
          required
        />
      </div>
      <div class="form-group">
        <label for="password">Contraseña</label>
        <Field
          v-model="password"
          type="password"
          id="password"
          class="input-field"
          name="password"
          required
        />
      </div>
      <button type="submit" class="login-button">Iniciar Sesión</button>
      <div v-if="error" class="error-message">{{ error }}</div>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Form, Field, useForm } from 'vee-validate'; // Asegúrate de importar useForm
import { useAuthStore } from '../stores/authStore';
import { useSesionStore } from '../stores/sesionStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const sessionStore = useSesionStore();
const router = useRouter();

const { handleSubmit } = useForm(); // Captura el método handleSubmit
const username = ref('');
const password = ref('');
const error = ref('');

const onSubmit = handleSubmit(async () => {
  error.value = ''; // Reinicia el mensaje de error al intentar iniciar sesión
  console.log('Formulario enviado...'); // Verificar en consola
  console.log(`Usuario: ${username.value}, Contraseña: ${password.value}`); // Verificar credenciales

  try {
    const sessionData = await authStore.login(username.value, password.value);
    console.log('Inicio de sesión exitoso:', sessionData); // Confirma inicio de sesión
    sessionStore.update(sessionData); // Actualiza el estado de la sesión
    router.push('/home'); // Redirige a HomeView
  } catch (err) {
    console.error('Error al iniciar sesión:', err);
    error.value = 'Error al iniciar sesión: ' + err.message; 
  }
});
</script>

<style scoped>

.login-form {
  background-color: rgba(20, 20, 20, 0.8);
  padding: 2rem;
  border-radius: 12px;
  backdrop-filter: blur(5px);
  border: none;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.7);
  width: 100%;
  max-width: 400px;
  color: white;
}

.login-title {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #5e0404;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.form-group {
  margin-bottom: 1.5rem;
}

.label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #5e0404;
}

.input-field {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #5e0404;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
  outline: none;
}

.input-field::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.input-field:focus {
  border-color: #4c2f8b;
}

.login-button {
  width: 100%;
  padding: 0.75rem;
  background-color: #5e0404;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  text-transform: uppercase;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 0.05em;
}

.login-button:hover {
  background-color: #4c2f8b;
}

button:focus {
  outline: none;
}

.error-message {
  color: red;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
</style>
