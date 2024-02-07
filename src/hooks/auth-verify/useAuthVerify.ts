import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { alertFactory, getLocalStorage } from "../../utils";
import { useAuthStore } from "../auth-store/useAuthStore.hook";
import { PUBLIC_ROUTES } from "../../routes";
import { persistedDataNameConstants } from "../../constants/persistedDataName/persistedDataName.constants";

const showAlertSessionExpired = () =>
  alertFactory({
    type: "feedback",
    params: {
      title: "Session has expired",
      text: "Plese log in again.",
      icon: "error",
    },
  });

export const AuthVerify = () => {
  const { startLogout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const now = new Date();

    const getTokenInitDate = getLocalStorage(
      persistedDataNameConstants.TOKEN_INIT_DATE
    ) as {
      tokenInitDate: number;
    };

    if (!getTokenInitDate?.tokenInitDate)
      return navigate(`${PUBLIC_ROUTES.LOG_IN}`, { replace: true });

    const tokenInitDateInMs = getTokenInitDate.tokenInitDate;

    const differenceInMs = now.getTime() - tokenInitDateInMs;

    const differenceInHours = differenceInMs / (60 * 60 * 1000);

    if (differenceInHours >= 24) {
      startLogout();
      showAlertSessionExpired();
      navigate(`${PUBLIC_ROUTES.LOG_IN}`, { replace: true });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);
};
