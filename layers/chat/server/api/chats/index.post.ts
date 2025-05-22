import { createChat } from "../../repository/chatRepository";

export default defineEventHandler(async (_event) => {
  return await createChat({
    title: "New Chat",
  });
});
