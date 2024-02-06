import { Navigate, Outlet } from "react-router-dom";

import { USER_STATUS } from "../../store";
import { useAuthStore } from "../../hooks/auth-store/useAuthStore.hook";
import { PUBLIC_ROUTES } from "..";
import { getLocalStorage } from "../../utils";
import { AuthVerify } from "../../hooks/auth-verify/useAuthVerify";

type CheckAuthorizationTypes = {
  status: USER_STATUS;
  tokenUser?: string | null | undefined;
};

const checkAuthorization = ({ status, tokenUser }: CheckAuthorizationTypes) => {
  AuthVerify();

  const userIsAuth =
    status === USER_STATUS.AUTHENTICATED &&
    tokenUser === getLocalStorage("USER_TK")?.userToken;

  return userIsAuth ? (
    <Outlet />
  ) : (
    <Navigate replace to={PUBLIC_ROUTES.LOG_IN} />
  );
};

const AuthGuard = () => {
  const { status, user } = useAuthStore();

  const statusAndTokenExist = status && user;

  return statusAndTokenExist ? (
    checkAuthorization({ status: status, tokenUser: user?.token })
  ) : (
    <Navigate replace to={PUBLIC_ROUTES.LOG_IN} />
  );
};

export default AuthGuard;
