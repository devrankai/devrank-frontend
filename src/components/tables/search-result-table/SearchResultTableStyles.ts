import { Theme } from "@mui/material";

export const styles = {
  box: {
    width: "100%",
  },
  paper: {
    width: "100%",
    mb: 2,
  },
  table: {
    minWidth: "310px",
    maxWidth: { xs: "310px", sm: "400px", md: "570px" },
    border: "2px solid #0067CA",
  },
  tableBody: {
    display: "flex",
    flexDirection: "column",
    maxHeight: "276px",
    maxWidth: "570px",
    overflowY: "scroll",
  },
  tableRow: {
    flexDirection: "column",
    flexWrap: "wrap",
    alignContent: "flex-start",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  tableCell: {
    borderRight: "1px solid #0067CA",
    minWidth: "60px",
    maxWidth: "60px",
    padding: (theme: Theme) => theme.spacing(0.75),
  },
  tableCellName: {
    borderRight: "1px solid #0067CA",
    minWidth: { xs: "90px", sm: "300px" },
    maxWidth: { xs: "90px", sm: "300px" },
    padding: (theme: Theme) => theme.spacing(0.75, 0.5),
  },
  tableCellYears: {
    borderRight: "1px solid #0067CA",
    minWidth: { xs: "90px", md: "100px" },
    maxWidth: { xs: "90px", md: "100px" },
    padding: (theme: Theme) => theme.spacing(0.75, 0.5),
  },
  tableCellRating: {
    borderRight: "1px solid #0067CA",
    minWidth: { xs: "70px", sm: "80px", md: "100px" },
    maxWidth: { xs: "70px", sm: "80px", md: "100px" },
    padding: (theme: Theme) => theme.spacing(0.75, 0.5),
  },
  tableCellSelect: {
    minWidth: { xs: "50px", sm: "70px" },
    maxWidth: { xs: "50px", sm: "70px" },
    padding: (theme: Theme) => theme.spacing(0.75, 0.5),
  },
  noSearchResultSpanContainer: {
    display: "flex",
    padding: (theme: Theme) => theme.spacing(4, 1),
  },
  noSearchResultSpan: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    gap: (theme: Theme) => theme.spacing(1.25),
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    padding: (theme: Theme) => theme.spacing(1, 2),
  },
};
