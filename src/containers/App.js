import React, { PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from '../components/Header';
import LeftDrawer from '../components/LeftDrawer';
import withWidth, {LARGE, SMALL} from 'material-ui/utils/withWidth';
import ThemeDefault from '../theme-default';
import Data from '../data';
import { connect } from 'react-redux'
import LoginPage from './LoginPage';
import { loginUser , logoutUser} from '../actions/auth'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      navDrawerOpen: true
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.width !== nextProps.width) {
      this.setState({navDrawerOpen: nextProps.width === LARGE});
    }
  }

  handleChangeRequestNavDrawer() {
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen
    });
  }

  render() {

    const { dispatch, isAuthenticated, errorMessage, user ,isFetching } = this.props;

    const  firstName = user && user.firstName?user.firstName:'';
    const  lastName = user && user.lastName?user.lastName:'';

    let { navDrawerOpen } = this.state;
    const paddingLeftDrawerOpen = 250;

    const styles = {
      header: {
        paddingLeft: navDrawerOpen ? paddingLeftDrawerOpen : 0
      },
      container: {
        margin: '80px 20px 20px 15px',
        paddingLeft: navDrawerOpen && this.props.width !== SMALL ? paddingLeftDrawerOpen : 0
      }
    };

    return (       
      <MuiThemeProvider muiTheme={ThemeDefault}>
        <div>
            {isAuthenticated && !isFetching &&
                <div>
                    <Header styles={styles.header}
                            handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer.bind(this)}/>

                        <LeftDrawer navDrawerOpen={navDrawerOpen}
                                    menus={Data.menus}
                                    signOutMenus ={Data.signOutMenus}
                                    username= {`${firstName} ${lastName}`} 
                                    onLogoutClick={() => dispatch(logoutUser())}
                                    />

                    <div style={styles.container}>
                    {this.props.children}
                    </div>
                </div>
            }
            {!isAuthenticated &&
                <LoginPage
                errorMessage={errorMessage}
                onLoginClick={creds => dispatch(loginUser(creds))}
                />
            }
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
    children: PropTypes.element,
    width: PropTypes.number,
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    user: PropTypes.object,
    isFetching: PropTypes.bool
};

/* eslint-disable */
function mapStateToProps(state) {  
  const { auth } = state
  const { isFetching, isAuthenticated, errorMessage, user } = auth
  
  return {
    isAuthenticated,
    errorMessage,
    user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    resetUpdate: () => dispatch(resetUpdate()),

  }
}

export default  connect(mapStateToProps) (withWidth()(App));  
