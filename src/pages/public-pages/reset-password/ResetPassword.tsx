import { MainLayout } from '../../../layouts'
import { IMAGES } from '../../../constants/images/images.constants'
import { ResetPasswordSection } from '../../../components'

export const ResetPassword = () => {
  return <MainLayout imgSrc={IMAGES.LOGIN_WELCOME} children={<ResetPasswordSection />} />
}