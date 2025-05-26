import { getAllProjects } from "#layers/chat/server/repository/projectRepository";

export default defineEventHandler(async (_event) => {
  const projects = await getAllProjects();

  return projects;
});
