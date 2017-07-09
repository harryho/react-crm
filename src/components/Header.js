import React, {PropTypes} from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
// import IconMenu from 'material-ui/IconMenu';
// import MenuItem from 'material-ui/MenuItem';
// import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Menu from 'material-ui/svg-icons/navigation/menu';
// import ViewModule from 'material-ui/svg-icons/action/view-module';
import {white} from 'material-ui/styles/colors';
// import SearchBox from './SearchBox';

class Header extends React.Component {

  render() {
    const {styles, handleChangeRequestNavDrawer} = this.props;

    const style = {
      appBar: {
        position: 'fixed',
        top: 0,
        overflow: 'hidden',
        maxHeight: 57
      },
      menuButton: {
        marginLeft: 10
      },
      iconsRightContainer: {
        marginLeft: 20
      },
      iconsLeftContainer: {
        marginLeft: 20,
        marginRight: 10
      }
    };

    return (
        <div>
            <AppBar
              style={{...styles, ...style.appBar}}
              /*title={ <SearchBox />  }*/
              iconElementLeft={
                <div style={style.iconsLeftContainer}>
                  {/*<img width={35} src="../assets/img/logo_rtk_sm.png" ></img>*/}
                  <IconButton style={style.menuButton} onClick={handleChangeRequestNavDrawer}>
                    <Menu color={white} />
                  </IconButton>
                </div>
              }
            />
          </div>
      );
  }
}

Header.propTypes = {
  styles: PropTypes.object,
  handleChangeRequestNavDrawer: PropTypes.func
};

export default Header;
