import { Theme } from "@mui/material";

export const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  errorCodeMessage: {
    fontSize: "12px",
    lineHeight: (theme: Theme) => theme.typography.h5.lineHeight,
    textAlign: "center",
    color: (theme: Theme) => theme.palette.error.main,
    padding: "0px 20px",
    height: "35px",
  } as const,
};
