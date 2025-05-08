<script setup lang="ts">
const { title: appTitle } = useAppConfig();

const { createChat } = useChats();

function handleCreateChat() {
  createChat();
}
</script>

<template>
  <UContainer class="page-container">
    <span class="text-2xl font-bold">{{ appTitle }}</span>
    <UButton class="button mt-3" @click="handleCreateChat">
      Start Chat
    </UButton>
  </UContainer>
</template>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.title {
  font-size: 2.25rem;
  font-weight: bold;
}

.button {
  margin-top: 1rem;
}
</style>
