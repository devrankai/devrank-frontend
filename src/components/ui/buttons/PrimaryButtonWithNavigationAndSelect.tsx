import { MouseEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

type Props = {
  btnUrl: string;
  selectedId: string;
};

export const PrimaryButtonWithNavigationAndSelect = ({
  btnUrl,
  selectedId,
}:
  Props) => {
  const navigate = useNavigate();

  const handleNavigate: MouseEventHandler<HTMLButtonElement> = () => {
    if (selectedId !== "" || selectedId !== undefined) {
      navigate(btnUrl);
    }
  };

  return (
    <Button
      variant="contained"
      onClick={handleNavigate}
      sx={{ width: "202px" }}
    >
      Next
    </Button>
  );
};
