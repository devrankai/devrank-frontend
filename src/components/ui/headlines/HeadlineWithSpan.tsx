import { Box, Typography } from '@mui/material'

type Props = {
  text: string;
  spanText: string;
  fontWeightText?: string;
  fontWeightSpan?: string;
}

export const HeadlineWithSpan = ({ text, spanText, fontWeightText, fontWeightSpan }: Props) => {
  const textFontWeight = fontWeightText || '700';
  const spanFontWeight = fontWeightSpan || '400';

  return (
    <Typography
      sx={{
        fontWeight: textFontWeight,
        fontSize: { xs: '22px', sm: '38px' },
        lineHeight: { xs: '36px', sm: '60px' },
      }}>
      {text}
      <Box
        component="span"
        sx={{
          fontWeight: spanFontWeight,
          fontSize: { xs: '22px', sm: '38px' },
          lineHeight: { xs: '38px', sm: '60px' },
          ml: '12px',
        }}>
        {spanText}
      </Box>
    </Typography>
  )
}
