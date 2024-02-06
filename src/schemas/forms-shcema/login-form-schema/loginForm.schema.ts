type FormField = {
  name: "username" | "password";
  id: string;
  label: string;
  text: string;
  type: string;
};

interface LoginForm {
  [key: string]: FormField;
}

export const loginFormSchema: LoginForm = {
  username: {
    name: "username",
    id: "username",
    label: "username",
    text: "Your email",
    type: "text",
  },
  password: {
    name: "password",
    id: "password",
    label: "password",
    text: "Your password",
    type: "password",
  },
};
