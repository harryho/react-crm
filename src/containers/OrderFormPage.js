import React, { PropTypes } from 'react';
import {Link} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
// import MenuItem from 'material-ui/MenuItem';
// import TextField from 'material-ui/TextField';
// import SelectField from 'material-ui/SelectField';
// import Toggle from 'material-ui/Toggle';
// import DatePicker from 'material-ui/DatePicker';
import {grey400} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import PageBase from '../components/PageBase';

import { connect } from 'react-redux';
import {GridList, GridTile} from 'material-ui/GridList';
import {Card} from 'material-ui/Card';

import { getOrder, updateOrder, addOrder
} from '../actions/order';
import { loadCustomers} from '../actions/customer';
import {  FormsyText } from 'formsy-material-ui/lib';
import Formsy from 'formsy-react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class OrderFormPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        order: (this.props.routeParams.id?Object.assign({}, props.order):{}),
    }

    if (this.props.routeParams.id)
      this.props.getOrder(this.props.routeParams.id);

    this.props.getAllCustomers();
   
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.notifyFormError = this.notifyFormError.bind(this);
    this.disableButton = this.disableButton.bind(this);
  }


  componentWillReceiveProps(nextProps) {
    if (this.props.order && nextProps.order 
      && this.props.order.id != nextProps.order.id) {

      // Necessary to populate form when existing order is loaded directly.
      this.setState({order: Object.assign({}, nextProps.order)});
    }

    if (!this.props.addSuccess &&  nextProps.addSuccess || !this.props.updateSuccess &&  nextProps.updateSuccess ){
      this.props.router.push('/orders');
    }
  }

  handleChange(event) {
    const field = event.target.name;
    if ( event && event.target && field  ){
      let order = Object.assign({}, this.state.order);
      order[field] = event.target.value;

      this.setState({order: order});
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

    if (this.state.order.id)
      this.props.updateOrder(this.state.order);
    else 
      this.props.addOrder(this.state.order);
  }


  render(){ 
  

   const { errorMessage, customerList} = this.props;

    // if( updateSuccess || addSuccess  ){     

    //     this.props.router.push('/orders');
    // }

    
    const styles = {
        toggleDiv: {
          maxWidth: 300,
          marginTop: 0,
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
        },
           menuItem: {
      fontSize: 14
    },
    customWidth:{
      width: 250
    }
      };

    return (      

      <PageBase title="Order"
                navigation="Application / Order ">
        {/*<form>*/}
            <Formsy.Form
                      onValid={this.enableButton}
                      onInvalid={this.disableButton}
                      onValidSubmit={this.handleClick}
                      onInvalidSubmit={this.notifyFormError}>
          <GridList cellHeight={300}>
     
          <GridTile >
                <FormsyText
                    hintText="Product"
                    floatingLabelText="Product"
                    name="product"
                    onChange = {this.handleChange}
                    fullWidth={true}
                    value = {this.state.order.product?this.state.order.product:''}
                    validations={{
                    isWords: true
                    }}
                    validationErrors={{
                      isWords: 'Please provide valid product name',
                      isDefaultRequiredValue: 'This is a required field'
                    }}
                    required
                  />

                  <FormsyText
                    hintText="Price"
                    floatingLabelText="Price"
                    fullWidth={true}
                    name="price"
                    onChange = {this.handleChange}
                     validations={{
                    isNumeric: true
                   }}
                    validationErrors={{
                      isNumeric: 'Please provide valid price',
                      isDefaultRequiredValue: 'This is a required field'
                    }}
                    value = {this.state.order.price}
                    required
                  />

                  <FormsyText
                    hintText="Quantity"
                    floatingLabelText="Quantity"
                    fullWidth={true}
                    type="number"
                    name="quantity"
                    onChange = {this.handleChange}
                    value = {this.state.order.quantity}
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
           

                     <SelectField
          floatingLabelText="Customer"
          value={this.state.order.customer?this.state.order.customer.id:0}
          onChange={this.handleChange}
          style={styles.customWidth}
        >
  

          {customerList.map((customer, index) =>
            <MenuItem
            key={index}
              value={customer.id}
              style={styles.menuItem}
              primaryText={customer.firstName? customer.firstName + ' ' + customer.lastName: ''}     
              
            />
          )}


        </SelectField>

      
                  </div>
                  
                </GridTile>

                <GridTile>
                  { this.state.order && this.state.order.avatar &&
                  <Card style={styles.card}>
                    <img  width={100} src={this.state.order.avatar} />
                  </Card>
                  }
                </GridTile>

            </GridList>
          <Divider/>

          <div style={styles.buttons}>
            <Link to="/orders">
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
        {/*</form>*/}
        
      </PageBase>
    );
  }
}

OrderFormPage.propTypes = {
  getOrder: PropTypes.func.isRequired,
  updateOrder: PropTypes.func.isRequired,
  updateSuccess: PropTypes.bool.isRequired,
  addSuccess: PropTypes.bool.isRequired,
  addOrder: PropTypes.func.isRequired,
   customerList : PropTypes.array,
   getAllCustomers: PropTypes.func.isRequired
};


function mapStateToProps(state) {  
  const { customerReducer, orderReducer } = state;
  const { customerList } = customerReducer;
  const { order } = orderReducer;
  const { updateSuccess } = orderReducer;
  const { addSuccess } =  orderReducer  ;
  
  return {
    order,
    customerList,
    addSuccess,
    updateSuccess,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getOrder: id => dispatch( getOrder(id)),
    updateOrder: (order) => dispatch(updateOrder(order)),
    addOrder: (order) => dispatch(addOrder(order)),
      getAllCustomers: () => dispatch( loadCustomers())
  }
}


export default connect(mapStateToProps, mapDispatchToProps) (OrderFormPage);
