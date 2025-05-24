import {
  getMessagesByChatId,
  createMessageForChat,
} from "#layers/chat/server/repository/chatRepository";
import {
  createOpenAIModel,
  generateChatResponse,
} from "#layers/chat/server/services/ai-service";

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);

  const history = getMessagesByChatId(id);

  const openaiApiKey = useRuntimeConfig().openaiApiKey;
  const openaiModel = createOpenAIModel(openaiApiKey);

  const reply = await generateChatResponse(openaiModel, history);

  return createMessageForChat({
    chatId: id,
    content: reply,
    role: "assistant",
  });
});
