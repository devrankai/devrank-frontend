import { ReactNode, useState } from "react";
import {
  AppBar,
  Box,
  Grid,
  IconButton,
  Menu,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { styles } from "./NavBarAppStyles";
import { IMAGES } from "../../../constants/images/images.constants";
import { MenuListItems } from "./MenuListItems";

type Props = {
  children: ReactNode;
};

export const NavBarApp = ({ children }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={styles.appBar}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <img
                src={IMAGES.LOGO}
                alt="DevRank logo"
                width="160"
                height="65"
              />
            </Typography>
            <Box component="div">
              <AccountCircle sx={{ marginRight: "18px" }} />
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                sx={{
                  display: {
                    sm: "none",
                  },
                  top: "60px",
                  right: "0px",
                }}
              >
                <MenuListItems setAnchorEl={setAnchorEl} />
              </Menu>
            </Box>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              sx={styles.menuIconBtn}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      <Grid container sx={{ minHeight: "100vh" }}>
        <Grid item xs={0} sm={4.5} md={3} lg={2.5} sx={styles.dashboardContainer}>
          <Box component="div" sx={styles.userIconBtn}>
            <MenuListItems setAnchorEl={setAnchorEl} />
          </Box>
        </Grid>
        <Grid item xs={11.8} sm={7.5} md={9} lg={9.5} sx={styles.childContainer}>
          {children}
        </Grid>
      </Grid>
    </>
  );
};
