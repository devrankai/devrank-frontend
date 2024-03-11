type FormField = {
  name:
    | "contractModel"
    | "testTask"
    | "role"
    | "position"
    | "mustHaveTechnologies"
    | "niceToHaveTechnologies"
    | "mustHaveSkills"
    | "niceToHaveSkills"
    | "testTask"
    | "skillLevel"
    | "methodology"
    | "contactModel"
    | "meetingFrequency"
    | "contractPeriod"
    | "timeTracking"
    | "location"
    | "earliestStartDate" 
    | "positionClosedByDate" 
    | "probationPeriod";
  id: string;
  label: string;
  text?: string;
  placeholder?: string;
  type?: string;
};

interface JobDescriptionForm {
  [key: string]: FormField;
}

export const jobDescriptionFormSchema: JobDescriptionForm = {
  contractModel: {
    name: "contractModel",
    id: "contractModel",
    label: "Contractor Model",
    text: "Contractor Model",
    placeholder: "Select Item",
  },
  testTask: {
    name: "testTask",
    id: "test-task",
    label: "Test Task",
    text: "Project name",
    placeholder: "Select Item",
  },
  role: {
    name: "role",
    id: "role",
    label: "Role",
    text: "Project name",
    placeholder: "Select Item",
    type: "text",
  },
  position: {
    name: "position",
    id: "position",
    label: "Position",
    text: "Project position",
    placeholder: "Text here",
    type: "text",
  },
  mustHaveTechnologies: {
    name: "mustHaveTechnologies",
    id: "mustHaveTechnologies",
    label: "Must have Technologies",
    text: "Select Item",
    placeholder: "Select Item",
    type: "text",
  },
  niceToHaveTechnologies: {
    name: "niceToHaveTechnologies",
    id: "niceToHaveTechnologies",
    label: "Nice to have technologies",
    text: "Select Item",
    placeholder: "Select Item",
    type: "text",
  },
  skillLevel: {
    name: "skillLevel",
    id: "skillLevel",
    label: "Skill Level",
    text: "Select Item",
    placeholder: "Select Item",
    type: "text",
  },
  mustHaveSkills: {
    name: "mustHaveSkills",
    id: "mustHaveSkills",
    label: "Must have Skills",
    text: "Select Item",
    placeholder: "Select Item",
    type: "text",
  },
  niceToHaveSkills: {
    name: "niceToHaveSkills",
    id: "niceToHaveSkills",
    label: "Nice to have Skills",
    text: "Select Item",
    placeholder: "Select Item",
    type: "text",
  },
  methodology: {
    name: "methodology",
    id: "methodology",
    label: "Methodology",
    text: "Select Item",
    placeholder: "Select Item",
    type: "text",
  },
  location: {
    name: "location",
    id: "location",
    label: "Location",
    text: "Select Item",
    placeholder: "Select Item",
    type: "text",
  },
  timeTracking: {
    name: "timeTracking",
    id: "timeTracking",
    label: "Time Tracking",
  },
  meetingFrequency: {
    name: "meetingFrequency",
    id: "meetingFrequency",
    label: "Meeting Frequency",
  },
  contractPeriod: {
    name: "contractPeriod",
    id: "contractPeriod",
    label: "Contract Period",
  },
  probationPeriod: {
    name: "probationPeriod",
    id: "probationPeriod",
    label: "Probation period",
  },
};
