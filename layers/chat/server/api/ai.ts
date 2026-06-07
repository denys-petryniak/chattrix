import {
  createOpenAIModel,
  generateChatResponse,
} from "#layers/chat/server/services/ai-service";
import { ChatMessageSchema } from "#layers/chat/server/schemas";

export default defineEventHandler(async (event) => {
  const { success, data } = await readValidatedBody(
    event,
    ChatMessageSchema.safeParse,
  );

  if (!success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid request body",
    });
  }

  const { messages } = data;

  const openaiApiKey = useRuntimeConfig().openaiApiKey;
  const openaiModel = createOpenAIModel(openaiApiKey);

  // you can use Ollama model as well
  // const ollamaModel = createOllamaModel();

  const response = await generateChatResponse(openaiModel, messages);

  return {
    id: messages.length.toString(),
    role: "assistant",
    content: response,
  };
});
