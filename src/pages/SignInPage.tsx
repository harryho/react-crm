import React, { useRef } from 'react';
// import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import ThemeDefault from '../theme-default';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';

import { grey, common } from '@material-ui/core/colors';
import { LinearProgress } from '@material-ui/core';

const grey500 = grey['500'];
const white = common.white;
const styles = {
  paperStyle: {
    width: 300,
    margin: 'auto',
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
    height: 'auto',
    position: 'absolute' as TODO,
    top: '20%',
    left: 0,
    right: 0,
    margin: 'auto',
  },
  formHeader: {
    color: 'blue',
    fontColor: 'navy',
    fontSize: 20,
    maxWidth: 500,
  },
  ListSubheader: {
    color: 'navy',
    fontColor: 'navy',
    fontSize: 16,
    maxWidth: 500,
  },
  paper: {
    padding: 20,
    overflow: 'auto',
  },
  buttonsDiv: {
    textAlign: 'center',
    padding: 10,
  },
  Button: {
    color: grey500,
  },
  checkRemember: {
    style: {
      float: 'left',
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
    float: 'right' as TODO,
  },
  btn: {
    background: '#4f81e9',
    color: white,
    padding: 7,
    borderRadius: 2,
    margin: 2,
    fontSize: 13,
  },
  btnFacebook: {
    background: '#4f81e9',
  },
  btnGoogle: {
    background: '#e14441',
  },
  btnSpan: {
    marginLeft: 5,
  },
};

interface SignInPageProps {
  onSignInClick: (credential: TODO) => void;
  // errorMessage?: string;
}

interface SignInState {
  canSubmit: boolean;
  username: string;
  password: string;
  formError: string;
  errorMessage?: string;
}

const SignInPage: React.FC<SignInPageProps> = ({
  //  errorMessage,
  onSignInClick,
}) => {
  const handleClick = event => {
    event.preventDefault();
  };

  return (
    <MuiThemeProvider theme={ThemeDefault}>
      <div>
        <div style={styles.loginContainer}>
          <Paper style={styles.paper}>
            <p style={styles.formHeader}>React Redux CRM</p>
            <p style={styles.ListSubheader}>Version 1.1.0</p>
            <Formik
              initialValues={{
                username: 'admin@test.com',
                password: 'password',
              }}
              validate={values => {
                const errors: Partial<SignInState> = {};
                if (!values.username) {
                  errors.username = 'Required';
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.username)) {
                  errors.username = 'Invalid email address';
                }

                if (!values.password) {
                  errors.password = 'Required';
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                onSignInClick(values);
                // setTimeout(() => {
                // setSubmitting(false);
                // console.log(JSON.stringify(values, null, 2));
                // }, 500);
              }}
            >
              {({ submitForm, isSubmitting }) => (
                <Form>
                  <div>
                    <Field
                      variant="outlined"
                      component={TextField}
                      placeholder="test@test.com"
                      // ref={this.username}
                      name="username"
                      // value={this.state.username ? this.state.username : ""}
                      label="Login ID"
                      fullWidth={true}
                      required
                    />
                  </div>
                  <br />
                  <div>
                    <Field
                      variant="outlined"
                      component={TextField}
                      placeholder="Password"
                      name="password"
                      label="Password"
                      fullWidth={true}
                      type="password"
                      required
                    />
                  </div>
                  {isSubmitting && <LinearProgress />}
                  <br />
                  <div>
                    <Link to="/">
                      <Button variant="contained" color="primary" onClick={submitForm} style={styles.loginBtn} disabled={isSubmitting}>
                        SignIn
                      </Button>
                    </Link>
                  </div>
                  {/* <div>{errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}</div> */}
                </Form>
              )}
            </Formik>
          </Paper>
        </div>
      </div>
    </MuiThemeProvider>
  );
};

export default SignInPage;
