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
            width: '60px',
            padding: '6px'
          }}>
          Select
        </TableCell>
        <TableCell
          align='center'
          sx={{
            borderLeft: '1px solid #0067CA',
            borderBottom: '1px solid #0067CA',
            textAlign: 'center',
            width: {
              xs: '100px',
              sm: '230px'
            },
            minWidth: {
              xs: '100px',
              sm: '230px'
            },
            padding: '6px'
          }}>
          Position
        </TableCell>
        <TableCell
          align='center'
          sx={{
            borderLeft: '1px solid #0067CA',
            borderBottom: '1px solid #0067CA',
            textAlign: 'center',
            width: {
              xs: '100px',
              sm: '230px'
            },
            minWidth: {
              xs: '100px',
              sm: '230px'
            },
            padding: '6px'
          }}>
          Experience Level
        </TableCell>
        <TableCell
          align='center'
          sx={{
            borderLeft: '1px solid #0067CA',
            borderBottom: '1px solid #0067CA',
            textAlign: 'center',
            width: '130px',
            padding: '6px'
          }}>
          Actions
        </TableCell>
      </TableRow>
    </TableHead>
  )
}