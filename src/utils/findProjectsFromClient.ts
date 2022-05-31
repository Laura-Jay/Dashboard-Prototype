import { IProject } from "../Interfaces";

export default function findProjectsFromClient(
  id: string,
  projects: IProject[]
): IProject[] {
  const relevantProjects: IProject[] = [];

  for (const project of projects) {
    if (project.clientId === id) {
      relevantProjects.push(project);
    }
  }

  return relevantProjects;
}
