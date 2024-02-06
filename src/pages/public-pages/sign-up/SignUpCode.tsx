import { MainLayout } from '../../../layouts/main-layout/MainLayout'
import { SignUpCodeSection } from '../../../components/sections/sign-up-code-section/SignUpCodeSection'
import { IMAGES } from '../../../constants/images/images.constants'

export const SignUpCode = () => {
  return <MainLayout imgSrc={IMAGES.SIGN_UP_WELCOME} children={<SignUpCodeSection />} />
}
