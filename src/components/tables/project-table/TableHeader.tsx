import { TableCell, TableHead, TableRow } from "@mui/material";

export const TableHeader = () => {

  return (
    <TableHead sx={{ display: 'flex', flexDirection: 'row' }}>
      <TableRow>
        <TableCell align='center' sx={{ border: '1px solid #0067CA', textAlign: 'center', width: '60px', padding: '6px' }}>
          Select
        </TableCell>
        <TableCell align='center' sx={{ border: '1px solid #0067CA', textAlign: 'center', width: { xs: '150px', sm: '220px' }, padding: '6px' }}>
          Project
        </TableCell>
        <TableCell align='center' sx={{ border: '1px solid #0067CA', textAlign: 'center', width: '100px', padding: '6px' }}>
          Actions
        </TableCell>
      </TableRow>
    </TableHead>
  )
}