import { Theme } from "@mui/material";

export const styles = {
  layoutContainer: {
    width: "100%",
    maxWidth: { xs: "90%", sm: "520px", md: "780px", lg: "996px" },
    height: "604px",
    borderRadius: "24px",
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: { xs: "24px", md: "50px" },
  },
  formContainer: {
    backgroundColor: (theme: Theme) => theme.palette.primaryWhite,
    borderRadius: { xs: "24px 24px 0px 0px", md: "24px 0px 0px 24px" },
  },
  textContainer: {
    minHeight: { xs: "200px", sm: "250px", md: "630px" },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    width: "100%",
    borderRadius: { xs: "0px 0px 24px 24px", md: "0px 24px 24px 0px" },
    marginBottom: { xs: "24px", md: "0px" },
  },
  title1: {
    fontWeight: "400",
    fontSize: { xs: "28px", md: "56px" },
    lineHeight: { xs: "42px", md: "84px" },
    textAlign: "center",
    color: (theme: Theme) => theme.palette.primaryWhite,
  },
  title2: {
    fontWeight: "700",
    fontSize: "32px",
    lineHeight: "48px",
    textAlign: "center",
    color: (theme: Theme) => theme.palette.primaryWhite,
  },
};
