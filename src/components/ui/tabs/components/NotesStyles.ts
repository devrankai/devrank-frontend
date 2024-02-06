import { Theme } from "@mui/material";

export const styles = {
  box: {
    border: "1px solid #0067CA",
    borderRadius: "4px",
    height: { xs: "360px", sm: "380px" },
    position: "absolute",
    maxWidth: { xs: "260px", sm: "300px" },
    flexDirection: "column",
  },
  boxHeader: {
    borderBottom: "1px solid #0067CA",
    padding: (theme: Theme) => theme.spacing(3, 3, 1.5),
  },
  boxHeaderName: {
    fontWeight: "500",
    fontSize: "24px",
    lineHeight: "28px",
  },
  editIconContainer: {
    position: "absolute",
    right: "12px",
    bottom: "16px",
  },
  editIcon: {
    backgroundColor: "#3471FF",
    color: "white",
    borderRadius: "50%",
    padding: (theme: Theme) => theme.spacing(0.75),
  },
};
