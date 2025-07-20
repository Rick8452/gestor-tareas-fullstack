<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container">
      <router-link to="/" class="navbar-brand">Gestor de Tareas</router-link>
    </div>
  </nav>
  
  <div class="container my-4">
    <router-view />
  </div>
</template>

<style>
body {
  background-color: #f8f9fa;
}
</style>