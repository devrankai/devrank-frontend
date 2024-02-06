import { Theme } from "@mui/material";

export const styles = {
  btnContainer: {
    display: "flex",
    flexWrap: "wrap",
    alignContent: "center",
    justifyContent: "flex-end",
    alignItems: "center",
    margin: (theme: Theme) => theme.spacing(3, 1.5, 3, 0),
    gap: (theme: Theme) => theme.spacing(3),
  },
  textarea: {
    height: "96px",
    alignItems: "flex-start",
    borderRadius: (theme: Theme) => theme.spacing(0.5),
    border: "1px solid #1A73E8",
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
};
