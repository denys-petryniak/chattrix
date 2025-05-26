import { createProject } from "#layers/chat/server/repository/projectRepository";

export default defineEventHandler(async (event) => {
  const { name } = await readBody(event);

  if (!name) {
    throw createError({
      statusCode: 400,
      statusMessage: "Project name is required",
    });
  }

  const project = await createProject({ name });

  return project;
});
