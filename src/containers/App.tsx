import * as React from 'react';
import '../styles.scss';
// import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import LeftDrawer from '../components/LeftDrawer';
import withWidth, { WithWidth } from '@material-ui/core/withWidth';
import { createMuiTheme, withStyles, createStyles, Theme, WithStyles, StyleRules } from '@material-ui/core/styles';
import themeDefault from '../theme-default';
import Data from '../data';
import { connect } from 'react-redux';
import LoginPage from './SignInPage';
// import { loginUser, logoutUser } from "../actions/auth";
import { Dispatch } from 'redux';
import styles from '../styles';
import { User } from '../types';
import { tupleExpression } from '@babel/types';

import { CssBaseline } from '@material-ui/core';
import { thunkAuth } from '../services/thunks';
import { SIGN_IN, HttpMethod, SIGN_OUT } from '../store/types';
import CustomerListPage from './CustomerListPage';
import CustomerFormPage from './CustomerFormPage';
import AboutPage from './AboutPage';

const routes = [
  {
    path: '/customers',
    name: 'Customers',
    component: CustomerListPage,
    layout: '/',
  },
];

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === '/') {
        return <Route path={prop.layout + prop.path} component={prop.component} key={key} />;
      }
      return null;
    })}
    <Redirect from="/" to="/dashboard" />
  </Switch>
);

type AppProps = {
  children: React.ReactChildren;
  width: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  isAuthenticated: boolean;
  errorMessage: string;
  user: User;
  isFetching: boolean;
  signInUser: typeof thunkAuth;
  signOutUser: typeof thunkAuth;
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
    this.signOut = this.signOut.bind(this);
  }

  signInAction = {
    type: SIGN_IN,
    endpoint: 'login/',
    method: HttpMethod.POST,
    data: {},
  };
  signOutAction = {
    type: SIGN_OUT,
    endpoint: 'logout/',
    method: HttpMethod.GET,
    data: {},
  };

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

  signIn(c) {
    debugger;
    console.log(c);
    this.signInAction.data = c;
    this.props.signInUser(this.signInAction);
  }

  signOut() {
    this.props.signOutUser(this.signOutAction);
  }

  render() {
    const { isAuthenticated, errorMessage, user, isFetching, width } = this.props;

    const firstname = user && user.firstname ? user.firstname : '';
    const lastname = user && user.lastname ? user.lastname : '';

    let { navDrawerOpen } = this.state;
    const paddingLeftDrawerOpen = 240;

    const appStyles = {
      header: {
        appBar: {
          paddingLeft: navDrawerOpen ? paddingLeftDrawerOpen : 0,
          position: 'fixed',
          top: 0,
          overflow: 'hidden',
          maxHeight: 58,
          minHeight: 0,
        },
      },

      contenet: {
        paddingLeft: navDrawerOpen ? paddingLeftDrawerOpen : 0,
      },

      container: {
        margin: '80px 20px 20px 15px',
        paddingLeft:
          navDrawerOpen && width === 'sm' // SMALL
            ? paddingLeftDrawerOpen
            : 0,
      },
    };

    return (
      <MuiThemeProvider theme={themeDefault}>
        {/* <CssBaseline /> */}
        <div>
          {isAuthenticated && (
            // isFetching &&
            <div>
              <Header styles={appStyles.header} handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer.bind(this)}></Header>
              <React.Fragment>
                <LeftDrawer
                  navDrawerOpen={navDrawerOpen}
                  // signOutMenus={Data.signOutMenus as TODO}
                  username={`${firstname} ${lastname}`}
                  onLogoutClick={this.signOut}
                />
              </React.Fragment>
              <div style={appStyles.contenet}>
                {/* {this.props.children} */}
                <Route exact path={`/customers`} component={CustomerListPage} />
                <Route path={`/customer/:id`} component={CustomerFormPage} />
                <Route path={`/newcustomer/`} component={CustomerFormPage} />
                <Route path={`/about`} component={AboutPage} />
              </div>
            </div>
          )}
          {!isAuthenticated && <LoginPage errorMessage={errorMessage} onSignInClick={creds => this.signIn(creds)} />}
        </div>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  const { auth } = state;
  const { isFetching, isAuthenticated, user } = auth;

  return {
    isAuthenticated,
    isFetching,
    // errorMessage,
    user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signInUser: (action: TODO) => dispatch(thunkAuth(action)),
    signOutUser: (action: TODO) => dispatch(thunkAuth(action)),
  };
}

export default withStyles(styles)(
  // withWidth()
  connect(mapStateToProps, mapDispatchToProps)(App)
);
