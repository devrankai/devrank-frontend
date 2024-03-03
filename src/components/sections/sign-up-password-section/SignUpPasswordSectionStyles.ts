import { Theme } from "@mui/material";

export const styles = {
  container: {
    minHeight: { md: "464px" },
    marginTop: { xs: "20px", md: "0px" },
    flexDirection: "column",
    flaxWrap: "wrap",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    gap: (theme: Theme) => theme.spacing(1.5),
    padding: (theme: Theme) => theme.spacing(1, 2.5),
  },
  gridEmail: {
    marginBottom: (theme: Theme) => theme.spacing(3.75),
  },
  title: {
    fontWeight: 500,
    fontSize: {xs: "16px", md: "24px"}
  },
  text1: {
    textAlign: "start",
  },
  text2: {
    textAlign: "center",
    fontWeight: "600",
  },
};
