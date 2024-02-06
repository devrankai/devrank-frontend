type FormField = {
  name: "code1" | "code2" | "code3" | "code4" | "code5" | "code6";
  id: string;
  type: string;
};

interface ResetPasswordForm {
  [key: string]: FormField;
}

export const resetPasswordForm: ResetPasswordForm = {
  code1: {
    name: "code1",
    id: "code1",
    type: "string",
  },
  code2: {
    name: "code2",
    id: "code2",
    type: "string",
  },
  code3: {
    name: "code3",
    id: "code3",
    type: "string",
  },
  code4: {
    name: "code4",
    id: "code4",
    type: "string",
  },
  code5: {
    name: "code5",
    id: "code5",
    type: "string",
  },
  code6: {
    name: "code6",
    id: "code6",
    type: "string",
  },
};
