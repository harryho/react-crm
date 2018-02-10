import React, { PropTypes } from "react";
import Drawer from "material-ui/Drawer";
import { spacing, typography } from "material-ui/styles";
import { white, orange, blue600 } from "material-ui/styles/colors";
import MenuItem from "material-ui/MenuItem";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import { Link } from "react-router";
import Avatar from "material-ui/Avatar";
// import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ContentFilter from "material-ui/svg-icons/content/filter-list";
// import FontIcon from 'material-ui/FontIcon';
import SettingsPower from "material-ui/svg-icons/action/settings-power";
import VpnKey from "material-ui/svg-icons/communication/vpn-key";

const LeftDrawer = props => {
  let { navDrawerOpen } = props;

  const styles = {
    logo: {
      cursor: "pointer",
      fontSize: 22,
      color: typography.textFullWhite,
      lineHeight: `${spacing.desktopKeylineIncrement}px`,
      fontWeight: typography.fontWeightLight,
      backgroundColor: blue600,
      paddingLeft: 40,
      height: 56
    },
    menuItem: {
      color: white,
      fontSize: 14
    },
    avatar: {
      div: {
        padding: "15px 0 20px 15px",
        backgroundImage:
          "url(" + require("../assets/img/material_bg.png") + ")",
        height: 45
      },
      icon: {
        float: "left",
        display: "block",
        marginRight: 15,
        boxShadow: "0px 0px 0px 8px rgba(0,0,0,0.2)"
      },
      span: {
        paddingTop: 0,
        display: "block",
        color: "purple",
        fontWeight: 400,
        fontSize: 19,
        textShadow: "1px 1px #444"
      }
    }
  };

  function handleClick(event) {
    event.preventDefault();
    props.onLogoutClick();
  }

  return (
    <Drawer docked={true} open={navDrawerOpen}>
      {/*<div style={styles.logo}>Material Admin<div>*/}
      <div style={styles.avatar.div}>
        <Avatar
          src="../assets/img/avatar0.png"
          size={50}
          style={styles.avatar.icon}
        />
        <span style={styles.avatar.span}>
          {props.username}

          <IconMenu
            color={white}
            iconButtonElement={
              <IconButton>
                <ContentFilter color={orange} />
              </IconButton>
            }
            targetOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "top" }}
          >
            <MenuItem
              primaryText="Sign out"
              leftIcon={<SettingsPower />}
              onClick={event => handleClick(event)}
            />
            <MenuItem primaryText="Change password" leftIcon={<VpnKey />} />
          </IconMenu>
        </span>
      </div>
      <div>
        {props.menus.map((menu, index) => (
          <MenuItem
            key={index}
            style={styles.menuItem}
            primaryText={menu.text}
            leftIcon={menu.icon}
            containerElement={<Link to={menu.link} />}
          />
        ))}
      </div>
    </Drawer>
  );
};

LeftDrawer.propTypes = {
  navDrawerOpen: PropTypes.bool,
  menus: PropTypes.array,
  username: PropTypes.string,
  onLogoutClick: PropTypes.func.isRequired
};

export default LeftDrawer;
