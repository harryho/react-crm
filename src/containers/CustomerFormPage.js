import React, { PropTypes } from 'react';
import {Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';
// import DatePicker from 'material-ui/DatePicker';
import {grey400} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import PageBase from '../components/PageBase';

import { connect } from 'react-redux';
import {GridList, GridTile} from 'material-ui/GridList';
import {Card} from 'material-ui/Card';

import { getCustomer, updateCustomer, addCustomer
} from '../actions/customer';
import {  FormsyText } from 'formsy-material-ui/lib';
import Formsy from 'formsy-react';

class CustomerFormPage extends React.Component {

  constructor(props) {
    super(props);



    this.state = {    
    customer: (props.routeParams.id?Object.assign({}, props.customer):{}),
    }

    if (this.props.routeParams.id)
      this.props.getCustomer(this.props.routeParams.id);

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.notifyFormError = this.notifyFormError.bind(this);
    this.disableButton = this.disableButton.bind(this);
  }

  componentWillReceiveProps(nextProps) {
  

    if (this.props.customer &&  nextProps.customer
        &&this.props.customer.id != nextProps.customer.id) {
      // Necessary to populate form when existing customer is loaded directly.
      this.setState({customer: Object.assign({}, nextProps.customer)});
     
    }

    if (!this.props.addSuccess &&  nextProps.addSuccess || !this.props.updateSuccess &&  nextProps.updateSuccess ){
      this.props.router.push('/customers');
    }
  }

  handleChange(event) {
    const field = event.target.name;
    if ( event && event.target && field  ){
      let customer = Object.assign({}, this.state.customer);
      customer[field] = event.target.value;

      this.setState({customer: customer});
    }
  }

    enableButton() {
    this.setState({
      canSubmit: true,
    });
  }

  disableButton() {
    this.setState({
      canSubmit: false,
    });
  }

  
  notifyFormError(data) {
    console.error('Form error:', data);
  }


  handleClick (event) {
    event.preventDefault();    
    if (this.state.customer.id)
      this.props.updateCustomer(this.state.customer);
    else 
      this.props.addCustomer(this.state.customer);
  }


  render(){ 
  

   const { errorMessage, updateSuccess, addSuccess } = this.props;

    
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
          float: 'right'
        },
        saveButton: {
          marginLeft: 5
        },
        card: {
          width: 120
        }
      };

    return (      

      <PageBase title="Customer"
                navigation="Application / Customer ">
            <Formsy.Form
                      onValid={this.enableButton}
                      onInvalid={this.disableButton}
                      onValidSubmit={this.handleClick}
                      onInvalidSubmit={this.notifyFormError}>
          <GridList cellHeight={300}>
     
          <GridTile >
                <FormsyText
                    hintText="First Name"
                    floatingLabelText="First Name"
                    name="firstName"
                    onChange = {this.handleChange}
                    fullWidth={true}
                    value = {this.state.customer.firstName?this.state.customer.firstName:''}
                    validations={{
                    isWords: true
                    }}
                    validationErrors={{
                      isWords: 'Please provide valid first name',
                      isDefaultRequiredValue: 'This is a required field'
                    }}
                    required
                  />

                  <FormsyText
                    hintText="Last Name"
                    floatingLabelText="Last Name"
                    fullWidth={true}
                    name="lastName"
                    onChange = {this.handleChange}
                     validations={{
                    isWords: true
                   }}
                    validationErrors={{
                      isWords: 'Please provide valid first name',
                      isDefaultRequiredValue: 'This is a required field'
                    }}
                    value = {this.state.customer.lastName?this.state.customer.lastName:''}
                    required
                  />

                  <FormsyText
                    hintText="Age"
                    floatingLabelText="Age"
                    fullWidth={true}
                    type="number"
                    name="age"
                    onChange = {this.handleChange}
                    value = {this.state.customer.age}
                    validations={{
                    isInt: true
                    }}
                    validationErrors={{
                    isInt: 'Please provide a valid password',
                    isDefaultRequiredValue: 'This is a required field'
                  }}
                    required
                  />

                  <div style={styles.toggleDiv}>
                    <Toggle
                      label="Status"
                      name="isActive"
                      onChange = {this.handleChange}
                      defaultToggled={this.state.customer.isActive}
                      labelStyle={styles.toggleLabel}
                    />
                  </div>
                  
                </GridTile>

                <GridTile>
                  { this.state.customer && this.state.customer.avatar &&
                  <Card style={styles.card}>
                    <img  width={100} src={this.state.customer.avatar} />
                  </Card>
                  }
                </GridTile>

            </GridList>
          <Divider/>

          <div style={styles.buttons}>
            <Link to="/customers">
              <RaisedButton label="Cancel"/>
            </Link>

            <RaisedButton label="Save"
                          style={styles.saveButton}
                          type="button"
                            onClick={() => this.handleClick(event)}
                          primary={true}
                                      disabled={!this.state.canSubmit}
                          />
          </div>
            {errorMessage &&
            <p style={{color:'red'}}>{errorMessage}</p>}

            
        </Formsy.Form>
        
      </PageBase>
    );
  }
}

CustomerFormPage.propTypes = {
  getCustomer: PropTypes.func.isRequired,
  updateCustomer: PropTypes.func.isRequired,
  updateSuccess: PropTypes.bool.isRequired,
  addSuccess: PropTypes.bool.isRequired,
  addCustomer: PropTypes.func.isRequired,
  updateError: PropTypes.string,
};


function mapStateToProps(state) {  
  const { customerReducer} = state;
  const { customer } = customerReducer;
  const { updateError , updateSuccess} = customerReducer;
  const { addSuccess } =  customerReducer  ;
  
  return {
    customer,
    addSuccess,
    updateSuccess,
    updateError
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCustomer: id => dispatch( getCustomer(id)),
    updateCustomer: (customer) => dispatch(updateCustomer(customer)),
    addCustomer: (customer) => dispatch(addCustomer(customer))
  }
}


export default connect(mapStateToProps, mapDispatchToProps) (CustomerFormPage);
