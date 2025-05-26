import {
  updateProject,
  getProjectById,
} from "#layers/chat/server/repository/projectRepository";

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);

  const project = await getProjectById(id);

  if (!project) {
    throw createError({
      statusCode: 404,
      statusMessage: "Project not found",
    });
  }

  const { name } = await readBody(event);

  if (!name) {
    throw createError({
      statusCode: 400,
      statusMessage: "Project name is required",
    });
  }

  return updateProject(id, { name });
});
