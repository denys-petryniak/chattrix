import { getChatById } from "#layers/chat/server/repository/chatRepository";

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);

  const chat = await getChatById(id);

  if (!chat) {
    throw createError({
      statusCode: 404,
      statusMessage: "Chat not found",
    });
  }

  return chat;
});
