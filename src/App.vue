<script setup>
import SideMenu from './components/SideMenu.vue'
</script>

<template>
  <div class="app-container">
    <SideMenu />
    <main class="main-content">
      <router-view></router-view>
    </main>
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
}

.app-container {
  min-height: 100vh;
}

.main-content {
  padding: 20px 20px 20px 60px; /* Added left padding to account for hamburger button */
  min-height: 100vh;
}
</style>