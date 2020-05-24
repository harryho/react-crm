import React from "react";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { blue, common } from "@material-ui/core/colors";
import AppUserMenu from "./AppUserMenu";
import AppDrawerMenu from "./AppDrawerMenu";

const blue600 = blue["900"];
const drawerWidth = 250;

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
    },
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: "rgba(227, 231, 232, 1)",
      overflow: "auto",
    },
    user: {
      fontSize: 22,
      color: common.white,
    },
    menuItem: {
      color: blue600,
      fontWeight: 500,
      paddingTop: "0.2em",
      paddingBottom: "0.2em",
      fontSize: 16,
    },
  })
);

interface Props {
  navDrawerOpen: boolean;
  username: string;
  onSignoutClick: () => void;
  onChangePassClick: ()=>void;
  handleDrawerToggle: () => void;
  isSmallScreem: boolean;
  drawerStyle: {};
  children?: TODO;
}

export default function AppNavDrawer(props: Props) {
  const styles = useStyles();
  const {
    username,
    navDrawerOpen,
    isSmallScreem,
    onSignoutClick,
    onChangePassClick,
    handleDrawerToggle,
    drawerStyle,
  } = props;

  

  const drawer = (
    <>
      <AppUserMenu username={username} onSignoutClick={onSignoutClick} 
      onChangePassClick={onChangePassClick} />
      <AppDrawerMenu />
    </>
  );

  return (
    <div className={styles.root}>
      <nav style={drawerStyle} aria-label="app navigation">
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
