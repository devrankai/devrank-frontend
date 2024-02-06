import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

type Props = {
  addNewButtonText: string;
  navigateUrl: string;
  state?: { [key: string]: any };
};

export const AddNewButton = ({
  addNewButtonText,
  navigateUrl,
  state = {},
}: Props) => {
  const navigate = useNavigate();
  const handleClick = () => navigate(navigateUrl, { state });

  return (
    <Button
      variant="contained"
      endIcon={<AddCircleOutlineIcon />}
      onClick={handleClick}
      aria-labelledby={addNewButtonText}
    >
      {addNewButtonText}
    </Button>
  );
};
