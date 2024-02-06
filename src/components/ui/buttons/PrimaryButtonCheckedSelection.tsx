import { MouseEventHandler } from "react";
import { Button, Tooltip } from "@mui/material";

type Props = {
  handleNavigate: MouseEventHandler<HTMLButtonElement>;
  disabled: boolean;
  tooltipTitle: string;
};

export const PrimaryButtonCheckedSelection = ({
  handleNavigate,
  disabled,
  tooltipTitle,
}: Props) => {
  return (
    <Tooltip title={tooltipTitle}>
      <span>
        <Button
          variant="contained"
          onClick={handleNavigate}
          sx={{ width: "202px" }}
          disabled={disabled}
        >
          Next
        </Button>{" "}
      </span>
    </Tooltip>
  );
};
