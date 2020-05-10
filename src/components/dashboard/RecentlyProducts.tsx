import React from "react";
import Avatar from "@material-ui/core/Avatar";
import  List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
// import IconButton from "@material-ui/core/IconButton";
// import MoreVertIcon from '@material-ui/icons/MoreVert';
// import IconMenu from "@material-ui/core/IconMenu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

// const grey400 = grey['400'];

// import { typography } from "@material-ui/core/styles";
import Wallpaper from "@material-ui/icons/Wallpaper";

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
      fontWeight: 500, //typography.fontWeightLight,
      backgroundColor: cyan600,
      color: white,
    },
  };

  // const iconButtonElement = (
  //   <IconButton touch={true} tooltipPosition="bottom-left">
  //     <MoreVertIcon color={grey400} />
  //   </IconButton>
  // );

  const rightIconMenu = (
    // <IconMenu iconButtonElement={iconButtonElement}>
    //   <MenuItem>View</MenuItem>
    // </IconMenu>
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
              // leftAvatar={<Avatar icon={<Wallpaper />}
              
              primary={item.title}
              secondary={item.text}
              // rightIconButton={rightIconMenu}
            />
            {/* <IconButton edge="end" aria-label="comments">
                <CommentIcon />
              </IconButton>
            <Divider />  */}

             {/* classKey={"inset" } /> */}
          </div>
        ))}
      </List>
    </Paper>
  );
};

// RecentlyProducts.propTypes = {
//   data: PropTypes.array,
// };

export default RecentlyProducts;
