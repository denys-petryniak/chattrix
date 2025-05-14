import useProjects from "./useProjects";
import type { Project } from "~~/layers/chat/app/types";

export default function useProject(projectId: string) {
  const { projects } = useProjects();

  const project = computed(() =>
    projects.value.find((project) => project.id === projectId)
  );

  function updateProject(updatedProject: Partial<Project>) {
    const currentProject = project.value;

    if (!currentProject) return;

    const targetProjectIndex = projects.value.findIndex(
      (project) => project.id === projectId
    );

    if (targetProjectIndex === -1) return;

    projects.value[targetProjectIndex] = {
      ...currentProject,
      ...updatedProject,
      id: projectId, // ensures ID is preserved
    };
  }

  return {
    project,
    updateProject,
  };
}
