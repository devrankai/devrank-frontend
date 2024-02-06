import { Backdrop, CircularProgress } from "@mui/material";
import { createContext } from "react";
import useLoading from "../hooks/spinner/useLoading";

const defaultContext = {
  addLoading: () => {},
  removeLoading: () => {},
};

interface AppContextProps {
  addLoading: () => void;
  removeLoading: () => void;
}

type Props = { children: JSX.Element };

export const SpinnerContext = createContext<AppContextProps>(defaultContext);

export const SpinnerProvider = ({ children }: Props) => {
  const [loading, addLoading, removeLoading] = useLoading();

  return (
    <SpinnerContext.Provider value={{ addLoading, removeLoading }}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.modal + 1 }}
        open={loading}
      >
        <CircularProgress color="primary" />
      </Backdrop>
      {children}
    </SpinnerContext.Provider>
  );
};
