export enum AUTH_URL {
  LOGIN = "login",
  FORGOT_PW_SEND_CODE_BY_EMAIL = "login_info/send_verification_code", // send code verification with email check
  FORGOT_RESET_PASSWORD_WITH_CODE = "login_info/reset_password_with_veri_code", // add pw and reset pw
  REGISTER = "login_info/register", // register email and send verification code
  VERIFY_CODE = "login_info/validate_veri_code"// register - evaluate verification code
}
