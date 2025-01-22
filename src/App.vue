<template>
  <div class="min-h-screen w-full flex flex-col font-Orbitron bg-app-background">
    <SiteNavigation />
    <RouterView />
  </div>
</template>

<script setup>
import SiteNavigation from "./components/SiteNavigation.vue";

</script>

<style lang="scss" scoped>
#app {
  height: 100vh;
}
</style>