<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const { items } = defineProps<{
  title: string;
  items: NavigationMenuItem[];
}>();

const hasNavigationItems = computed(() => items.length > 0);
</script>

<template>
  <div v-if="hasNavigationItems">
    <div class="flex justify-between items-center">
      <h2 class="text-sm font-semibold text-(--ui-text-muted)">
        {{ title }}
      </h2>
    </div>
    <UNavigationMenu orientation="vertical" :items class="w-full mt-2" />
    <slot />
  </div>
</template>
