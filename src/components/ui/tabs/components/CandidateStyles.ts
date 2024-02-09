import { Theme } from "@mui/material";

export const styles = {
  info: {
    marginTop: "8px",
    fontWeight: "500",
    fontSize: "16px",
    lineHeight: "24px",
    color: "#181818",
    maxWidth: "410px",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    justifyContent: "flex-start",
    gap: (theme: Theme) => theme.spacing(1.5),
    margin: (theme: Theme) => theme.spacing(1.5, 0, 4),
  },
  button: {
    maxWidth: "230px",
    fontSize: { xs: "12px", sm: "14px" },
    padding: (theme: Theme) => theme.spacing(1.5, 2),
  },
  wrapperCodeProfile: { 
    gap: (theme: Theme) => theme.spacing(1.5),
    marginBottom: (theme: Theme) => theme.spacing(3),
    maxWidth: "800px",
    height: {xs: "660px", md: "460px"}
  }
};
