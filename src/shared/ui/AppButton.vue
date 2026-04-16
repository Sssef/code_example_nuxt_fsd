<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const mergedClass = computed(() => {
  return [
    "transition-colors",
    "cursor-pointer disabled:cursor-not-allowed",
    attrs.class,
  ];
});

const forwardedAttrs = computed(() => {
  const { class: _class, ...rest } = attrs;
  return rest;
});
</script>

<template>
  <UButton v-bind="forwardedAttrs" :class="mergedClass">
    <template v-for="(_, slotName) in $slots" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps ?? {}" />
    </template>
  </UButton>
</template>
