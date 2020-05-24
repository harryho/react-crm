import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import ThemeDefault from '../theme-default';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { LinearProgress } from '@material-ui/core';

const styles = {
  
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
  loginBtn: {
    float: 'right' as TODO,
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
  return (
    <MuiThemeProvider theme={ThemeDefault}>
      <div>
        <div style={styles.loginContainer}>
          <Paper style={styles.paper}>
            <p style={styles.formHeader}>React Redux CRM</p>
            <p style={styles.ListSubheader}>Version 2.0.0</p>
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

              }}
            >
              {({ submitForm, isSubmitting }) => (
                <Form>
                  <div>
                    <Field
                      variant="outlined"
                      component={TextField}
                      placeholder="test@test.com"
                      name="username"
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
