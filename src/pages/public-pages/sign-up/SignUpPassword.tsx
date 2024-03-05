import { MainLayout } from "../../../layouts/main-layout/MainLayout";
import { SignUpPasswordSection } from "../../../components/forms/sign-up/sign-up-password-section/SignUpPasswordSection";
import { IMAGES } from "../../../constants/images/images.constants";

export const SignUpPassword = () => {
  return (
    <MainLayout
      imgSrc={IMAGES.SIGN_UP_WELCOME}
      children={<SignUpPasswordSection />}
    />
  );
};
