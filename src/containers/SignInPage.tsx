import React, { useRef } from "react";
// import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

// import Card, { CardHeader, CardMedia, CardContent, CardActions } from "@material-ui/core/Card";
import { Link } from "react-router-dom";
import ThemeDefault from "../theme-default";

// import { FormsyText } from "formsy-material-ui/lib";
// import Formsy from "formsy-react";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";

import { grey, common } from "@material-ui/core/colors";

const grey500 = grey["500"];
const white = common.white;
const styles = {
  paperStyle: {
    width: 300,
    margin: "auto",
    padding: 20,
  },
  switchStyle: {
    marginBottom: 16,
  },
  submitStyle: {
    marginTop: 32,
  },
  loginContainer: {
    minWidth: 320,
    maxWidth: 400,
    height: "auto",
    position: "absolute" as TODO,
    top: "20%",
    left: 0,
    right: 0,
    margin: "auto",
  },
  formHeader: {
    color: "blue",
    fontColor: "navy",
    fontSize: 20,
    maxWidth: 500,
  },
  ListSubheader: {
    color: "navy",
    fontColor: "navy",
    fontSize: 16,
    maxWidth: 500,
  },
  paper: {
    padding: 20,
    overflow: "auto",
  },
  buttonsDiv: {
    textAlign: "center",
    padding: 10,
  },
  Button: {
    color: grey500,
  },
  checkRemember: {
    style: {
      float: "left",
      maxWidth: 180,
      paddingTop: 5,
    },
    labelStyle: {
      color: grey500,
    },
    iconStyle: {
      color: grey500,
      borderColor: grey500,
      fill: grey500,
    },
  },
  loginBtn: {
    float: "right" as TODO,
  },
  btn: {
    background: "#4f81e9",
    color: white,
    padding: 7,
    borderRadius: 2,
    margin: 2,
    fontSize: 13,
  },
  btnFacebook: {
    background: "#4f81e9",
  },
  btnGoogle: {
    background: "#e14441",
  },
  btnSpan: {
    marginLeft: 5,
  },
};

interface SignInPageProps {
  onSignInClick: (credential: TODO) => void;
  errorMessage: string;
}

interface SignInState {
  canSubmit: boolean;
  username: string;
  password: string;
  formError: string;
  errorMessage?: string;
}

// class SignInPage extends React.Component {
// class SignInPage extends React.Component<SignInPageProps, SignInState> {
  const SignInPage: React.FC<SignInPageProps> = ({
    errorMessage,
    onSignInClick,
  }) => {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     canSubmit: false,
  //     username: "Admin@test.com",
  //     password: "password",
  //     formError: "",
  //     errorMessage: "", //props.errorMessage,
  //   };
  //   this.handleClick = this.handleClick.bind(this);
  //   this.handleChange = this.handleChange.bind(this);
  //   this.enableButton = this.enableButton.bind(this);
  //   this.notifyFormError = this.notifyFormError.bind(this);
  //   this.disableButton = this.disableButton.bind(this);
  // }

  const handleClick = (event) =>{
    event.preventDefault();
    // const username = this.refs.username;
    // const password = this.refs.password;

    // const creds = {
    //   username: username.getValue().trim(),
    //   password: password.getValue().trim(),
    // };
    // this.props.onSignInClick(creds);
  }

  // handleChange(e: React.ChangeEvent<unknown>, value: string) {
    // e.target.classList.add("active");
    // this.setState({
    //   [e.target.name]: e.target.value,
    // });
  // }

  // enableButton() {
  //   this.setState({
  //     canSubmit: true,
  //   });
  // }

  // disableButton() {
  //   this.setState({
  //     canSubmit: false,
  //   });
  // }

  // notifyFormError(data) {
  //   console.error("Form error:", data);
  // }

  // render() {
    // const { errorMessage } = this.props;

    return (
      <MuiThemeProvider theme={ThemeDefault}>
        <div>
          <div style={styles.loginContainer}>
            <Paper style={styles.paper}>
              <p style={styles.formHeader}>React Redux CRM</p>
              <p style={styles.ListSubheader}>Version 1.1.0</p>
              <Formik
                initialValues={{
                  username: "Admin@test.com",
                  password: "password",
                }}
                validate={(values) => {
                  const errors: Partial<SignInState> = {};
                  if (!values.username) {
                    errors.username = "Required";
                  } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                      values.username
                    )
                  ) {
                    errors.username = "Invalid email address";
                  }
                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  // event.preventDefault();
                  setTimeout(() => {
                    setSubmitting(false);
                    alert(JSON.stringify(values, null, 2));
                  }, 1500);
                }}
              >
                {({ submitForm, isSubmitting }) => (
                  <Form
                  // onValid={this.enableButton}
                  // onInvalid={this.disableButton}
                  // onValidSubmit={this.handleClick}
                  // onInvalidSubmit={this.notifyFormError}
                  >
                    <Field
                      variant="outlined"
                      component={TextField}
                      hinttext="E-mail"
                      // ref={this.username}
                      name="username"
                      // value={this.state.username ? this.state.username : ""}
                      floatinglabeltext="E-mail"
                      fullWidth={true}
                      validations={{
                        isEmail: true,
                      }}
                      validationerrors={{
                        isEmail: "Please provide a valid email",
                        isDefaultRequiredValue: "This is a required field",
                      }}
                      required
                    />
                    <Field
                    variant="outlined"
                      component={TextField}
                      hinttext="Password"
                      // ref={this.password}
                      name="password"
                      // value={this.state.password ? this.state.password : ""}
                      floatinglabeltext="Password"
                      fullWidth={true}
                      type="password"
                      validations={{
                        minLength: 3,
                      }}
                      validationerrors={{
                        minLength: "Please provide a valid password",
                        isDefaultRequiredValue: "This is a required field",
                      }}
                      required
                    />

                    <div>
                      <Link to="/">
                        <Button
                          variant="contained"
                          color="primary"
                          // onClick={this.handleClick}
                          onClick={submitForm}
                          style={styles.loginBtn}
                          //disabled={!this.state.canSubmit}
                          disabled={isSubmitting}
                        >
                          SignIn
                        </Button>
                      </Link>
                    </div>
                    <div>
                      {errorMessage && (
                        <p style={{ color: "red" }}>{errorMessage}</p>
                      )}
                    </div>
                  </Form>
                )}
              </Formik>
            </Paper>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }


// SignInPage.propTypes = {
//   onSignInClick: func.isRequired,
//   errorMessage: string
// };

export default SignInPage;
