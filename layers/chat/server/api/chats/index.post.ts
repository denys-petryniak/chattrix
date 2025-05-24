import { createChat } from "#layers/chat/server/repository/chatRepository";

export default defineEventHandler(async (event) => {
  const { title, projectId } = await readBody(event);

  return await createChat({
    title,
    projectId,
  });
});
