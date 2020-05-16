import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';

import Divider from '@material-ui/core/Divider';
import PageBase from '../components/PageBase';

import { connect } from 'react-redux';
// import { GridList, GridTile } from '@material-ui/core/GridList';
import Card  from '@material-ui/core/Card';
import CircularProgress from '@material-ui/core/CircularProgress';

import { getCustomer, updateCustomer,
  //  addCustomer,
    newCustomer } from '../actions/customer';
// import { TextField } from "formsy-material-ui/lib";

// import Formsy from "formsy-react";
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';

// import autoBind from "react-autobind";

import { grey } from '@material-ui/core/colors';
import { thunkApiCall } from '../services/thunks';
import { Customer, Address, User } from '../types';
import { LinearProgress } from '@material-ui/core';

const grey400 = grey['400'];


interface CustomerFormProps {
  router: object;
  routeParams: object;
  customer: object;
  newCustomer: typeof thunkApiCall;
  getCustomer: typeof thunkApiCall;
  updateCustomer: typeof thunkApiCall;
  updateSuccess: boolean;
  addSuccess: boolean;
  addCustomer: typeof thunkApiCall;
  errorMessage?: string;
}

interface CustomerFormState {
  customer: Customer;
  isFetching: boolean;
  // addSuccess:boolean,
  // updateSuccess:boolean,
  // errorMessage?:string,
  // isAuthenticated:boolean,
  // user:User
}

// class CustomerFormPage extends React.Component {
class CustomerFormPage extends React.Component<CustomerFormProps, CustomerFormState> {
  constructor(props) {
    super(props);
    // autoBind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    // this.enableButton = this.enableButton.bind(this);
    this.notifyFormError = this.notifyFormError.bind(this);
    // this.disableButton = this.disableButton.bind(this);
  }

  state = {
    isFetching: true,
    customer: {} as Customer
  };

  UNSAFE_componentWillMount() {
    // if (this.props.routeParams?.id) 
    // this.props.getCustomer((this.props.routeParams)?.id));
    // else this.props.newCustomer();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.customer && nextProps.customer
      //  && this.props.customer?.id != nextProps.customer?.id
       ) {
      this.setState({ isFetching: false });
      this.setState({ customer: Object.assign({}, nextProps.customer) });
    }

    if ((!this.props.addSuccess && nextProps.addSuccess) || (!this.props.updateSuccess && nextProps.updateSuccess)) {
      // this.props.router.push("/customers");
    }
  }

  handleChange(event) {
    const field = event.target.name;
    // const { customer } = this.state;

    if (event && event.target && field) {
      const customer = Object.assign({}, this.state.customer);
      customer[field] = event.target.value;
      this.setState({ customer: customer });
    }
  }

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

  notifyFormError(data) {
    console.error('Form error:', data);
  }

  handleClick(event) {
    event.preventDefault();
    // if (this.state.customer.id) this.props.updateCustomer(this.state.customer);
    // else this.props.addCustomer(this.state.customer);
  }

  render() {
    const { errorMessage } = this.props;
// debugger
    const { isFetching, customer } = this.state;

    const styles = {
      toggleDiv: {
        maxWidth: 300,
        marginTop: 40,
        marginBottom: 5,
      },
      toggleLabel: {
        color: grey400,
        fontWeight: 100,
      },
      buttons: {
        marginTop: 30,
        float: 'right' as TODO,
      },
      saveButton: {
        marginLeft: 5,
      },
      card: {
        width: 120,
      },
    };
    // if (isFetching) {
    //   return <CircularProgress />;
    // } else {
      return (
        <PageBase title="Customer" navigation="Application / Customer ">
          <Formik

            initialValues={{
              ...customer
//               firstName: '',
//               lastName: '',
//               email:'',
// mobile: ''
            }}
            validate={values => {
              const errors: Partial<Customer & User> = {};
              if (!values.firstName) {
                errors.firstName = 'Required';
              }

              if (!values.email) {
                errors.email = 'Required';
              } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
              }

              // if (!values.password) {
              //   errors.password = 'Required';
              // }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              // onSignInClick(values);
              setTimeout(() => {
                setSubmitting(false);
                console.log(JSON.stringify(values, null, 2));
              }, 500);
            }}
          >
            {({ submitForm, isSubmitting }) => (
              <Form>
                {/* <GridList cellHeight={300}>
                  <GridTile> */}


                    <Field
                      component={TextField}
                      placeholder="First Name"
                      label="First Name"
                      name="firstName"
                      onChange={this.handleChange}
                      fullWidth={true}
                      value={customer.firstName ? customer.firstName : ''}
                      validations={{
                        isWords: true,
                      }}
                      validationErrors={{
                        isWords: 'Please provide valid first name',
                        isDefaultRequiredValue: 'This is a required field',
                      }}
                      required
                    />

                    <Field
                      component={TextField}
                      placeholder="Last Name"
                      label="Last Name"
                      fullWidth={true}
                      name="lastName"
                      onChange={this.handleChange}
                      validations={{
                        isWords: true,
                      }}
                      validationErrors={{
                        isWords: 'Please provide valid first name',
                        isDefaultRequiredValue: 'This is a required field',
                      }}
                      value={customer.lastName ? customer.lastName : ''}
                      required
                    />

                    <Field
                      component={TextField}
                      placeholder="Rewards"
                      label="Rewards"
                      fullWidth={true}
                      type="number"
                      name="rewards"
                      onChange={this.handleChange}
                      value={customer.rewards}
                      validations={{
                        isInt: true,
                      }}
                      validationErrors={{
                        isInt: 'Please provide a valid password',
                        isDefaultRequiredValue: 'This is a required field',
                      }}
                      required
                    />

                    <div style={styles.toggleDiv}>

                        <Switch
        checked={customer.membership}
        onChange={this.handleChange}
        color="primary"
        name="membership"
        inputProps={{ 'aria-label': 'membership' }}
      />
                    </div>
         
                    {this.state.customer && customer.avatar && (
                      <Card style={styles.card}>
                        <img width={100} src={customer.avatar} />
                      </Card>
                    )}
         
  
                <Divider />
                {isSubmitting && <LinearProgress />}
                  <br />
                <div style={styles.buttons}>
                  <Link to="/customers">
                    <Button variant="contained">Cancel </Button>
                  </Link>
                  <Button
                    variant="contained"
                    style={styles.saveButton}
                    type="button"
                    // onClick={() => this.handleClick(event)}
                    onClick={submitForm}
                    color="primary"
                    disabled={isSubmitting}
                  >
                    Save
                  </Button>
                  
                </div>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
              </Form>
            )}

          </Formik>
        </PageBase>
      );
    }
  }
// }


function mapStateToProps(state) {
  // const { customerReducer: customer } = state;
  const { customer, isFetching,
    //  updateSuccess, addSuccess, isAuthenticated, 
     errorMessage, user } = state.customer;

  return {
    customer,
    isFetching,
    // addSuccess,
    // updateSuccess,
    errorMessage,
    // isAuthenticated,
    user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    newCustomer: () => dispatch(newCustomer()),
    getCustomer: id => dispatch(getCustomer(id)),
    updateCustomer: customer => dispatch(updateCustomer(customer)),
    // addCustomer: customer => dispatch(addCustomer(customer)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerFormPage);
