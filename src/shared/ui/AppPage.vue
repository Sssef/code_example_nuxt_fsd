<script setup lang="ts">
defineProps<{
  title?: string;
  titleId?: string;
}>();

defineSlots<{
  header?: () => VNode[];
  default: () => VNode[];
}>();
</script>

<template>
  <UContainer class="max-w-6xl">
    <div class="space-y-8 py-8 md:py-12">
      <header v-if="$slots.header || title">
        <slot name="header">
          <h1 v-if="title" :id="titleId" class="text-3xl font-bold">
            {{ title }}
          </h1>
        </slot>
      </header>

      <slot />
    </div>
  </UContainer>
</template>
