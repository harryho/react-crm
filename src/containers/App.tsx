import * as React from "react";
import "../styles.scss";
// import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "../components/Header";
import LeftDrawer from "../components/LeftDrawer";
import withWidth, { WithWidth } from "@material-ui/core/withWidth";
import {
  createMuiTheme,
  withStyles,
  createStyles,
  Theme,
  WithStyles,
  StyleRules,
} from "@material-ui/core/styles";
import themeDefault from "../theme-default";
import Data from "../data";
import { connect } from "react-redux";
import LoginPage from "./SignInPage";
// import { loginUser, logoutUser } from "../actions/auth";
import { Dispatch } from "redux";
import styles from "../styles";
import { User } from "../types";
import { tupleExpression } from "@babel/types";
import { routes } from "../routes";

import { CssBaseline } from "@material-ui/core";
import { thunkAuth } from "../services/thunks";
import { SIGN_IN, HttpMethod, SIGN_OUT } from "../store/types";

const dispatchProps = {
  loginUser: typeof thunkAuth,
  logoutUser: typeof thunkAuth,
};

// class App extends React.Component {
type AppProps = {
  children: React.ReactChildren;
  width: "xs" | "sm" | "md" | "lg" | "xl";
  isAuthenticated: boolean;
  errorMessage: string;
  user: User;
  isFetching: boolean;
} & WithStyles<typeof styles> &
  WithWidth;

type AppState = {
  navDrawerOpen: boolean;
};

class App extends React.Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      navDrawerOpen: true,
    };
  }

  signInAction = {
    type: SIGN_IN,
    endpoint: 'login/',
    method: HttpMethod.POST,
    data: {},
  };
  signOutAction = {
    type: SIGN_OUT,
    endpoint: 'login/',
    method: HttpMethod.GET,
    data: {}
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.width !== nextProps.width) {
      this.setState({ navDrawerOpen: nextProps.width >= 1000 });
    }
  }

  handleChangeRequestNavDrawer() {
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen,
    });
  }

  signIn(c){
    this.signInAction.data = c
    thunkAuth(this.signInAction)
  }

  signOut(){
    thunkAuth(this.signOutAction)
  }

  render() {
    const {
      isAuthenticated,
      errorMessage,
      user,
      isFetching,
      width,
    } = this.props;

    const firstName = user && user.firstName ? user.firstName : "";
    const lastName = user && user.lastName ? user.lastName : "";

    let { navDrawerOpen } = this.state;
    const paddingLeftDrawerOpen = 240;

    const appStyles = {
      header: {
        appBar: {
          paddingLeft: navDrawerOpen ? paddingLeftDrawerOpen : 0,
          position: "fixed",
          top: 0,
          overflow: "hidden",
          maxHeight: 57,
        },
      },
      container: {
        margin: "80px 20px 20px 15px",
        paddingLeft:
          navDrawerOpen && width === "sm" // SMALL
            ? paddingLeftDrawerOpen
            : 0,
      },
    };

    return (
      <MuiThemeProvider theme={themeDefault}>
        {/* <CssBaseline /> */}
        <div>
          {
            !isAuthenticated &&
              !isFetching &&
            <div>
              <Header
                styles={appStyles.header}
                handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer.bind(
                  this
                )}
              />

              <LeftDrawer
                navDrawerOpen={navDrawerOpen}
                // signOutMenus={Data.signOutMenus as TODO}
                username={`${firstName} ${lastName}`}
                onLogoutClick={() => this.signOut()}
              />
              <h1>AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</h1>
              <div style={appStyles.container}>{this.props.children}</div>
            </div>
          }
          {!isAuthenticated && (
            <LoginPage
              errorMessage={errorMessage}
              onSignInClick={creds => this.signIn(creds)}
            />
          )}
        </div>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  const { auth } = state;
  const { isFetching, isAuthenticated, user } = auth;

  return {
    isAuthenticated: true,
    errorMessage: "",
    user: {} as TODO,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    thunkAuth,
    // logoutUser,
  };
}

export default withStyles(styles)(
  // withWidth()
  connect(mapStateToProps, mapDispatchToProps)(App)
);
