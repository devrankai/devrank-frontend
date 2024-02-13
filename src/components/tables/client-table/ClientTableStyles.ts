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
    border: "2px solid #0067CA",
  },
  tableBody: {
    display: "flex",
    flexDirection: "column",
    maxHeight: "210px",
    overflowY: "scroll",
  },
  tableRow: {
    flexDirection: "column",
    flexWrap: "wrap",
    alignContent: "flex-start",
    justifyContent: "center",
    alignItems: "flex-start",
    maxHeight: "38px"
  },
  tableCell: {
    borderRight: "1px solid #0067CA",
    minWidth: "60px",
    maxWidth: "60px",
    padding: (theme: Theme) => theme.spacing(0.25, 0.75),
  },
  tableCellClient: {
    borderRight: "1px solid #0067CA",
    minWidth: "270px",
    maxWidth: "270px",
    padding: (theme: Theme) => theme.spacing(0.25, 0.75),
    width: "270px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  tableCellIndustry: {
    borderRight: "1px solid #0067CA",
    minWidth: "210px",
    maxWidth: "210px",
    padding: (theme: Theme) => theme.spacing(0.25, 0.75),
  },
  tableCellActions: {
    minWidth: "100px",
    maxWidth: "100px",
    padding: (theme: Theme) => theme.spacing(0.25, 0.75),
  },
  noClientSpanContainer: {
    display: "flex",
    padding: (theme: Theme) => theme.spacing(4, 1),
  },
  noClientSpan: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    gap: (theme: Theme) => theme.spacing(1.25),
  },
};
