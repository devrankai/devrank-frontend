import { Typography } from '@mui/material'

type Props = {
  text: string
}

export const HeadlineH1 = ({ text }: Props) => {
  return (
    <Typography
      variant="h1"
      component="h1"
      sx={{
        fontWeight: '700',
        fontSize: '24px',
        lineHeight: '28px',
        letterSpacing: '0.15%',
      }}>
      {text}
    </Typography>
  )
}
