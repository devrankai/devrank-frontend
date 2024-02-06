import { SignUpSection } from '../../../components/sections/sign-up-section/SignUpsection'
import { MainLayout } from '../../../layouts/main-layout/MainLayout'
import { IMAGES } from '../../../constants/images/images.constants'

export const SignUp = () => {
  return <MainLayout imgSrc={IMAGES.SIGN_UP_WELCOME} children={<SignUpSection />} />
}
