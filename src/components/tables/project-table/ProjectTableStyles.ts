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
    minWidth: "280px",
    maxWidth: { xs: "280px", sm: "400px" },
    border: "2px solid #0067CA",
  },
  tableBody: {
    display: "flex",
    flexDirection: "column",
    maxHeight: "210px",
    maxWidth: "380px",
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
  tableCellProject: {
    borderRight: "1px solid #0067CA",
    minWidth: { xs: "150px", sm: "220px" },
    maxWidth: { xs: "150px", sm: "220px" },
    padding: (theme: Theme) => theme.spacing(0.75),
  },
  tableCellActions: {
    minWidth: "100px",
    maxWidth: "100px",
    padding: (theme: Theme) => theme.spacing(0.75),
  },
  noProjectSpanContainer: {
    display: "flex",
    padding: (theme: Theme) => theme.spacing(4, 1),
  },
  noProjectSpan: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    gap: (theme: Theme) => theme.spacing(1.25),
  },
};
