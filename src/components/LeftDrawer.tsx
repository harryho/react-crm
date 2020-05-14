import React, { ReactPropTypes } from "react";
import Drawer from "@material-ui/core/Drawer";

import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";

import data from "../data";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";

import ContentFilter from "@material-ui/icons/FilterList";

import SettingsPower from "@material-ui/icons/SettingsPower";
import VpnKey from "@material-ui/icons/VpnKey";
import { makeStyles } from "@material-ui/core/styles";
import {
  common,
  //  orange
} from "@material-ui/core/colors";
import { Typography, ListItemIcon, Menu } from "@material-ui/core";

const white = common.white;
const useStyles = makeStyles((theme) => ({
  logo: {
    cursor: "pointer",
    fontSize: 22,
    // color: Typography.full,
    // lineHeight: `${spacing.desktopKeylineIncrement}px`,
    // fontWeight: typography.fontWeightLight,
    // backgroundColor: blue600,
    paddingLeft: 40,
    height: 56,
  },
  menuItem: {
    color: white,
    fontSize: 14,
  },

  avatarDiv: {
    padding: "15px 0 20px 15px",
    backgroundImage: "url(" + require("../assets/img/material_bg.png") + ")",
    // backgroundColor: "rgba(227, 231, 232, 0.83)",
    height: 45,
    backgroundColor: "silver",
  },
  avatarIcon: {
    float: "left",
    display: "block",
    marginRight: 15,
    boxShadow: "0px 0px 0px 8px rgba(0,0,0,0.2)",
  },
  avatarSpan: {
    paddingTop: 0,
    display: "block",
    color: "purple",
    fontWeight: 400,
    fontSize: 19,
    textShadow: "1px 1px #444",
  },
  drawer: {
    color: "darkgrey",
    backgroundColor: "rgba(227, 231, 232, 0.63)",
    overflow: "auto",
  },
}));

interface LeftDrawerProps {
  navDrawerOpen: boolean;
  username: string;
  onLogoutClick: () => void;
}

const LeftDrawer: React.FC<LeftDrawerProps> = ({
  username,
  navDrawerOpen,
  onLogoutClick,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const styles = useStyles();

  const handleClick = (event: React.ChangeEvent<unknown>) => {
    event.preventDefault();
    onLogoutClick();
  };

  return (
    <Drawer
      anchor="left"
      variant="temporary"
      open={navDrawerOpen}
      className={styles.drawer}
    >
      <div className={styles.avatarDiv}>
        <Avatar src="assets/img/avatar0.png" className={styles.avatarIcon} />
        <span className={styles.avatarSpan}>
          <Typography variant="inherit"> {username}</Typography>

          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <ContentFilter />
          </IconButton>
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
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClick}>
              <SettingsPower />
              <Typography variant="inherit"> Sign Out</Typography>
            </MenuItem>
            <MenuItem onClick={handleClick}>
              <VpnKey />
              <Typography variant="inherit"> Change Password</Typography>
            </MenuItem>
          </Menu>
        </span>
      </div>
      <div>
        {data.menus.map((menu, index) => (
          <MenuItem key={index} className={styles.menuItem}>
            <Link to={menu.link}>
              <ListItemIcon>{menu.icon}</ListItemIcon>
              <Typography variant="inherit">{menu.text}</Typography>
            </Link>
          </MenuItem>
        ))}
      </div>
    </Drawer>
  );
};

export default LeftDrawer;
