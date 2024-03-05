import { Theme } from "@mui/material";

export const styles = {
  errorMessage: {
    fontSize: (theme: Theme) => theme.typography.h5.fontSize,
    lineHeight: (theme: Theme) => theme.typography.h5.lineHeight,
    textAlign: "start",
    color: (theme: Theme) => theme.palette.error.main,
    paddingLeft: "5px",
    paddingTop: "5px",
    height: "20px",
    marginBottom: "10px",
  } as const,
};
