<template>
  <div class="home-container">
    <div class="card">
      <!-- Panel de información del usuario -->
      <div class="panel user-info">
        <h1>Bienvenido</h1>
        <p class="info-title">Información de tu usuario:</p>
        <p><strong>Nombre:</strong> {{ sessionData?.nombre || 'No hay sesión activa' }}</p>
        <p><strong>Rol:</strong> {{ sessionData?.rol || 'No hay sesión activa' }}</p>

        <p class="info-title">Información de sesión:</p>
        <p><strong>JWT Payload:</strong> {{ sessionData?.tokenPayload || 'No hay sesión activa' }}</p>
        <p><strong>JWT Creado:</strong> {{ sessionData?.createdAt?.toLocaleString() || 'No hay sesión activa' }}</p>
        <p><strong>JWT Refrescará:</strong> {{ sessionData?.refreshAt?.toLocaleString() || 'No hay sesión activa' }}</p>
      </div>

      <!-- Panel de administración (solo para administradores) -->
      <div v-if="sessionData?.rol === 'administrador'" class="panel admin-info">
        <h2>Usuarios</h2>
        <ul>
          <li v-for="user in users" :key="user.nombre">
            {{ user.nombre }} [{{ user.rol }}]
          </li>
        </ul>

        <h3>Agregar un nuevo usuario</h3>
        <input v-model="newUser.nombre" placeholder="Nombre del usuario" />
        <select v-model="newUser.rol">
          <option value="usuario">Usuario</option>
          <option value="administrador">Administrador</option>
        </select>
        <button @click="addUser">Agregar Usuario</button>
      </div>

      <button class="logout-button" @click="logout">Cerrar sesión</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive } from 'vue';
import { useSesionStore } from '../stores/sesionStore';
import { useUserStore } from '../stores/userStore';
import { useRouter } from 'vue-router';

// Instancias de los stores y router
const sessionStore = useSesionStore();
const userStore = useUserStore();
const router = useRouter();

// Datos reactivos para el nuevo usuario
const newUser = reactive({
  nombre: '',
  rol: 'usuario' as 'usuario' | 'administrador',
});

// Computed para acceder a los usuarios y sesión
const users = computed(() => userStore.users);
const sessionData = computed(() => sessionStore.sessionData);

// Método para agregar un usuario
const addUser = () => {
  if (!newUser.nombre.trim()) {
    alert('El nombre no puede estar vacío');
    return;
  }
  userStore.addUser(newUser.nombre, newUser.rol);
  newUser.nombre = '';
  newUser.rol = 'usuario';
};

// Verificar sesión al montar el componente
onMounted(() => {
  sessionStore.refreshSession();
});

// Cerrar sesión y redirigir al login
const logout = () => {
  sessionStore.logout();
  router.push('/login');
};
</script>

<style scoped>
/* Contenedor principal */
.home-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #2e2e2e, #0b0b0b);
  padding: 10px;
}

/* Tarjeta con los paneles */
.card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 15px; /* Reducido para compactar */
  width: 85%; /* Mantener el tamaño general */
  max-width: 350px; /* Máximo ancho más pequeño */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Sombra más ligera */
}

/* Paneles internos para separación */
.panel {
  margin-bottom: 10px; /* Reducido para mayor compacidad */
  padding: 10px; /* Reducido para mayor compacidad */
  background: rgba(255, 255, 255, 0.15);
  border-radius: 6px; /* Bordes más suaves */
}

/* Títulos */
h1, h2, h3 {
  color: #ffffff;
  margin: 5px 0; /* Menor margen */
}

/* Listado de usuarios */
ul {
  list-style: none;
  padding: 0;
  margin: 0 0 5px 0; /* Reducido margen inferior */
}

/* Inputs y selects */
input, select {
  width: calc(100% - 14px);
  padding: 8px; /* Menos padding */
  margin: 4px 0; /* Menos margen */
  border-radius: 4px; /* Bordes más suaves */
  border: none;
  background-color: #444; /* Color de fondo más oscuro */
  color: white; /* Texto en blanco */
}

/* Botones */
button {
  width: 100%;
  padding: 8px; /* Menos padding */
  margin-top: 5px; /* Menor margen */
  background-color: #5e0404;
  color: white;
  border: none;
  border-radius: 4px; /* Bordes más suaves */
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #4c2f8b;
}

/* Información del usuario */
.user-info {
  margin-bottom: 5px; /* Menor margen */
}

.admin-info {
  margin-top: 5px; /* Menor margen */
}
</style>