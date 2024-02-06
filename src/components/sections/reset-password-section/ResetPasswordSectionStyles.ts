import { Theme } from "@mui/material";

export const styles = {
  container: {
    marginTop: { xs: "20px", md: "20px" },
    flexDirection: "column",
    flaxWrap: "wrap",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    gap: (theme: Theme) => theme.spacing(1),
  },
  text1: {
    textAlign: "center",
    fontSize: "11px"
  },
  text2: {
    textAlign: "center",
    fontWeight: "600",
  },
};
