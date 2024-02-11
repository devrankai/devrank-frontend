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
            minWidth: '60px',
            padding: '6px'
          }}
        >
          Select
        </TableCell>
        <TableCell
          align='center'
          sx={{
            borderLeft: '1px solid #0067CA',
            borderBottom: '1px solid #0067CA',
            textAlign: 'center',
            width: {
              xs: '150px',
              sm: '220px',
              md: '490px'
            },
            minWidth: {
              xs: '150px',
              sm: '220px',
              md: '490px'
            },
            padding: '6px'
          }}
        >
          Project
        </TableCell>
        <TableCell
          align='center'
          sx={{
            borderLeft: '1px solid #0067CA',
            borderBottom: '1px solid #0067CA',
            textAlign: 'center',
            width: '100px',
            minWidth: '100px',
            padding: '6px'
          }}
        >
          Actions
        </TableCell>
      </TableRow>
    </TableHead>
  )
}