import { useLocation, useNavigate } from "react-router-dom";
import { Box, MenuItem } from "@mui/material";
import { navColors } from "./nav-colors";
import { iconsNav } from "../../../assets/icons/icons";

type Props = {
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  privateRoute: string;
  itemMenuText: string;
  itemTextIncludes: string;
  itemIcon: string;
  disabled?: boolean;
};

export const ItemMenu = ({
  setAnchorEl,
  privateRoute,
  itemMenuText,
  itemTextIncludes,
  itemIcon,
  disabled,
}: Props) => {
  const location = useLocation();
  const pathname = location.pathname;

  const navigate = useNavigate();

  const handleClose = (url: string) => {
    setAnchorEl(null);
    navigate(url);
  };

  return (
    <MenuItem
      onClick={() => handleClose(privateRoute)}
      sx={{
        color: `${
          pathname.includes(itemTextIncludes)
            ? navColors.active
            : navColors.nonActive
        }`,
        backgroundColor: `${
          pathname.includes(itemTextIncludes)
            ? navColors.activeBackground
            : "transparent"
        }`,
        borderLeft: `${
          pathname.includes(itemTextIncludes)
            ? `4px solid ${navColors.active}`
            : "none"
        }`,
      }}
      disabled={disabled}
    >
      {iconsNav(
        itemIcon,
        pathname.includes(itemTextIncludes)
          ? navColors.active
          : navColors.nonActive
      )}
      <Box
        component="span"
        sx={{
          marginLeft: "12px",
          fontWeight: "600",
          fontSize: "16px",
        }}
      >
        {itemMenuText}
      </Box>
    </MenuItem>
  );
};
