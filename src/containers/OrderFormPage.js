import React, { PropTypes } from "react";
import { Link } from "react-router";
import RaisedButton from "material-ui/RaisedButton";
// import MenuItem from 'material-ui/MenuItem';
// import TextField from 'material-ui/TextField';
// import SelectField from 'material-ui/SelectField';
// import Toggle from 'material-ui/Toggle';
// import DatePicker from 'material-ui/DatePicker';
import Dialog from "material-ui/Dialog"; // , { DialogActions, DialogContent, DialogContentText, DialogTitle}
import { grey400 } from "material-ui/styles/colors";
import Divider from "material-ui/Divider";
import PageBase from "../components/PageBase";
import IconButton from "material-ui/IconButton";
import { connect } from "react-redux";
import { GridList, GridTile } from "material-ui/GridList";
// import {Card} from 'material-ui/Card';
import ActionDelete from "material-ui/svg-icons/action/delete";
import { getOrder, updateOrder, addOrder, newOrder } from "../actions/order";
import { loadCustomers } from "../actions/customer";
import { loadProducts, loadCategories } from "../actions/product";

import { FormsyText, FormsySelect, FormsyDate } from "formsy-material-ui/lib"; // FormsyDate
import Formsy from "formsy-react";
import MenuItem from "material-ui/MenuItem";
import CircularProgress from "material-ui/CircularProgress";
import autoBind from "react-autobind";

class OrderFormPage extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      isFetching: this.props.routeParams.id ? true : false,
      categoryId: 0,
      product: null,
      open: false,
      order: {}
    };

    // autobind(this);
    // this.handleChange = this.handleChange.bind(this);
    // this.handleClick = this.handleClick.bind(this);
    // this.handleCancel = this.handleCancel.bind(this);
    // this.handleOk = this.handleOk.bind(this);
    // this.enableButton = this.enableButton.bind(this);
    // this.notifyFormError = this.notifyFormError.bind(this);
    // this.disableButton = this.disableButton.bind(this);
    // this.removeProduct = this.removeProduct.bind(this);
    // this.handleCategoryChange = this.handleCategoryChange.bind(this);
    // this.handleProductChange = this.handleProductChange.bind(this);
  }

  componentWillMount() {
    if (this.props.routeParams && this.props.routeParams.id) {
      this.props.getOrder(this.props.routeParams.id);
      this.props.getAllCustomers();
      this.props.getCategoryList();
    } else {
      this.props.newOrder();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      (this.props.order &&
        nextProps.order &&
        this.props.order.id != nextProps.order.id) ||
      this.props.order != nextProps.order
    ) {
      this.setState({ isFetching: false });
      this.setState({ order: Object.assign({}, nextProps.order) });
    }

    if (nextProps.productList) {
      this.setState({ productList: Object.assign({}, nextProps.productList) });
    }

    if (
      (!this.props.addSuccess && nextProps.addSuccess) ||
      (!this.props.updateSuccess && nextProps.updateSuccess)
    ) {
      this.props.router.push("/orders");
    }
  }

  disableButton() {
    if (this.state.order.products <= 0) {
      this.setState({
        canSubmit: false
      });
    }
  }

  notifyFormError(data) {
    console.error("Form error:", data);
  }

  handleClick(event, action) {
    event.preventDefault();
    console.log(event);
    if (action && action === "AddProduct") {
      this.setState({ open: true });
    } else {
      if (this.state.order.id) this.props.updateOrder(this.state.order);
      else this.props.addOrder(this.state.order);
    }
  }

  enableButton() {
    this.setState({
      canSubmit: true
    });
  }

  handleChange(event, date) {
    const field = event ? event.target.name : null;
    const { order } = this.state;

    if (order) {
      if (typeof date === "object") {
        let order = Object.assign({}, order);
        order.shippedDate = date.toLocaleDateString();
        this.setState({ order: order });
        this.enableButton();
      } else if (event && event.target && field) {
        let _order = Object.assign({}, order);
        _order[field] = event.target.value;
        this.setState({ order: _order });
        this.enableButton();
      }
    }
  }

  removeProduct(product) {
    if (product) {
      this.state.order.products.splice(
        this.state.order.products.indexOf(product),
        1
      );
      this.setState({ order: this.state.order });
      if (this.state.order.products.length > 0) this.enableButton();
    }
  }

  handleCancel() {
    this.setState({ open: false });
  }

  handleOk() {
    const { order } = this.state;

    order.products = order.products || [];
    order.products.push(this.state.product);
    this.setState({ open: false });
    this.setState({ order: this.state.order });
    this.enableButton();
  }

  handleCategoryChange(event, index, values) {
    this.props.getProductList({
      categoryId: this.props.categoryList[values].id
    });
  }

  handleProductChange(event, index, values) {
    this.setState({ product: this.props.productList[values] });
  }

  render() {
    const {
      errorMessage,
      customerList,
      categoryList,
      productList
    } = this.props;

    const { isFetching, order } = this.state;

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
        float: "right"
      },
      saveButton: {
        marginLeft: 5
      },
      card: {
        width: 120
      },
      productList: {
        color: "navy",
        paddingTop: 20,
        fontWeight: "bold"
      },
      productItem: {
        background: "lightblue",
        paddingLeft: 20
      },
      productDeleteIcon: {
        float: "right",
        marginTop: -30,
        paddingRight: 20
      },
      menuItem: {
        fontSize: 14
      },
      customWidth: {
        width: 250
      },
      dialog: {
        width: "20%",
        maxWidth: "none",
        minWidth: 300
      }
    };

    if (isFetching) {
      return <CircularProgress />;
    } else {
      return (
        <PageBase title="Order" navigation="Application / Order ">
          <Formsy.Form
            onValid={this.enableButton}
            onInvalid={this.disableButton}
            onValidSubmit={this.handleClick}
            onInvalidSubmit={this.notifyFormError}
          >
            <GridList cols={3} cellHeight={60}>
              <GridTile>
                <FormsySelect
                  floatingLabelText="Customer"
                  value={order.customer ? order.customer.id : 0}
                  onChange={this.handleChange}
                  style={styles.customWidth}
                  name="customerId"
                >
                  {customerList.map((customer, index) => (
                    <MenuItem
                      key={index}
                      name="customerId"
                      value={customer.id}
                      style={styles.menuItem}
                      primaryText={
                        customer.firstName
                          ? customer.firstName + " " + customer.lastName
                          : ""
                      }
                    />
                  ))}
                </FormsySelect>
              </GridTile>
              <GridTile>
                <FormsyText
                  hintText="Reference"
                  floatingLabelText="Reference"
                  name="reference"
                  onChange={this.handleChange}
                  fullWidth={true}
                  value={order.reference ? order.reference : ""}
                  validations={{
                    isWords: true
                  }}
                  validationErrors={{
                    isWords: "Please provide valid reference name",
                    isDefaultRequiredValue: "This is a required field"
                  }}
                  required
                />
              </GridTile>

              <GridTile>
                <FormsyText
                  hintText="Amount"
                  floatingLabelText="Amount"
                  fullWidth={true}
                  name="price"
                  onChange={this.handleChange}
                  validations={{
                    isNumeric: true
                  }}
                  validationErrors={{
                    isNumeric: "Please provide valid price",
                    isDefaultRequiredValue: "This is a required field"
                  }}
                  value={order.amount}
                  required
                />
              </GridTile>

              <GridTile>
                <FormsyText
                  hintText="Quantity"
                  floatingLabelText="Quantity"
                  fullWidth={true}
                  type="number"
                  name="quantity"
                  onChange={this.handleChange}
                  value={order.products ? order.products.length : 0}
                  validations={{
                    isInt: true
                  }}
                  validationErrors={{
                    isInt: "Please provide a valid password",
                    isDefaultRequiredValue: "This is a required field"
                  }}
                  required
                />
              </GridTile>
              <GridTile>
                <FormsyDate
                  hintText="Order Date"
                  floatingLabelText="Order Date"
                  disabled={true}
                  name="orderDate"
                  onChange={this.handleChange}
                  value={
                    order.orderDate ? new Date(order.orderDate) : new Date()
                  }
                  required
                />
              </GridTile>

              <GridTile>
                <FormsyDate
                  hintText="Shipped Date"
                  floatingLabelText="Shipped Date"
                  fullWidth={false}
                  name="shippedDate"
                  onChange={this.handleChange}
                  value={
                    order.shippedDate ? new Date(order.shippedDate) : new Date()
                  }
                  required
                />
              </GridTile>

              <GridTile>
                <FormsyText
                  hintText="Address"
                  floatingLabelText="Address"
                  name="shipAddress.address"
                  onChange={this.handleChange}
                  fullWidth={true}
                  value={
                    order.shipAddress && order.shipAddress.address
                      ? order.shipAddress.address
                      : ""
                  }
                  validations={{
                    isWords: true
                  }}
                  validationErrors={{
                    isWords: "Please provide valid address",
                    isDefaultRequiredValue: "This is a required field"
                  }}
                  required
                />
              </GridTile>

              <GridTile>
                <FormsyText
                  hintText="City"
                  floatingLabelText="City"
                  name="reference"
                  onChange={this.handleChange}
                  fullWidth={true}
                  value={
                    order.shipAddress && order.shipAddress.city
                      ? order.shipAddress.city
                      : ""
                  }
                  validations={{
                    isWords: true
                  }}
                  validationErrors={{
                    isWords: "Please provide valid city",
                    isDefaultRequiredValue: "This is a required field"
                  }}
                  required
                />
              </GridTile>

              <GridTile>
                <FormsyText
                  hintText="Country"
                  floatingLabelText="Country"
                  name="reference"
                  onChange={this.handleChange}
                  fullWidth={true}
                  value={
                    order.shipAddress && order.shipAddress.country
                      ? order.shipAddress.country
                      : ""
                  }
                  validations={{
                    isWords: true
                  }}
                  validationErrors={{
                    isWords: "Please provide valid country",
                    isDefaultRequiredValue: "This is a required field"
                  }}
                  required
                />
              </GridTile>

              <GridTile>
                <FormsyText
                  hintText="Zip Code"
                  floatingLabelText="Zip Code"
                  name="reference"
                  onChange={this.handleChange}
                  fullWidth={true}
                  value={
                    order.shipAddress && order.shipAddress.zipcode
                      ? order.shipAddress.zipcode
                      : ""
                  }
                  validations={{
                    isWords: true
                  }}
                  validationErrors={{
                    isWords: "Please provide valid zip code",
                    isDefaultRequiredValue: "This is a required field"
                  }}
                  required
                />
              </GridTile>
            </GridList>

            <p style={styles.productList}>Product List: </p>
            <Divider />

            {order.products && (
              <div>
                <GridList cols={1} cellHeight={60}>
                  {order.products.map((product, index) => (
                    <GridTile key={index}>
                      <div style={styles.productItem}>
                        <span>
                          {product.productName}
                          <p>
                            {" "}
                            Price: AUD ${product.unitPrice}
                            <IconButton
                              style={styles.productDeleteIcon}
                              onClick={() => this.removeProduct(product)}
                            >
                              <ActionDelete />
                            </IconButton>
                          </p>
                        </span>
                      </div>
                    </GridTile>
                  ))}
                </GridList>
              </div>
            )}

            <Divider />

            <div style={styles.buttons}>
              <Link to="/orders">
                <RaisedButton label="Cancel" />
              </Link>

              <RaisedButton
                label="Save"
                style={styles.saveButton}
                type="button"
                onClick={() => this.handleClick(event)}
                primary={true}
                disabled={!this.state.canSubmit}
              />
              <RaisedButton
                label="Add"
                style={styles.saveButton}
                type="button"
                onClick={() => this.handleClick(event, "AddProduct")}
                primary={true}
              />
            </div>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

            <Dialog
              title="Add Product"
              open={this.state.open}
              contentStyle={styles.dialog}
              ignoreBackdropClick
              ignoreEscapeKeyUp
              maxWidth="xs"
            >
              <div>
                <FormsySelect
                  floatingLabelText="Categories"
                  // onChange={this.handleChange}
                  style={styles.customWidth}
                  name="categoryId"
                  onChange={this.handleCategoryChange}
                >
                  {categoryList.map((category, index) => (
                    <MenuItem
                      key={index}
                      value={category.id}
                      style={styles.menuItem}
                      primaryText={category.categoryName}
                    />
                  ))}
                </FormsySelect>

                <FormsySelect
                  floatingLabelText="Products"
                  // onChange={this.handleChange}
                  style={styles.customWidth}
                  name="categoryId"
                  onChange={this.handleProductChange}
                >
                  {productList.map((product, index) => (
                    <MenuItem
                      key={index}
                      value={product.id}
                      style={styles.menuItem}
                      primaryText={product.productName}
                    />
                  ))}
                </FormsySelect>

                <span>
                  <RaisedButton onClick={this.handleCancel} color="primary">
                    Cancel
                  </RaisedButton>
                  <RaisedButton onClick={this.handleOk} color="primary">
                    Ok
                  </RaisedButton>
                </span>
              </div>
            </Dialog>
          </Formsy.Form>
        </PageBase>
      );
    }
  }
}

OrderFormPage.propTypes = {
  router: PropTypes.object,
  routeParams: PropTypes.object,
  order: PropTypes.object,
  newOrder: PropTypes.func.isRequired,
  getOrder: PropTypes.func.isRequired,
  updateOrder: PropTypes.func.isRequired,
  getProductList: PropTypes.func.isRequired,
  updateSuccess: PropTypes.bool.isRequired,
  addSuccess: PropTypes.bool.isRequired,
  addOrder: PropTypes.func.isRequired,
  customerList: PropTypes.array,
  categoryList: PropTypes.array,
  productList: PropTypes.array,
  getAllCustomers: PropTypes.func.isRequired,
  getCategoryList: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
};

function mapStateToProps(state) {
  const { customerReducer, orderReducer, productReducer } = state;
  const { productList, categoryList } = productReducer;
  const { customerList } = customerReducer;
  const {
    order,
    isFetching,
    updateSuccess,
    addSuccess,
    isAuthenticated,
    user
  } = orderReducer;

  return {
    order: order || {},
    isFetching,
    customerList,
    categoryList,
    productList,
    addSuccess,
    updateSuccess,
    isAuthenticated,
    user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    newOrder: () => dispatch(newOrder()),
    getOrder: id => dispatch(getOrder(id)),
    updateOrder: order => dispatch(updateOrder(order)),
    addOrder: order => dispatch(addOrder(order)),
    getCategoryList: () => dispatch(loadCategories()),
    getProductList: filters => dispatch(loadProducts(filters)),
    getAllCustomers: () => dispatch(loadCustomers())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderFormPage);
