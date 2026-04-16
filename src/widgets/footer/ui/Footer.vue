<script setup lang="ts">
const fullYear = new Date().getFullYear();
</script>

<template>
  <footer class="border-t border-gray-800 py-6" aria-label="Подвал сайта">
    <div class="container mx-auto px-4 text-center text-muted text-sm">
      © {{ fullYear }} Cinema Booking Platform
    </div>
  </footer>
</template>
