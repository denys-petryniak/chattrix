export default function useProject(projectId: string) {
  const { projects } = useProjects();

  const project = computed(() =>
    projects.value.find((project) => project.id === projectId)
  );

  async function updateProject(updatedProject: Partial<Project>) {
    if (!project.value) return;

    const response = await $fetch<Project>(`/api/projects/${projectId}`, {
      method: "PUT",
      body: {
        ...updatedProject,
      },
    });

    // Merge with existing to update in our data store
    projects.value = projects.value.map((project) =>
      project.id === projectId ? { ...project, ...response } : project
    );
  }

  return {
    project,
    updateProject,
  };
}
