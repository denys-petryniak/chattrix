<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
import type { Project, Chat } from "~/types";

defineProps<{
  isOpen: boolean;
}>();

const route = useRoute();

const { projects, createProject } = useProjects();
const { chats, getChatsByProjectId, createChatAndNavigate } = useChats();

function isCurrentProject(projectId: string): boolean {
  return route.params.projectId === projectId;
}

const currentProjectChats = computed(() =>
  getChatsByProjectId(route.params.projectId as string)
);

function formatProjectChat(project: Project, chat: Chat): NavigationMenuItem {
  return {
    label: chat.title || "Untitled Chat",
    to: `/projects/${project.id}/chats/${chat.id}`,
    active: route.params.id === chat.id,
  };
}

function formatProjectItem(project: Project): NavigationMenuItem {
  const isActiveProject = isCurrentProject(project.id);

  const baseItem: NavigationMenuItem = {
    label: project.name,
    to: `/projects/${project.id}`,
    active: isActiveProject,
    defaultOpen: isActiveProject,
  };

  if (isActiveProject) {
    return {
      ...baseItem,
      children: currentProjectChats.value.map((chat) =>
        formatProjectChat(project, chat)
      ),
    };
  }

  return baseItem;
}

const projectItems = computed<NavigationMenuItem[]>(
  () => projects.value?.map(formatProjectItem) || []
);

async function handleCreateProject() {
  const newProject = await createProject();

  if (newProject) {
    await createChatAndNavigate({
      projectId: newProject.id,
    });
  }
}

const getChatsWithoutProject = computed(() =>
  chats.value.filter((chat) => chat.projectId === undefined)
);

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
    <ChatNavigationSection
      title="Projects"
      :items="projectItems"
      class="overflow-auto p-4 border-b border-(--ui-border)"
    >
      <UButton
        size="sm"
        color="neutral"
        variant="soft"
        icon="i-heroicons-plus-small"
        class="mt-2 w-full"
        @click="handleCreateProject"
      >
        New Chat in Project
      </UButton>
    </ChatNavigationSection>
    <div
      v-if="getChatsWithoutProject.length > 0"
      class="overflow-y-auto mt-4 p-4 space-y-4"
    >
      <ChatNavigationSection title="Today" :items="todayChats" />
      <ChatNavigationSection title="Last 7 Days" :items="lastWeekChats" />
      <ChatNavigationSection title="Last 30 Days" :items="lastMonthChats" />
      <ChatNavigationSection title="Older" :items="olderChats" />
    </div>
    <div v-else class="overflow-y-auto mt-4 p-4">
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
