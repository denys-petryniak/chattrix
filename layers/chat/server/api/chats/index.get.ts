import { getAllChats } from "#layers/chat/server/repository/chatRepository";

export default defineCachedEventHandler(
  async (_event) => {
    const storage = useStorage("db");
    await storage.setItem("chats:has-new-chat", false);

    return await getAllChats();
  },
  {
    name: "getAllChats",
    maxAge: 0,
    swr: true,
    async shouldInvalidateCache() {
      const storage = useStorage("db");
      const hasNewChat = await storage.getItem<boolean>("chats:has-new-chat");

      return hasNewChat || false;
    },
  },
);
