import { Theme } from "@mui/material";

export const styles = {
  box: {
    backgroundColor: "#F7F7F7",
    borderRadius: "4px",
    height: { xs: "360px", sm: "460px" },
    position: "absolute",
    maxWidth: { xs: "290px", sm: "340px", md: "330px", lg: "370px" },
    flexDirection: "row",
  },
  boxHeader: {
    borderBottom: "1px solid #0067CA",
    padding: (theme: Theme) => theme.spacing(3, 3, 1.5),
    minHeight: "100px",
    width: "100%",
  },
  boxHeaderName: {
    fontWeight: "500",
    fontSize: "20px",
    lineHeight: "28px",
    maxWidth: "250px",
    overflowX: "hidden",
    maxHeight: "80px",
    overflowY: "hidden",
  },
  formContainer: {
    width: "100%",
  },
  formControl: {
    width: "100%",
    backgroundColor: "#F7F7F7",
  },
  subtitle: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    paddingTop: "6px",
  },
  clockIcon: {
    color: "#AFAFAF",
  },
  date: {
    color: "#AFAFAF",
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: "16px",
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
  input: {
    alignItems: "flex-start",
    minHeight: "334px",
    height: "334px !important",
    borderBottom: "none",
  },
  editButton: {
    padding: "10px",
    minWidth: "50px",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
};
