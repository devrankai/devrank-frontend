import { Theme } from "@mui/material";

export const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: { md: "48px" },
  },
  errorCodeMessage: {
    fontSize: "12px",
    lineHeight: (theme: Theme) => theme.typography.h5.lineHeight,
    textAlign: "center",
    color: (theme: Theme) => theme.palette.error.main,
    padding: "0px 20px",
    height: "35px",
  } as const,
  buttonsWrapper: {
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    alignItems: "center",
    justifyContent: "space-evenly",
    marginBottom: "18px",
  },
  recoveryButton: {
    padding: "6px",
    fontWeight: 400,
  },
  dotButton: {
    width: "14px",
    height: "14px",
  },
  returnLogInButton: {
    padding: "6px",
    fontWeight: 400,
  },
  continueButton: {
    maxWidth: { xs: "240px", md: "320px" },
    mb: 2,
  },
};
