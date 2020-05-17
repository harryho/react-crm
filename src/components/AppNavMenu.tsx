import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
// import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import { Typography, ListItemIcon, Menu } from '@material-ui/core';
import ContentFilter from '@material-ui/icons/FilterList';

import SettingsPower from '@material-ui/icons/SettingsPower';
import VpnKey from '@material-ui/icons/VpnKey';
import { grey, blue, common } from '@material-ui/core/colors';
import data from '../data';

const blue600 = blue['900'];
const drawerWidth = 250;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },

    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: 'rgba(227, 231, 232, 0.63)',
      overflow: 'auto',
    },
    avatarDiv: {
      padding: '15px 0 10px 10px',
      backgroundImage: 'url(' + require('../assets/img/leftdrawer-bg.jpg') + ')',
      backgroundColor: 'silver',
    },
    avatarIcon: {
      float: 'left',
      display: 'block',
      marginRight: 15,
      boxShadow: '0px 0px 0px 8px rgba(0,0,0,0.2)',
    },
    avatarSpan: {
      paddingTop: 0,
      display: 'block',
      color: 'purple',
      fontWeight: 400,
      fontSize: 19,
      textShadow: '1px 1px #444',
    },
    user: {
      fontSize: 22,
      color: common.white,
    },
    menuItem: {
      color: blue600,
      fontWeight: 500,
      paddingTop: '0.2em',
      paddingBottom: '0.2em',
      fontSize: 16,
    },
  })
);

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  // window?: () => Window;
  navDrawerOpen: boolean;
  username: string;
  onLogoutClick: () => void;
  handleDrawerToggle: () => void;
  isSmallScreem: boolean;
  drawerStyle: {};
}

export default function AppNavMenu(props: Props) {
  const styles = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { username, navDrawerOpen, isSmallScreem, handleDrawerToggle, drawerStyle } = props;

  console.log(navDrawerOpen);

  const handleClick = (event: React.ChangeEvent<unknown>) => {
    event.preventDefault();
    props.onLogoutClick();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const drawer = (
    <div>
      <div className={styles.avatarDiv}>
        <Avatar src="assets/img/avatar0.png" className={styles.avatarIcon} />
        <span className={styles.avatarSpan}>
          <Typography className={styles.user} variant="inherit">
            {' '}
            {username}
          </Typography>

          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="secondary"
          >
            <ContentFilter />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClick}>
              <SettingsPower />
              <Typography style={{ paddingLeft: '1em' }} 
              variant="inherit">
                Sign Out
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleClick}>
              <VpnKey />
              <Typography style={{ paddingLeft: '1em' }} variant="inherit">
                Change Password
              </Typography>
            </MenuItem>
          </Menu>
        </span>
      </div>
      <div>
        {data.menus.map((menu, index) => (
          <MenuItem key={index}>
            <ListItemIcon>{menu.icon}</ListItemIcon>
            <Link to={menu.link}>
              <Typography variant="h6" component="h6" className={styles.menuItem}>
                {menu.text}
              </Typography>
            </Link>
          </MenuItem>
        ))}
      </div>
    </div>
  );

  return (
    <div className={styles.root}>
      <nav
        style={drawerStyle}
        aria-label="app navigation"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        {!isSmallScreem ? (
          <Drawer
            variant="persistent"
            anchor="left"
            open={navDrawerOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: styles.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        ) : (
          <Drawer
            classes={{
              paper: styles.drawerPaper,
            }}
            variant="temporary"
            onClose={handleDrawerToggle}
            open={navDrawerOpen}
          >
            {drawer}
          </Drawer>
        )}
      </nav>
    </div>
  );
}
