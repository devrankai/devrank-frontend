type FormField = {
  // name: "fullName" | "password" | "confirmPassword";
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
  // fullName: {
  //   name: "fullName",
  //   id: "fullName",
  //   label: "Full Name",
  //   text: "Full Name",
  //   type: "fullName",
  // },
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
