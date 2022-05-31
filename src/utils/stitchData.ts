import { IClient, IEmployee, IFullProjectData, IProject } from "../Interfaces";

export default function stitchData(
  projectData: IProject[],
  employeeData: IEmployee[],
  clientData: IClient[]
): IFullProjectData[] {
  const fullProjectData = [];

  for (const project of projectData) {
    const teamMembers = [];
    let teamMember;

    for (const employeeId of project.employeeIds) {
      teamMember = employeeData.filter((element) => {
        return element.id === employeeId;
      });
      teamMembers.push(teamMember[0]);
    }

    const clientDetails: IClient[] = clientData.filter((element) => {
      return (element.id = project.clientId);
    });

    fullProjectData.push({
      project: {
        id: project.id,
        startDate: project.contract.startDate,
        endDate: project.contract.endDate,
        size: project.contract.size,
      },
      client: {
        id: clientDetails[0].id,
        name: clientDetails[0].name,
      },
      team: teamMembers,
    });
  }

  return fullProjectData;
}
