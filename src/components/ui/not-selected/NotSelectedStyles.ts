import { Theme } from "@mui/material";

export const styles = {
  wrapper: {
    position: "fixed",
    zIndex: 3,
    top: "0px",
    width: { xs: "100%", sm: "70%", md: "80%" },
    height: "80%",
    backgroundColor: "white",
    marginLeft: "-1px",
    minHeight: "100%",
  },
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: (theme: Theme) => theme.spacing(3),
    paddingTop: (theme: Theme) => theme.spacing(3),
  },
  titleWrapper: {
    maxWidth: "480px",
    padding: (theme: Theme) => theme.spacing(0, 2, 0, 0),
  },
  imageList: {
    width: "100%",
    gridTemplateColumns: "repeat(1, 1fr) !important",
  },
};
