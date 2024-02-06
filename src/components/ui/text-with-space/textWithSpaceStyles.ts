import { Theme } from "@mui/material";

export const styles = {
  errorForgotMessage: {
    fontSize: (theme: Theme) => theme.typography.h5.fontSize,
    lineHeight: (theme: Theme) => theme.typography.h5.lineHeight,
    textAlign: "center",
    color: (theme: Theme) => theme.palette.error.main,
    padding: (theme: Theme) => theme.spacing(0, 2.5),
    height: "20px",
  } as const,
};
