import React, { PropTypes } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
const grey400 = grey['400'];
import Divider from "@material-ui/core/Divider";
import PageBase from "../components/PageBase";

import { connect } from "react-redux";
import { GridList, GridTile } from "@material-ui/core/GridList";
import { Card } from "@material-ui/core/Card";
import CircularProgress from "@material-ui/core/CircularProgress";

import {
  getCustomer,
  updateCustomer,
  addCustomer,
  newCustomer
} from "../actions/customer";
// import { TextField } from "formsy-material-ui/lib";

// import Formsy from "formsy-react";
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';

import autoBind from "react-autobind";

import { grey } from '@material-ui/core/colors';

class CustomerFormPage extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      isFetching: this.props.routeParams.id ? true : false,
      customer: {}
    };

    // this.handleChange = this.handleChange.bind(this);
    // this.handleClick = this.handleClick.bind(this);
    // this.enableButton = this.enableButton.bind(this);
    // this.notifyFormError = this.notifyFormError.bind(this);
    // this.disableButton = this.disableButton.bind(this);
  }

  UNSAFE_componentWillMount() {
    if (this.props.routeParams.id)
      this.props.getCustomer(this.props.routeParams.id);
    else this.props.newCustomer();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      this.props.customer &&
      nextProps.customer &&
      this.props.customer.id != nextProps.customer.id
    ) {
      this.setState({ isFetching: false });
      this.setState({ customer: Object.assign({}, nextProps.customer) });
    }

    if (
      (!this.props.addSuccess && nextProps.addSuccess) ||
      (!this.props.updateSuccess && nextProps.updateSuccess)
    ) {
      this.props.router.push("/customers");
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

  handleClick(event) {
    event.preventDefault();
    if (this.state.customer.id) this.props.updateCustomer(this.state.customer);
    else this.props.addCustomer(this.state.customer);
  }

  render() {
    const { errorMessage } = this.props;

    const { isFetching, customer } = this.state;

    const styles = {
      toggleDiv: {
        maxWidth: 300,
        marginTop: 40,
        marginBottom: 5
      },
      toggleLabel: {
        color: grey400,
        fontWeight: 100
      },
      buttons: {
        marginTop: 30,
        float: "right"
      },
      saveButton: {
        marginLeft: 5
      },
      card: {
        width: 120
      }
    };
    if (isFetching) {
      return <CircularProgress />;
    } else {
      return (
        <PageBase title="Customer" navigation="Application / Customer ">
          <Formik
            onValid={this.enableButton}
            onInvalid={this.disableButton}
            onValidSubmit={this.handleClick}
            onInvalidSubmit={this.notifyFormError}
          >
            <Form>
            <GridList cellHeight={300}>
              <GridTile>
                <Field
                   component={TextField}
                  hintText="First Name"
                  floatingLabelText="First Name"
                  name="firstName"
                  onChange={this.handleChange}
                  fullWidth={true}
                  value={customer.firstName ? customer.firstName : ""}
                  validations={{
                    isWords: true
                  }}
                  validationErrors={{
                    isWords: "Please provide valid first name",
                    isDefaultRequiredValue: "This is a required field"
                  }}
                  required
                />

                <Field
                 component={TextField}
                  hintText="Last Name"
                  floatingLabelText="Last Name"
                  fullWidth={true}
                  name="lastName"
                  onChange={this.handleChange}
                  validations={{
                    isWords: true
                  }}
                  validationErrors={{
                    isWords: "Please provide valid first name",
                    isDefaultRequiredValue: "This is a required field"
                  }}
                  value={customer.lastName ? customer.lastName : ""}
                  required
                />

                <Field
                 component={TextField}
                  hintText="Rewards"
                  floatingLabelText="Rewards"
                  fullWidth={true}
                  type="number"
                  name="rewards"
                  onChange={this.handleChange}
                  value={customer.rewards}
                  validations={{
                    isInt: true
                  }}
                  validationErrors={{
                    isInt: "Please provide a valid password",
                    isDefaultRequiredValue: "This is a required field"
                  }}
                  required
                />

                <div style={styles.toggleDiv}>
                  <Switch
                    label="Membership"
                    name="membership"
                    onChange={this.handleChange}
                    defaultToggled={customer.membership}
                    labelStyle={styles.toggleLabel}
                  />
                </div>
              </GridTile>

              <GridTile>
                {this.state.customer &&
                  customer.avatar && (
                    <Card style={styles.card}>
                      <img width={100} src={customer.avatar} />
                    </Card>
                  )}
              </GridTile>
            </GridList>
            <Divider />

            <div style={styles.buttons}>

              <Link to="/customers">
                <Button variant="contained" label="Cancel" />
              </Link>

              <Button variant="contained"
                label="Save"
                style={styles.saveButton}
                type="button"
                onClick={() => this.handleClick(event)}
                primary={true}
                disabled={!this.state.canSubmit}
              />
            </div>
            </Form>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          </Formik>
        </PageBase>
      );
    }
  }
}

CustomerFormPage.propTypes = {
  router: PropTypes.object,
  routeParams: PropTypes.object,
  customer: PropTypes.object,
  newCustomer: PropTypes.func.isRequired,
  getCustomer: PropTypes.func.isRequired,
  updateCustomer: PropTypes.func.isRequired,
  updateSuccess: PropTypes.bool.isRequired,
  addSuccess: PropTypes.bool.isRequired,
  addCustomer: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
};

function mapStateToProps(state) {
  const { customerReducer } = state;
  const {
    customer,
    isFetching,
    updateSuccess,
    addSuccess,
    errorMessage,
    isAuthenticated,
    user
  } = customerReducer;

  return {
    customer: customer || {},
    isFetching,
    addSuccess,
    updateSuccess,
    errorMessage,
    isAuthenticated,
    user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    newCustomer: () => dispatch(newCustomer()),
    getCustomer: id => dispatch(getCustomer(id)),
    updateCustomer: customer => dispatch(updateCustomer(customer)),
    addCustomer: customer => dispatch(addCustomer(customer))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerFormPage);
