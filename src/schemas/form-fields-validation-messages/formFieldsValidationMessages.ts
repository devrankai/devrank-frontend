import { UseFormGetValues } from "react-hook-form";
import {
  emailPattern,
  oneNumberPattern,
  onlyNumbers,
  passwordPattern,
} from "../../constants";

const validationMessages = {
  required: "This field is required",
  email: {
    pattern: "Must be a correct email",
  },
  match: {
    password: "Passwords must match",
  },
  password: {
    pattern: "Must be a correct password",
  },
  patternErrorAllCodesByResetPasswordForm: {
    pattern: "The value must be a single numeric character from 0 to 9.",
  },
  position: {
    pattern: "Must be a number",
  },
};

export const formsFieldsValidation = {
  username: {
    required: { value: true, message: validationMessages.required },
  },
  password: {
    required: { value: true, message: validationMessages.required },
    pattern: {
      value: passwordPattern,
      message: validationMessages.password.pattern,
    },
  },
  email: {
    required: { value: true, message: validationMessages.required },
    pattern: {
      value: emailPattern,
      message: validationMessages.email.pattern,
    },
  },
  code1: {
    required: { value: true, message: validationMessages.required },
    pattern: {
      value: oneNumberPattern,
      message:
        validationMessages.patternErrorAllCodesByResetPasswordForm.pattern,
    },
  },
  code2: {
    required: { value: true, message: validationMessages.required },
    pattern: {
      value: oneNumberPattern,
      message:
        validationMessages.patternErrorAllCodesByResetPasswordForm.pattern,
    },
  },
  code3: {
    required: { value: true, message: validationMessages.required },
    pattern: {
      value: oneNumberPattern,
      message:
        validationMessages.patternErrorAllCodesByResetPasswordForm.pattern,
    },
  },
  code4: {
    required: { value: true, message: validationMessages.required },
    pattern: {
      value: oneNumberPattern,
      message:
        validationMessages.patternErrorAllCodesByResetPasswordForm.pattern,
    },
  },
  code5: {
    required: { value: true, message: validationMessages.required },
    pattern: {
      value: oneNumberPattern,
      message:
        validationMessages.patternErrorAllCodesByResetPasswordForm.pattern,
    },
  },
  code6: {
    required: { value: true, message: validationMessages.required },
    pattern: {
      value: oneNumberPattern,
      message:
        validationMessages.patternErrorAllCodesByResetPasswordForm.pattern,
    },
  },
  fullName: { required: { value: true, message: validationMessages.required } },
  confirmPassword: {},
  client: { required: { value: true, message: validationMessages.required } },
  teamExpansion: {
    required: { value: true, message: validationMessages.required },
  },
  position: {
    required: { value: true, message: validationMessages.required },
    pattern: {
      value: onlyNumbers,
      message: validationMessages.position.pattern,
    },
  },
};

export const validationConfirmField = <T extends Record<string, any>>(
  getValues: UseFormGetValues<T>
) => ({
  confirmPassword: {
    required: { value: true, message: validationMessages.required },
    validate: (value: string) => {
      const { password } = getValues();

      return password === value || validationMessages.match.password;
    },
  },
});
