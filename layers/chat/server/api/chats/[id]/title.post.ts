import { updateChat } from "#layers/chat/server/repository/chatRepository";
import {
  createOpenAIModel,
  generateChatTitle,
} from "#layers/chat/server/services/ai-service";

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);
  const { message } = await readBody(event);

  const openaiApiKey = useRuntimeConfig().openaiApiKey;
  const openaiModel = createOpenAIModel(openaiApiKey);

  const title = await generateChatTitle(openaiModel, message);

  return updateChat(id, { title });
});
