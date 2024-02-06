import { Theme } from "@mui/material";

export const styles = {
  appBar: {
    backgroundColor: "#FFFFFF",
    color: "black",
    borderBottom: "1px solid #E8E8E8",
    height: "80px",
  },
  menuIconBtn: {
    mr: 2,
    display: { sm: "none" },
  },
  userIconBtn: {
    display: {
      xs: "none",
      sm: "block",
    },
    marginTop: { xs: "0px", sm: "24px" },
  },
  dashboardContainer: {
    boxShadow: "0px 8px 12px 0px rgba(135, 145, 233, 0.3)",
  },
  childContainer: {
    paddingTop: (theme: Theme) => theme.spacing(6),
    paddingLeft: {
      xs: "12px",
      sm: "18px",
      md: "24px",
    },
  },
};
