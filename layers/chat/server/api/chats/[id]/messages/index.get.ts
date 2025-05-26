import { getMessagesByChatId } from "#layers/chat/server/repository/chatRepository";

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);

  const messages = await getMessagesByChatId(id);

  if (!messages || messages.length === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: "Messages not found for this chat",
    });
  }

  return messages;
});
