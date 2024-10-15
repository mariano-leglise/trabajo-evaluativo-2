<template>
  <div class="login-container">
    <LoginForm />
  </div>
</template>

<script setup lang="ts">
import LoginForm from '../components/LoginForm.vue';
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; 
  background: linear-gradient(135deg, #5e0404, #0c0b0c); 
}
</style>
