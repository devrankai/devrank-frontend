type FormField = {
  name: "email";
  id: string;
  label: string;
  text: string;
  type: string;
};

interface LoginForm {
  [key: string]: FormField;
}

export const signUpFormSchema: LoginForm = {
  email: {
    name: "email",
    id: "email",
    label: "Your email",
    text: "Your email",
    type: "text",
  },
};
