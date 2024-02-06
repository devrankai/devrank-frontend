export type ProjectTypes = {
  project_id: number;
  project_name: string;
  start_date: number;
  team_structure_id: string;
  team_expansion_prospects_id: string;
  project_desc: string;
  project_lead: string;
  active: boolean;
  InsertDate: Date;
  ModifiedDate: Date;
};

export class ProjectModel {
  project_id: number;
  project_name: string;
  start_date: number;
  team_structure_id: string;
  team_expansion_prospects_id: string;
  project_desc: string;
  project_lead: string;
  active: boolean;
  InsertDate: Date;
  ModifiedDate: Date;

  constructor({
    project_id,
    project_name,
    start_date,
    team_structure_id,
    team_expansion_prospects_id,
    project_desc,
    project_lead,
    active,
    InsertDate,
    ModifiedDate,
  }: ProjectTypes) {
    this.project_id = project_id;
    this.project_name = project_name;
    this.start_date = start_date;
    this.team_structure_id = team_structure_id.toString();
    this.team_expansion_prospects_id = team_expansion_prospects_id.toString();
    this.project_desc = project_desc;
    this.project_lead = project_lead;
    this.active = active;
    this.InsertDate = InsertDate;
    this.ModifiedDate = ModifiedDate;
  }

  static getAdaptedProject = (projectData: ProjectTypes): ProjectModel => {
    return new ProjectModel({ ...projectData });
  };
}
