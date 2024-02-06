type FormField = {
  name:
    | "client"
    | "state"
    | "city"
    | "industry"
    | "companySize"
    | "companyDescription";
  id: string;
  label: string;
  text: string;
  type?: string;
};

interface ClientForm {
  [key: string]: FormField;
}

export const clientFormSchema: ClientForm = {
  client: {
    name: "client",
    id: "client",
    label: "Client",
    text: "Project name",
    type: "text",
  },
  state: {
    name: "state",
    id: "state",
    label: "State",
    text: "Select Item",
    type: "text",
  },
  city: {
    name: "city",
    id: "city",
    label: "City",
    text: "Select Item",
    type: "text",
  },
  industry: {
    name: "industry",
    id: "industry",
    label: "Industry",
    text: "Select Item",
    type: "text",
  },
  companySize: {
    name: "companySize",
    id: "companySize",
    label: "Company Size",
    text: "Select Item",
    type: "text",
  },
  companyDescription: {
    name: "companyDescription",
    id: "companyDescription",
    label: "Company Description",
    text: "Company Description",
    type: "text",
  },
};
