import { Theme } from "@mui/material";

export const styles = {
  container: {
    marginTop: { xs: "20px", md: "100px" },
    marginBottom: { md: "20px" },
    flexDirection: "column",
    flaxWrap: "wrap",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    gap: (theme: Theme) => theme.spacing(1.5),
  },
};
