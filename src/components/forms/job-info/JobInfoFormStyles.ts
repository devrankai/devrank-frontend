import { Theme } from "@mui/material";

export const styles = {
  formContainer: {
    maxWidth: "760px",
    gap: (theme: Theme) => theme.spacing(3),
    marginTop: "24px",
  },
  stepsContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontWeight: "600",
    fontSize: "12px",
    lineHeight: "18px",
    color: (theme: Theme) => theme.palette.grey[900],
  },
  select: {
    borderRadius: (theme: Theme) => theme.spacing(0.5),
    border: "1px solid #1A73E8",
    padding: (theme: Theme) => theme.spacing(0.25),
  },
  input: {
    borderRadius: (theme: Theme) => theme.spacing(0.5),
    border: "1px solid #1A73E8",
  },
  btnsContainer: {
    my: 2,
    mr: 2,
    display: "flex",
    gap: 2,
    alignContent: "center",
    justifyContent: "flex-end",
    alignItems: "center",
    flexWrap: "wrap",
  },
};
