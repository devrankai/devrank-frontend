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
};
