import React from "react";
import  List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
// import Wallpaper from "@material-ui/icons/Wallpaper";

import {
  //  grey,
  cyan,
  common,
} from "@material-ui/core/colors";
import { ListItem, ListItemText } from "@material-ui/core";

const cyan600 = cyan["600"];
const white = common.white;
const RecentlyProducts = (props) => {
  const styles = {
    ListSubheader: {
      fontSize: 24,
      fontWeight: 500, 
      backgroundColor: cyan600,
      color: white,
    },
  };

  const rightIconMenu = (
    <Menu open={true}>
      <MenuItem>View</MenuItem>
    </Menu>
  );

  return (
    <Paper>
      <List>
        <ListSubheader style={styles.ListSubheader}>
          Recent Products
        </ListSubheader>
        {props.data.map((item) => (
          <div key={item.title}>
            <ListItemText
              primary={item.title}
              secondary={item.text}
            />
          </div>
        ))}
      </List>
    </Paper>
  );
};

export default RecentlyProducts;
