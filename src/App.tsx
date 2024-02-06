import { Route } from "react-router-dom";

import { PRIVATE_ROUTES } from "./routes/private-routes/routes";
import { PUBLIC_ROUTES } from "./routes/public-routes/routes";

import "./App.css";
import {
  LogIn,
  ResetPassword,
  SignUp,
  SignUpCode,
  SignUpPassword,
} from "./pages";
import AuthGuard from "./routes/guard/auth.guard";
import { PrivateRoutes } from "./routes/private-routes";
import { RouteNotFound } from "./routes/route-not-found.routes";

function App() {
  return (
    <RouteNotFound>
      <Route path={PUBLIC_ROUTES.LOG_IN} element={<LogIn />} />
      <Route path={PUBLIC_ROUTES.SIGN_UP} element={<SignUp />} />
      <Route path={PUBLIC_ROUTES.SIGN_UP_CODE} element={<SignUpCode />} />
      <Route
        path={PUBLIC_ROUTES.SIGN_UP_PASSWORD}
        element={<SignUpPassword />}
      />
      <Route path={PUBLIC_ROUTES.RESET_PASSWORD} element={<ResetPassword />} />
      <Route element={<AuthGuard />}>
        <Route
          path={`${PRIVATE_ROUTES.DASHBOARD}/*`}
          element={<PrivateRoutes />}
        />
      </Route>
    </RouteNotFound>
  );
}

export default App;
