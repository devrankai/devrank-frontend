import { MainLayout } from '../../../layouts/main-layout/MainLayout'
import { LogInSection } from '../../../components/sections/log-in-section/LogInSection'
import { IMAGES } from '../../../constants/images/images.constants'

export const LogIn = () => {
  return <MainLayout imgSrc={IMAGES.LOGIN_WELCOME} children={<LogInSection />} />
}
