<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const isOpen = ref(false)
const router = useRouter()

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const navigateTo = (route) => {
  router.push(route)
  isOpen.value = false
}
</script>

<template>
  <div class="menu-container">
    <!-- Hamburger Button -->
    <button class="hamburger" @click="toggleMenu">
      <span></span>
      <span></span>
      <span></span>
    </button>

    <!-- Overlay -->
    <div 
      class="overlay" 
      :class="{ 'active': isOpen }"
      @click="toggleMenu"
    ></div>

    <!-- Side Menu -->
    <div class="side-menu" :class="{ 'open': isOpen }">
      <div class="menu-header">
        <h3>Menu</h3>
      </div>
      <nav class="menu-items">
        <a @click="navigateTo('/')" :class="{ 'active': $route.path === '/' }">
          Home
        </a>
        <a @click="navigateTo('/daily-progress')" :class="{ 'active': $route.path === '/daily-progress' }">
          Progress Tracker
        </a>
        <a @click="navigateTo('/community')" :class="{ 'active': $route.path === '/community' }">
          Community
        </a>
        <a @click="navigateTo('/resources')" :class="{ 'active': $route.path === '/resources' }">
          Resources
        </a>
        <a @click="navigateTo('/chat')" :class="{ 'active': $route.path === '/chat' }">
          Chat with Sahayak
        </a>
      </nav>
    </div>
  </div>
</template>

<style scoped>
.menu-container {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

.hamburger {
  position: fixed;
  top: 20px;
  left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1001;
}

.hamburger span {
  width: 2rem;
  height: 0.25rem;
  background: hsl(0, 2%, 18%);
  border-radius: 10px;
  transition: all 0.3s linear;
  position: relative;
  transform-origin: 1px;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: none;
  z-index: 999;
}

.overlay.active {
  display: block;
}

.side-menu {
  position: fixed;
  top: 0;
  left: -250px;
  height: 100%;
  width: 250px;
  background: #000;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
}

.side-menu.open {
  transform: translateX(250px);
}

.menu-header {
  padding: 20px;
  border-bottom: 1px solid #333;
}

.menu-header h3 {
  margin: 0;
  color: #fff;
}

.menu-items {
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.menu-items a {
  padding: 15px 0;
  color: #fff;
  text-decoration: none;
  border-bottom: 1px solid #333;
  cursor: pointer;
  transition: color 0.3s ease;
}

.menu-items a:hover {
  color: #4CAF50;
}

.menu-items a.active {
  color: #4CAF50;
  font-weight: bold;
}
</style>
