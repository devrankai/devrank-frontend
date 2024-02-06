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
    maxWidth: { xs: "310px", sm: "430px" },
    border: "2px solid #0067CA",
  },
  tableBody: {
    display: "flex",
    flexDirection: "column",
    maxHeight: "210px",
    maxWidth: "420px",
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
  tableCellPosition: {
    borderRight: "1px solid #0067CA",
    minWidth: { xs: "100px", sm: "120px" },
    maxWidth: { xs: "100px", sm: "120px" },
    padding: (theme: Theme) => theme.spacing(0.75),
  },
  tableCellLevel: {
    borderRight: "1px solid #0067CA",
    minWidth: { xs: "100px", sm: "120px" },
    maxWidth: { xs: "100px", sm: "120px" },
    padding: (theme: Theme) => theme.spacing(0.75),
  },
  tableCellActions: {
    minWidth: "120px",
    maxWidth: "120px",
    padding: (theme: Theme) => theme.spacing(0.75),
  },
  noPositionSpanContainer: {
    display: "flex",
    padding: (theme: Theme) => theme.spacing(4, 1),
  },
  noPositionSpan: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    gap: (theme: Theme) => theme.spacing(1.25),
  },
};
