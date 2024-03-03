import { Theme } from "@mui/material";

export const styles = {
  container: {
    maxWidth: { xs: "300px", sm: "570px" },
    width: "90%",
  },
  btnAddNewClientContainer: {
    display: "flex",
    flexWrap: "wrap",
    alignContent: "center",
    justifyContent: "flex-end",
    alignItems: "center",
    margin: (theme: Theme) => theme.spacing(1.5, 1.5, 1.5, 0),
  },
  btnNextContainer: {
    display: "flex",
    flexWrap: "wrap",
    alignContent: "center",
    justifyContent: "flex-end",
    alignItems: "center",
    margin: (theme: Theme) => theme.spacing(3, 1.5, 3, 0),
  },
};
