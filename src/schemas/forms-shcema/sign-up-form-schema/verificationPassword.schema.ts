type FormField = {
  name: "password" | "confirmPassword";
  id: string;
  label: string;
  text: string;
  type: string;
};

interface LoginForm {
  [key: string]: FormField;
}

export const verificationPasswordFormSchema: LoginForm = {
  password: {
    name: "password",
    id: "password",
    label: "Password",
    text: "Password",
    type: "password",
  },
  confirmPassword: {
    name: "confirmPassword",
    id: "confirmPassword",
    label: "Re-enter password",
    text: "Re-enter password",
    type: "password",
  },
};
