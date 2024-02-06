import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Grid,
  ImageList,
  ImageListItem,
  Typography,
} from "@mui/material";
import { IMAGES } from "../../../constants";
import { HeadlineH1 } from "../..";
import { PRIVATE_ROUTES } from "../../../routes";
import { styles } from "./NotSelectedStyles";

type NotSelectedProps = {
  titleText: string;
  messageText: string;
  navigateTo: string;
};

export const NotSelected = ({
  titleText,
  messageText,
  navigateTo,
}: NotSelectedProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`${PRIVATE_ROUTES.DASHBOARD}${navigateTo}`, { replace: true });
  };

  return (
    <Box sx={styles.wrapper}>
      <Grid container sx={styles.container}>
        <Grid item sx={styles.titleWrapper}>
          <HeadlineH1 text={titleText} />
        </Grid>
        <Grid item>
          <ImageList sx={styles.imageList}>
            <ImageListItem>
              <img
                src={IMAGES.NOT_SELECTED}
                alt="No data icon"
                width={482}
                height={361}
              />
            </ImageListItem>
          </ImageList>
        </Grid>
        <Grid item>
          <Typography variant="body1" px={5} align="center">
            {messageText}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            sx={{ width: "202px" }}
            onClick={handleClick}
          >
            Back
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
