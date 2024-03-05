import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider } from "@emotion/react";
import { devRank } from "./theme/theme.ts";
import { CssBaseline } from "@mui/material";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { SpinnerProvider } from "./contexts/SpinnerProvider.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ThemeProvider theme={devRank}>
      <CssBaseline />
      <SpinnerProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </SpinnerProvider>
    </ThemeProvider>
  </BrowserRouter>
);
