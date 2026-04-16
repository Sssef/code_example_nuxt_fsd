<script setup lang="ts">
defineProps<{
  title: string;
  show: boolean;
  sectionId: string;
}>();
</script>

<template>
  <section v-show="show" class="mt-10" :aria-labelledby="`${sectionId}-title`">
    <h2 class="text-lg font-medium mb-4" :id="`${sectionId}-title`">
      {{ title }}
    </h2>
    <slot />
  </section>
</template>
