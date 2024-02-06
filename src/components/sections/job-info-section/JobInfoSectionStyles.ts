import { Theme } from "@mui/material";

export const styles = {
  formContainer: {
    maxWidth: "760px",
    gap: (theme: Theme) => theme.spacing(3),
    marginTop: (theme: Theme) => theme.spacing(3),
  },
};
