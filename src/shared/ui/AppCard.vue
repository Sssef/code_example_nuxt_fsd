<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});

interface AppCardProps {
  hover?: boolean;
  flex?: boolean;
}

const props = withDefaults(defineProps<AppCardProps>(), {
  hover: true,
  flex: false,
});

const attrs = useAttrs();

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null;
};

const mergedClass = computed(() => {
  return [
    props.flex && "flex flex-col justify-between",
    props.hover && "transition-shadow duration-200 hover:shadow-md",
    attrs.class,
  ];
});

const mergedUi = computed(() => {
  const userUi = isRecord(attrs.ui) ? attrs.ui : {};

  return {
    ...userUi,
    header: [
      "p-4 pb-4 border-transparent flex flex-col gap-3 items-center text-center",
      userUi.header,
    ],
    body: ["px-6 pb-4 pt-0 border-transparent text-center", userUi.body],
    footer: ["px-6 pt-0 pb-6 border-transparent text-center", userUi.footer],
  } as Record<string, any>;
});

const forwardedAttrs = computed(() => {
  const { class: _class, ui: _ui, ...rest } = attrs;
  return rest;
});
</script>

<template>
  <UCard v-bind="forwardedAttrs" :class="mergedClass" :ui="mergedUi">
    <template v-for="(_, slotName) in $slots" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps ?? {}" />
    </template>
  </UCard>
</template>
