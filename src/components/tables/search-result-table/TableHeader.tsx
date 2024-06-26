import { TableCell, TableHead, TableRow } from "@mui/material";

export const TableHeader = () => {
  return (
    <TableHead sx={{ display: 'flex', flexDirection: 'row' }}>
      <TableRow>
        <TableCell
          align='center'
          sx={{
            borderLeft: '1px solid #0067CA',
            borderBottom: '1px solid #0067CA',
            textAlign: 'center',
            minWidth: { xs: "190px", sm: "270px" },
            maxWidth: { xs: "190px", sm: "270px" },
            padding: '6px 4px'
          }}>
          Name
        </TableCell>
        <TableCell
          align='center'
          sx={{
            borderLeft: '1px solid #0067CA',
            borderBottom: '1px solid #0067CA',
            textAlign: 'center',
            minWidth: { xs: "90px", md: "100px" },
            maxWidth: { xs: "90px", md: "100px" },
            padding: '6px 4px'
          }}>
          Years of experience
        </TableCell>
        <TableCell
          align='center'
          sx={{
            borderLeft: '1px solid #0067CA',
            borderBottom: '1px solid #0067CA',
            textAlign: 'center',
            minWidth: { xs: "70px", sm: "80px", md: "120px" },
            maxWidth: { xs: "70px", sm: "80px", md: "120px" },
            padding: '6px 4px'
          }}>
          Skill level
        </TableCell>
        <TableCell
          align='center'
          sx={{
            borderLeft: '1px solid #0067CA',
            borderBottom: '1px solid #0067CA',
            textAlign: 'center',
            minWidth: { xs: "56px", sm: "70px" },
            maxWidth: { xs: "56px", sm: "70px" },
            padding: '6px 4px'
          }}>
          Select
        </TableCell>
      </TableRow>
    </TableHead>
  )
}