import React, { PropTypes } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Paper from "material-ui/Paper";
import RaisedButton from "material-ui/RaisedButton";
import { grey500, white } from "material-ui/styles/colors";
// import Card, { CardHeader, CardMedia, CardContent, CardActions } from "material-ui/Card";
import { Link } from "react-router";
import ThemeDefault from "../theme-default";

import { FormsyText } from "formsy-material-ui/lib";
import Formsy from "formsy-react";

class LoginPage extends React.Component {
  constructor(props) {
    super();

    this.state = {
      canSubmit: false,
      username: "hho@test.com",
      password: "password",
      formError: "",
      errorMessage: props.errorMessage,
      styles: {
        paperStyle: {
          width: 300,
          margin: "auto",
          padding: 20
        },
        switchStyle: {
          marginBottom: 16
        },
        submitStyle: {
          marginTop: 32
        }
      }
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.notifyFormError = this.notifyFormError.bind(this);
    this.disableButton = this.disableButton.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    const username = this.refs.username;
    const password = this.refs.password;

    const creds = {
      username: username.getValue().trim(),
      password: password.getValue().trim()
    };
    this.props.onLoginClick(creds);
  }

  handleChange(e) {
    e.target.classList.add("active");

    this.setState({
      [e.target.name]: e.target.value
    });
  }

  enableButton() {
    this.setState({
      canSubmit: true
    });
  }

  disableButton() {
    this.setState({
      canSubmit: false
    });
  }

  notifyFormError(data) {
    console.error("Form error:", data);
  }

  render() {
    const styles = {
      loginContainer: {
        minWidth: 320,
        maxWidth: 400,
        height: "auto",
        position: "absolute",
        top: "20%",
        left: 0,
        right: 0,
        margin: "auto"
      },
      formHeader: {
        color: "blue",
        fontColor: "navy",
        fontSize: 20,
        maxWidth: 500
      },
      subHeader: {
        color: "navy",
        fontColor: "navy",
        fontSize: 16,
        maxWidth: 500
      },
      paper: {
        padding: 20,
        overflow: "auto"
      },
      buttonsDiv: {
        textAlign: "center",
        padding: 10
      },
      flatButton: {
        color: grey500
      },
      checkRemember: {
        style: {
          float: "left",
          maxWidth: 180,
          paddingTop: 5
        },
        labelStyle: {
          color: grey500
        },
        iconStyle: {
          color: grey500,
          borderColor: grey500,
          fill: grey500
        }
      },
      loginBtn: {
        float: "right"
      },
      btn: {
        background: "#4f81e9",
        color: white,
        padding: 7,
        borderRadius: 2,
        margin: 2,
        fontSize: 13
      },
      btnFacebook: {
        background: "#4f81e9"
      },
      btnGoogle: {
        background: "#e14441"
      },
      btnSpan: {
        marginLeft: 5
      }
    };

    const { errorMessage } = this.props;

    return (
      <MuiThemeProvider muiTheme={ThemeDefault}>
        <div>
          <div style={styles.loginContainer}>
            <Paper style={styles.paper}>
              <p style={styles.formHeader}>React Redux CRM</p>
              <p style={styles.subHeader}>Version 1.1.0</p>
              <Formsy.Form
                onValid={this.enableButton}
                onInvalid={this.disableButton}
                onValidSubmit={this.handleClick}
                onInvalidSubmit={this.notifyFormError}
              >
                <FormsyText
                  hintText="E-mail"
                  ref="username"
                  name="username"
                  value={this.state.username ? this.state.username : ""}
                  floatingLabelText="E-mail"
                  fullWidth={true}
                  validations={{
                    isEmail: true
                  }}
                  validationErrors={{
                    isEmail: "Please provide a valid email",
                    isDefaultRequiredValue: "This is a required field"
                  }}
                  required
                />
                <FormsyText
                  hintText="Password"
                  ref="password"
                  name="password"
                  value={this.state.password ? this.state.password : ""}
                  floatingLabelText="Password"
                  fullWidth={true}
                  type="password"
                  validations={{
                    minLength: 3
                  }}
                  validationErrors={{
                    minLength: "Please provide a valid password",
                    isDefaultRequiredValue: "This is a required field"
                  }}
                  required
                />

                <div>
                  <Link to="/">
                    <RaisedButton
                      label="Login"
                      primary={true}
                      onClick={() => this.handleClick(event)}
                      style={styles.loginBtn}
                      disabled={!this.state.canSubmit}
                    />
                  </Link>
                </div>
                <div>
                  {errorMessage && (
                    <p style={{ color: "red" }}>{errorMessage}</p>
                  )}
                </div>
              </Formsy.Form>
            </Paper>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

LoginPage.propTypes = {
  onLoginClick: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
};

export default LoginPage;
