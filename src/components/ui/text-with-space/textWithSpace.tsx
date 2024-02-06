import { Typography } from "@mui/material";
import { styles } from "./textWithSpaceStyles";

type TextWithSpaceType = {
  text: string;
  textWithSpaceClass: string;
};

export const CustomTextWithSpace = ({
  textWithSpaceClass,
  text,
}: TextWithSpaceType) => {
  return (
    <Typography
      className={`CustomTextWithSpace ${textWithSpaceClass}`}
      sx={styles.errorForgotMessage}
    >
      {text}
    </Typography>
  );
};
