import React from "react";
import { Link } from "react-router-dom";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import { Typography, ListItemIcon } from "@material-ui/core";

import { blue } from "@material-ui/core/colors";
import data from "../data";

const blue600 = blue["800"];

const useStyles = makeStyles(() =>
  createStyles({
    menuItem: {
      color: blue600,
      fontWeight: 800,
      paddingTop: "0.2em",
      paddingBottom: "0.2em",
      fontSize: 16,
    },
  })
);

export default function AppDrawerMenu() {
  const styles = useStyles();

  return (
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
  );
}
