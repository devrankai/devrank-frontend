type FormField = {
  name:
    | "projectName"
    | "projectLead"
    | "projectStartDate"
    | "teamStructure"
    | "teamExpansion"
    | "projectDescription";
  id: string;
  label: string;
  text: string;
  placeholder?: string;
  type?: string;
};

interface ProjectForm {
  [key: string]: FormField;
}

export const projectFormSchema: ProjectForm = {
  projectName: {
    name: "projectName",
    id: "projectName",
    label: "Project Name",
    text: "Project name",
    placeholder: "Project Name",
    type: "text",
  },
  projectLead: {
    name: "projectLead",
    id: "projectLead",
    label: "Project Lead",
    text: "Project lead",
    placeholder: "Project Lead",
    type: "text",
  },
  projectStartDate: {
    name: "projectStartDate",
    id: "projectStartDate",
    label: "Project Start Date",
    text: "Project Start Date",
    placeholder: "Project Start Date",
    type: "date",
  },
  teamStructure: {
    name: "teamStructure",
    id: "teamStructure",
    label: "Team Structure",
    text: "Team Structure",
    placeholder: "Team Structure",
    type: "text",
  },
  teamExpansion: {
    name: "teamExpansion",
    id: "teamExpansion",
    label: "Team Expansion",
    text: "Team Expansion",
    placeholder: "Team Expansion",
    type: "text",
  },
  projectDescription: {
    name: "projectDescription",
    id: "projectDescription",
    label: "Project Description",
    text: "Project Description",
    placeholder: "Project Description",
    type: "text",
  },
};
