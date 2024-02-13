import { TableCell, TableHead, TableRow } from "@mui/material"

type tableCell = {
  name: string,
  width: string
}
export const TableHeader = () => {
  const titles: tableCell[] = [
    { name: 'Select', width: '60px' },
    { name: 'Client', width: '270px' },
    { name: 'Industry', width: '210px' },
    { name: 'Actions', width: '100px' }
  ]

  return (
    <TableHead sx={{ display: 'flex', flexDirection: 'row' }}>
      <TableRow>
        {titles.map(title => (
          <TableCell
            key={title.name}
            align='center'
            sx={{
              borderLeft: '1px solid #0067CA',
              borderBottom: '1px solid #0067CA',
              textAlign: 'center',
              minWidth: title.width,
              maxWidth: title.width,
              padding: '6px'
            }}>
            {title.name}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}