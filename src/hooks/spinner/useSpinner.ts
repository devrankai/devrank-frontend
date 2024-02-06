import { useContext } from "react";
import { SpinnerContext } from "../../contexts/SpinnerProvider";

export const useSpinner = () => useContext(SpinnerContext);
