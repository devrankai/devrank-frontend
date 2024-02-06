import { Typography } from "@mui/material";
import { styles } from "./errorValidationForm.styles";

export type ErrorValidation = {
  errors: Record<string, any>;
  errorKey: string;
};

export const useErrorsValidationForm = () => {
  const errorsValidationForm = ({ errors, errorKey }: ErrorValidation) => {
    return (
      <Typography
        className="useErrorsValidationForm-errorsValidationForm"
        sx={styles.errorMessage}
      >
        {errors[errorKey] ? errors[errorKey].message : ""}
      </Typography>
    );
  };

  return { errorsValidationForm };
};
