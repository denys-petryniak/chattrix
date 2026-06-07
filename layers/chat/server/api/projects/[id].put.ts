import {
  updateProject,
  getProjectById,
} from "#layers/chat/server/repository/projectRepository";
import { UpdateProjectSchema } from "#layers/chat/server/schemas";

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);

  const { success, data } = await readValidatedBody(
    event,
    UpdateProjectSchema.safeParse,
  );

  if (!success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid request body",
    });
  }

  const project = await getProjectById(id);

  if (!project) {
    throw createError({
      statusCode: 404,
      statusMessage: "Project not found",
    });
  }

  return updateProject(id, data);
});
