<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
import type { Chat } from "~/types";

defineProps<{
  isOpen: boolean;
}>();

const { chats, createChatAndNavigate } = useChats();

const getChatsWithoutProject = computed(() =>
  chats.value.filter((chat) => chat.projectId === undefined)
);

const route = useRoute();

function formatChatItem(chat: Chat): NavigationMenuItem {
  return {
    defaultOpen: true,
    label: chat.title || "Untitled Chat",
    to: `/chats/${chat.id}`,
    active: route.params.id === chat.id,
  };
}

function getFilteredChatsByDateRange(startDays: number, endDays?: number) {
  return computed(() =>
    filterChatsByDateRange(
      getChatsWithoutProject.value,
      startDays,
      endDays
    ).map(formatChatItem)
  );
}

const todayChats = getFilteredChatsByDateRange(-1, 1);
const lastWeekChats = getFilteredChatsByDateRange(1, 7);
const lastMonthChats = getFilteredChatsByDateRange(7, 30);
const olderChats = getFilteredChatsByDateRange(30);

async function handleCreateChat() {
  await createChatAndNavigate();
}
</script>

<template>
  <aside
    class="fixed top-16 left-0 bottom-0 w-64 transition-transform duration-300 z-40 bg-(--ui-bg-muted) border-r-(--ui-border) border-r"
    :class="{ '-translate-x-full': !isOpen }"
  >
    <div
      v-if="getChatsWithoutProject.length > 0"
      class="overflow-y-auto p-4 space-y-4"
    >
      <ChatSection title="Today" :items="todayChats" />
      <ChatSection title="Last 7 Days" :items="lastWeekChats" />
      <ChatSection title="Last 30 Days" :items="lastMonthChats" />
      <ChatSection title="Older" :items="olderChats" />
    </div>
    <div v-else class="overflow-y-auto p-4">
      <UAlert
        title="No Chats"
        description="Create a new chat to get started"
        color="neutral"
        variant="soft"
        class="mt-2"
      />
      <UButton
        size="sm"
        color="neutral"
        variant="soft"
        icon="i-heroicons-plus-small"
        class="mt-2 w-full"
        @click="handleCreateChat"
      >
        New Chat
      </UButton>
    </div>
  </aside>
</template>
