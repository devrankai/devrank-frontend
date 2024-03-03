import {
  Box,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useErrorsValidationForm } from "../../../../hooks";
import { PUBLIC_ROUTES } from "../../../../routes/public-routes/routes";
import { formsFieldsValidation, signUpFormSchema } from "../../../../schemas";
import { styles } from "./SignUpFormStyles";

interface IFormInputs {
  email: string;
}

export const SignUpForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInputs>();

  const { errorsValidationForm } = useErrorsValidationForm();

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    if (!data.email) return;

    reset();

    navigate(PUBLIC_ROUTES.SIGN_UP_CODE, {
      state: {
        email: data.email,
      },
    });
  };

  return (
    <Box component="div" sx={styles.formContainer}>
      <Box component="form" sx={styles.box} onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <InputLabel htmlFor="email">
            {signUpFormSchema.email.label}
          </InputLabel>
          <OutlinedInput
            id={signUpFormSchema.email.id}
            {...register(
              signUpFormSchema.email.name,
              formsFieldsValidation[signUpFormSchema.email.name]
            )}
            type={signUpFormSchema.email.type}
          />
          {errors &&
            errorsValidationForm({
              errors: errors,
              errorKey: signUpFormSchema.email.name,
            })}
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Sign up
        </Button>
      </Box>
      <Typography color="#0C0C0D" mt={3}>
        {`Already have a DEVRANK account? `}
        <Link to={PUBLIC_ROUTES.LOG_IN} className="link">
          Log in
        </Link>
      </Typography>
    </Box>
  );
};
