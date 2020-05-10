import * as React from 'react';
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
// import Header from "../components/Header";
// import LeftDrawer from "../components/LeftDrawer";
import withWidth, { WithWidth } from "@material-ui/core/withWidth";
import {
  createMuiTheme,
  withStyles,
  createStyles,
  Theme,
  WithStyles,
  StyleRules
} from "@material-ui/core/styles";
import ThemeDefault from "../theme-default";
import Data from "../data";
import { connect } from "react-redux";
import LoginPage from "./LoginPage";
import { loginUser, logoutUser } from "../actions/auth";
import { Dispatch } from 'redux';
import styles from '../styles';
import { User } from '../types';
import { tupleExpression } from '@babel/types';

const dispatchProps = {
  loginUser: typeof loginUser,
  logoutUser: typeof logoutUser
};

// class App extends React.Component {
type AppProps = {
    children: React.ReactChildren,
    width: number,
    // dispatch: (ation:Dispatch)=>void,
    isAuthenticated: boolean,
    errorMessage: string,
    user: User,
    isFetching: boolean
  } &  WithStyles<typeof styles> & WithWidth ;

  class App extends React.Component<AppProps> {
  // constructor(props) {
    // super(props);
    state = {
      navDrawerOpen: true
    };
  // }

  componentWillReceiveProps(nextProps) {
    if (this.props.width !== nextProps.width) {
      this.setState({ navDrawerOpen: nextProps.width >= 1000 });
    }
  }

  handleChangeRequestNavDrawer() {
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen
    });
  }

  render() {
    const {
      // dispatch,
      isAuthenticated,
      errorMessage,
      user,
      isFetching
    } = this.props;

    const firstName = user && user.firstName ? user.firstName : "";
    const lastName = user && user.lastName ? user.lastName : "";

    let { navDrawerOpen } = this.state;
    const paddingLeftDrawerOpen = 250;

    const styles = {
      header: {
        paddingLeft: navDrawerOpen ? paddingLeftDrawerOpen : 0
      },
      container: {
        margin: "80px 20px 20px 15px",
        paddingLeft:
          navDrawerOpen && this.props.width <= 400 // SMALL
            ? paddingLeftDrawerOpen
            : 0,

      }
    };

    return (
      <MuiThemeProvider muiTheme={ThemeDefault}>
        <div>
          {
          // !isAuthenticated &&
          //   !isFetching &&
             (
              <div>
                {/* <Header
                  styles={styles.header}
                  handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer.bind(
                    this
                  )}
                /> */}

                {/* <LeftDrawer
                  navDrawerOpen={navDrawerOpen}
                  menus={Data.menus}
                  // signOutMenus={Data.signOutMenus as TODO}
                  username={`${firstName} ${lastName}`}
                  onLogoutClick={() => logoutUser()}
                /> */}
                <h1>AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</h1>
                <div style={styles.container}>{this.props.children}</div>
              </div>
            )}
          {/* {!isAuthenticated && (
            <LoginPage
              errorMessage={errorMessage}
              onLoginClick={creds => loginUser(creds)}
            />
          )} */}
        </div>
      </MuiThemeProvider>
    );
  }
}

// App.propTypes = {
//   children: element,
//   width: number,
//   dispatch: func.isRequired,
//   isAuthenticated: bool.isRequired,
//   errorMessage: string,
//   user: object,
//   isFetching: bool
// };

/* eslint-disable */
function mapStateToProps(state) {
  const { auth } = state;
  const { isFetching, isAuthenticated, errorMessage, user } = auth;

  return {
    isAuthenticated,
    errorMessage,
    user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loginUser,
    logoutUser
  };
}

export default withStyles(styles)(
  withWidth()(connect(mapStateToProps,
  mapDispatchToProps)(App)));
