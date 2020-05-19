import React from "react";
import { Link, match } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import SaveIcon from "@material-ui/icons/Save";
import Divider from "@material-ui/core/Divider";
import PageBase from "../components/PageBase";
import Skeleton from "@material-ui/lab/Skeleton";
import { connect } from "react-redux";
import Card from "@material-ui/core/Card";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

import { getAction } from "../actions/order";

import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";

import { grey } from "@material-ui/core/colors";
import { thunkApiCall } from "../services/thunks";
import { Customer, User, Category, Product, Order } from "../types";
import { Grid } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";

import {
  ApiAction,
  GET_ORDER,
  UPDATE_ORDER,
  CREATE_ORDER,
} from "../store/types";

const grey400 = grey["400"];

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
    float: "right" as TODO,
  },
  saveButton: {
    marginLeft: 5,
  },
  card: {
    width: 120,
    maxWidth: 300,
    marginTop: 40,
    marginBottom: 5,
  },
  container: {
    marginTop: "2em",
  },
  cell: {
    padding: "1em",
  },
  fullWidth: {
    width: "100%",
  },
  productList: {
    color: "navy" as TODO,
    paddingTop: 20,
    fontWeight: "bold" as TODO,
  },
};


interface OrderFormProps {
  match: match;
  order: Order;
  getOrder: typeof thunkApiCall;
  saveOrder: typeof thunkApiCall;
  searchOrder: typeof thunkApiCall;
  // updateSuccess: boolean;
  // addSuccess: boolean;
  // errorMessage?: string;
  isFetching: boolean;
  updated: boolean;
  newOrder: typeof thunkApiCall;
  updateOrder: typeof thunkApiCall;
  getProductList: typeof thunkApiCall;
  // updateSuccess: bool.typeof thunkApiCall;
  // addSuccess: bool.typeof thunkApiCall;
  addOrder: typeof thunkApiCall;
  orderList: Order[];
  categoryList: Category[];
  productList: Product[];
  getAllOrders: typeof thunkApiCall;
  getCategoryList: typeof thunkApiCall;
  errorMessage?: string;
}

interface OrderFormState {
  open: boolean;
  order: Order;
  snackbarOpen: boolean;
  autoHideDuration: number;
}

class OrderFormPage extends React.Component<OrderFormProps, OrderFormState> {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    // this.enableButton = this.enableButton.bind(this);
    this.notifyFormError = this.notifyFormError.bind(this);
    this.onSnackBarClose = this.onSnackBarClose.bind(this);
  }

  state = {
    // isFetching: true,
    open: false,
    order: {} as Order,
    snackbarOpen: false,
    autoHideDuration: 2000,
  };

  // UNSAFE_componentWillMount() {
  //   if (this.props.routeParams && this.props.routeParams.id) {
  //     this.props.getOrder(this.props.routeParams.id);
  //     this.props.getAllOrders();
  //     this.props.getCategoryList();
  //   } else {
  //     this.props.newOrder();
  //   }
  // }

  // UNSAFE_componentWillReceiveProps(nextProps) {
  //   if (
  //     (this.props.order &&
  //       nextProps.order &&
  //       this.props.order.id != nextProps.order.id) ||
  //     this.props.order != nextProps.order
  //   ) {
  //     this.setState({ isFetching: false });
  //     this.setState({ order: Object.assign({}, nextProps.order) });
  //   }

  //   if (nextProps.productList) {
  //     this.setState({ productList: Object.assign({}, nextProps.productList) });
  //   }

  //   if (
  //     (!this.props.addSuccess && nextProps.addSuccess) ||
  //     (!this.props.updateSuccess && nextProps.updateSuccess)
  //   ) {
  //     this.props.router.push("/orders");
  //   }
  // }

  componentDidMount() {
    console.log("componentDidMount ", this.props);
    // @ts-ignore
    const orderId = this.props.match.params?.id;
    let action: ApiAction;
    if (orderId) {
      action = getAction(GET_ORDER, orderId); //  Object.assign({}, this.getAction);
      this.props.getOrder(action);
    }
  }

  // disableButton() {
  //   if (this.state.order.products <= 0) {
  //     this.setState({
  //       canSubmit: false
  //     });
  //   }
  // }

  notifyFormError(data) {
    console.error("Form error:", data);
  }

  handleClick(event, action) {
    event.preventDefault();
    console.log(event);
    if (action && action === "AddProduct") {
      // this.setState({ open: true });
    } else {
      // if (this.state.order.id) this.props.updateOrder(this.state.order);
      // else this.props.addOrder(this.state.order);
    }
  }

  onSnackBarClose() {
    this.setState({
      snackbarOpen: false,
    });
  }

  // enableButton() {
  //   this.setState({
  //     canSubmit: true
  //   });
  // }

  handleChange(event, date) {
    const field = event ? event.target.name : null;
    const { order } = this.state;

    if (order) {
      if (typeof date === "object") {
        let _order = Object.assign({}, order);
        order.shippedDate = date.toLocaleDateString();
        this.setState({ order: order });
        // this.enableButton();
      } else if (event && event.target && field) {
        let _order = Object.assign({}, order);
        _order[field] = event.target.value;
        this.setState({ order: _order });
        // this.enableButton();
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
      // if (this.state.order.products.length > 0)
      // this.enableButton();
    }
  }

  handleCancel() {
    this.setState({ open: false });
  }

  handleOk() {
    const { order } = this.state;

    order.products = order.products || [];
    // order.products.push(this.state.product);
    this.setState({ open: false });
    this.setState({ order: this.state.order });
    // this.enableButton();
  }

  handleCategoryChange(event, index, values) {
    // this.props.getProductList({
    //   categoryId: this.props.categoryList[values].id,
    // });
  }

  handleProductChange(event, index, values) {
    // this.setState({ product: this.props.productList[values] });
  }

  onSave(values: TODO) {
    console.log(this.state.order);

    const order = { ...this.state.order, ...values };
    console.log(order);
    let action: ApiAction;
    if (order.id > 0) {
      action = getAction(UPDATE_ORDER, null, order);
    } else {
      action = getAction(CREATE_ORDER, null, order);
    }
    this.props.saveOrder(action);
  }

  render() {
    const { isFetching, order } = this.props;

    // const { isFetching, order } = this.state;

    // const styles = {
    //   toggleDiv: {
    //     maxWidth: 300,
    //     marginTop: 0,
    //     marginBottom: 5
    //   },
    //   toggleLabel: {
    //     color: grey400,
    //     fontWeight: 100
    //   },
    //   buttons: {
    //     marginTop: 30,
    //     float: "right"
    //   },
    //   saveButton: {
    //     marginLeft: 5
    //   },
    //   card: {
    //     width: 120
    //   },
    //   productList: {
    //     color: "navy",
    //     paddingTop: 20,
    //     fontWeight: "bold"
    //   },
    //   productItem: {
    //     background: "lightblue",
    //     paddingLeft: 20
    //   },
    //   productDeleteIcon: {
    //     float: "right",
    //     marginTop: -30,
    //     paddingRight: 20
    //   },
    //   menuItem: {
    //     fontSize: 14
    //   },
    //   customWidth: {
    //     width: 250
    //   },
    //   dialog: {
    //     width: "20%",
    //     maxWidth: "none",
    //     minWidth: 300
    //   }
    // };

    // if (isFetching) {
    //   return <CircularProgress />;
    // } else {

    return (
      <PageBase title="Order" navigation="Application / Order ">
        {isFetching ? (
          <div>
            <Skeleton variant="text" />
            <Skeleton variant="rect" style={styles.fullWidth} height={300} />
          </div>
        ) : (
          <Formik
            initialValues={{
              ...order,
            }}
            validate={(values) => {
              const errors: Partial<Order & User> = {};
              // if (!values.firstname) {
              //   errors.firstname = "Required";
              // }
              // if (!values.email) {
              //   errors.email = "Required";
              // } else if (
              //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
              // ) {
              //   errors.email = "Invalid email address";
              // }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              this.onSave(values);
              setTimeout(() => {
                setSubmitting(false);
                console.log(JSON.stringify(values, null, 2));
              }, 500);
            }}
          >
                     {({ submitForm, isSubmitting }) => (
            <Form>
              <Grid container style={styles.container} spacing={3}>
                <Grid item style={styles.cell} xs={12} md={4}>
                  {/* <FormsySelect
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
                          customer.firstname
                            ? customer.firstname + " " + customer.lastname
                            : ""
                        }
                      />
                    ))}
                  </FormsySelect> */}
                </Grid>
                <Grid item style={styles.cell} xs={12} md={4}>
                  <Field
                    component={TextField}
                    hintText="Reference"
                    floatingLabelText="Reference"
                    name="reference"
                    onChange={this.handleChange}
                    fullWidth={true}
                    value={order.reference ? order.reference : ""}
                    validations={{
                      isWords: true,
                    }}
                    validationErrors={{
                      isWords: "Please provide valid reference name",
                      isDefaultRequiredValue: "This is a required field",
                    }}
                    required
                  />
                </Grid>

                <Grid item style={styles.cell} xs={12} md={4}>
                  <Field
                    component={TextField}
                    hintText="Amount"
                    floatingLabelText="Amount"
                    fullWidth={true}
                    name="price"
                    onChange={this.handleChange}
                    validations={{
                      isNumeric: true,
                    }}
                    validationErrors={{
                      isNumeric: "Please provide valid price",
                      isDefaultRequiredValue: "This is a required field",
                    }}
                    value={order.amount}
                    required
                  />
                </Grid>

                <Grid item style={styles.cell} xs={12} md={4}>
                  <Field
                    component={TextField}
                    hintText="Quantity"
                    floatingLabelText="Quantity"
                    fullWidth={true}
                    type="number"
                    name="quantity"
                    onChange={this.handleChange}
                    value={order.products ? order.products.length : 0}
                    validations={{
                      isInt: true,
                    }}
                    validationErrors={{
                      isInt: "Please provide a valid password",
                      isDefaultRequiredValue: "This is a required field",
                    }}
                    required
                  />
                </Grid>
                <Grid item style={styles.cell} xs={12} md={4}>
                  {/* <FormsyDate
                    hintText="Order Date"
                    floatingLabelText="Order Date"
                    disabled={true}
                    name="orderDate"
                    onChange={this.handleChange}
                    value={
                      order.orderDate ? new Date(order.orderDate) : new Date()
                    }
                    required
                  /> */}
                </Grid>

                <Grid item style={styles.cell} xs={12} md={4}>
                  {/* <FormsyDate
                    hintText="Shipped Date"
                    floatingLabelText="Shipped Date"
                    fullWidth={false}
                    name="shippedDate"
                    onChange={this.handleChange}
                    value={
                      order.shippedDate
                        ? new Date(order.shippedDate)
                        : new Date()
                    }
                    required
                  /> */}
                </Grid>

                <Grid item style={styles.cell} xs={12} md={4}>
                  <Field
                    component={TextField}
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
                      isWords: true,
                    }}
                    validationErrors={{
                      isWords: "Please provide valid address",
                      isDefaultRequiredValue: "This is a required field",
                    }}
                    required
                  />
                </Grid>

                <Grid item style={styles.cell} xs={12} md={4}>
                  <Field
                    component={TextField}
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
                      isWords: true,
                    }}
                    validationErrors={{
                      isWords: "Please provide valid city",
                      isDefaultRequiredValue: "This is a required field",
                    }}
                    required
                  />
                </Grid>

                <Grid item style={styles.cell} xs={12} md={4}>
                  <Field
                    component={TextField}
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
                      isWords: true,
                    }}
                    validationErrors={{
                      isWords: "Please provide valid country",
                      isDefaultRequiredValue: "This is a required field",
                    }}
                    required
                  />
                </Grid>

                <Grid item style={styles.cell} xs={12} md={4}>
                  <Field
                    component={TextField}
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
                      isWords: true,
                    }}
                    validationErrors={{
                      isWords: "Please provide valid zip code",
                      isDefaultRequiredValue: "This is a required field",
                    }}
                    required
                  />
                </Grid>
              </Grid>

              <p style={styles.productList}>Product List: </p>
              <Divider />

              {/* {order.products && (
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
                    </Grid>
                  ))}
                </GridList>
              </div>
            )} */}

              <Divider />

              <div style={styles.buttons}>
                {/* <Link to="/orders">
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
              <Button variant="contained"
                label="Add"
                style={styles.saveButton}
                type="button"
                onClick={() => this.handleClick(event, "AddProduct")}
                primary={true}
              /> */}
                <Link to="/orders">
                  <Button variant="contained">
                    {/* onClick={this.handleGoBack}> */}
                    <ArrowBackIosIcon /> Back{" "}
                  </Button>
                </Link>
                <Button
                  variant="contained"
                  style={styles.saveButton}
                  // type="button"
                  onClick={submitForm}
                  color="primary"
                  disabled={isSubmitting}
                >
                  <SaveIcon /> Save
                </Button>
              </div>
              {/* {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>} */}

              {/* <Dialog
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
                  <Button variant="contained" onClick={this.handleCancel} color="primary">
                    Cancel
                  </Button>
                  <Button variant="contained" onClick={this.handleOk} color="primary">
                    Ok
                  </Button>
                </span>
              </div>
            </Dialog> */}
            </Form>
                     )}
          </Formik>
        )}
      </PageBase>
    );
  }
}

function mapStateToProps(state) {
  // const { customerReducer, orderReducer, productReducer } = state;
  const { productList, categoryList } = state.product;
  const { customerList } = state.customer;
  const {
    order,
    isFetching,
    updateSuccess,
    addSuccess,
    isAuthenticated,
    user,
  } = state.order;

  return {
    order: order || {},
    isFetching,
    customerList,
    categoryList,
    productList,
    addSuccess,
    updateSuccess,
    isAuthenticated,
    user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    newOrder: (action) => dispatch(thunkApiCall(action)),
    getOrder: (action) => dispatch(thunkApiCall(action)),
    updateOrder: (action) => dispatch(thunkApiCall(action)),
    addOrder: (action) => dispatch(thunkApiCall(action)),
    getCategoryList: (action) => dispatch(thunkApiCall(action)),
    getProductList: (action) => dispatch(thunkApiCall(action)),
    getAllCustomers: (action) => dispatch(thunkApiCall(action)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderFormPage);
