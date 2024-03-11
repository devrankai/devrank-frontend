export enum AUTH_URL {
  LOGIN = "login",
  REGISTER = "login_info/register", // register email and send verification code
  RESET_PASSWORD_WITH_CODE = "login_info/reset_password_with_veri_code", // add pw and reset pw for both registration and forgot pw
  SEND_CODE_BY_EMAIL = "login_info/send_verification_code", // send code verification with email check
  VERIFY_CODE = "login_info/validate_veri_code", // register - evaluate verification code
}
