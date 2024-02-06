import { Button } from '@mui/material'
import { MouseEventHandler } from 'react'
import { useNavigate } from 'react-router-dom'

type variant = 'text' | 'contained' | 'outlined'

type Props = {
  btnTxt: string
  btnUrl: string
  btnVariant?: variant
}

export const PrimaryButtonWithNavigation = ({ btnTxt, btnUrl, btnVariant }: Props) => {
  const navigate = useNavigate()

  const handleNavigate: MouseEventHandler<HTMLButtonElement> = () => {
    navigate(btnUrl)
  }

  return (
    <Button
      variant={btnVariant ? btnVariant : 'contained'}
      onClick={handleNavigate}
      sx={{ width: '202px' }}
    >
      {btnTxt}
    </Button>
  )
}
