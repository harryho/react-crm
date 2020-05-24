import React from "react";
import { Link, match } from "react-router-dom";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import Divider from "@material-ui/core/Divider";
import PageBase from "../components/PageBase";
import { connect } from "react-redux";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ContentCreate from "@material-ui/icons/Create";
import ActionDelete from "@material-ui/icons/Delete";
import { getAction } from "../actions/order";

import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";

import { thunkApiCall, thunkApiQCall } from "../services/thunks";
import { User, Category, Product, Order } from "../types";
import {
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Select,
  Dialog,
  MenuItem,
  DialogTitle,
  DialogActions,
  DialogContent,
  LinearProgress,
} from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";

import {
  ApiAction,
  UPDATE_ORDER,
  CREATE_ORDER,
  EDIT_ORDER,
  QActions,
} from "../store/types";
import Alert from "@material-ui/lab/Alert";
import SkeletonForm from "../components/SkeletonForm";

import { formPageStyles } from "../styles";

const styles = formPageStyles;

interface OrderFormProps {
  match: match;
  order: Order;
  getOrder: typeof thunkApiQCall;
  saveOrder: typeof thunkApiCall;
  isFetching: boolean;
  updated: boolean;
  categoryList: Category[];
  productList: Product[];
  errorMessage?: string;
}

interface OrderFormState {
  open: boolean;
  order: Order;
  snackbarOpen: boolean;
  autoHideDuration: number;
  productId: number;
  dialogText: string; 
  productList: Product[];
  product: Product;
}

class OrderFormPage extends React.Component<OrderFormProps, OrderFormState> {
  constructor(props) {
    super(props);
    this.onSnackBarClose = this.onSnackBarClose.bind(this);
    this.removeProduct = this.removeProduct.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.onAddProduct = this.onAddProduct.bind(this);
    this.onSelectProduct = this.onSelectProduct.bind(this);
    this.onSave = this.onSave.bind(this);
    this.addProduct = this.addProduct.bind(this);
  }

  state = {
    isFetching: true,
    open: false,
    order: {} as Order,
    snackbarOpen: false,
    autoHideDuration: 2000,
    productId: null,
    productList: [],
    dialogText: "Are you sure to do this?",
    product: {} as Product,
  };

  componentDidMount() {
    // @ts-ignore
    const orderId = this.props.match.params?.id;
    let action: QActions;
    if (orderId) {
      action = getAction(EDIT_ORDER, orderId) as QActions;
      this.props.getOrder(action);
    }
  }

  onSnackBarClose() {
    this.setState({
      snackbarOpen: false,
    });
  }

  /* eslint-disable */
  componentDidUpdate(prevProps) {
    // reset page if items array has changed
    if (this.props.order !== prevProps.order) {
      this.setState({ order: this.props.order });
    }
    if (
      this.props.updated !== prevProps.updated &&
      this.props.updated === true
    ) {
      this.setState({ snackbarOpen: true });
    }
  }

  removeProduct(product) {
    const { order } = this.state;
    if (order && order.products && order.products.length) {
      this.state.order.products.splice(
        this.state.order.products.indexOf(product),
        1
      );
      this.setState({ order: this.state.order });
    }
  }

  onAddProduct() {
    const { order, product } = this.state;
    if (!order.products) {
      order.products = [];
    }
    if (product && product.id) {
      order.products.push(product);
      this.setState({
        order: this.state.order,
        product: {} as Product,
        open: false,
      });
    }
  }

  handleCancel() {
    this.setState({ open: false });
  }

  addProduct() {
    this.setState({ open: true });
  }

  onDelete(id) {
    if (id) {
      this.handleOpen(id);
    }
  }

  handleOpen(id) {
    this.setState({ dialogText: "Are you sure to delete this data?" });
    this.setState({ open: true });
    this.setState({ productId: id });
  }

  handleCategoryChange(event, index, values) {
  }

  onSelectProduct(event: React.ChangeEvent<{ value: TODO }>) {
    const productId = event.target.value;

    this.setState({ product: this.props.productList[productId] });
  }

  onSave(values: TODO) {
    const order = { ...this.state.order, ...values };

    let action: ApiAction;
    if (order.id > 0) {
      action = getAction(UPDATE_ORDER, null, order) as ApiAction;
    } else {
      action = getAction(CREATE_ORDER, null, order) as ApiAction;
    }
    this.props.saveOrder(action);
  }

  render() {
    const { isFetching, order, categoryList, productList } = this.props;

    return (
      <PageBase title="Order" navigation="Application / Order ">
        {isFetching ? (
          <div>
            <SkeletonForm withList={true} />
          </div>
        ) : (
          <Formik
            initialValues={{
              ...order,
            }}
            validate={(values) => {
              const errors: Partial<Order & User> = {};
              if (!values.reference) {
                errors.reference = "Required";
              }
              if (!values.orderDate) {
                errors.orderDate = "Required";
              }

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
                    <Field
                      variant="outlined"
                      component={TextField}
                      placeholder="Customer"
                      label="Customer"
                      name="customer.firstname"
                      disabled
                      fullWidth={true}
                      required
                    />
                  </Grid>
                  <Grid item style={styles.cell} xs={12} md={4}>
                    <Field
                      variant="outlined"
                      component={TextField}
                      placeholder="Reference"
                      label="Reference Number"
                      name="reference"
                      fullWidth={true}
                      required
                    />
                  </Grid>

                  <Grid item style={styles.cell} xs={12} md={4}>
                    <Field
                      variant="outlined"
                      component={TextField}
                      placeholder="Amount"
                      label="Amount"
                      fullWidth={true}
                      name="price"
                      required
                    />
                  </Grid>

                  <Grid item style={styles.cell} xs={12} md={4}>
                    <Field
                      variant="outlined"
                      component={TextField}
                      placeholder="Quantity"
                      label="Quantity"
                      fullWidth={true}
                      type="number"
                      name="products.length"
                      required
                      disabled
                    />
                  </Grid>
                  <Grid item style={styles.cell} xs={12} md={4}>
                    <Field
                      variant="outlined"
                      component={TextField}
                      id="orderDate"
                      placeholder="Order Date"
                      label="Order Date"
                      type="date"
                      name="orderDate"
                      style={styles.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>

                  <Grid item style={styles.cell} xs={12} md={4}>
                    <Field
                      variant="outlined"
                      component={TextField}
                      id="shippedDate"
                      placeholder="Shipped Date"
                      label="Shipped Date"
                      type="date"
                      name="shippedDate"
                      style={styles.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>

                  <Grid item style={styles.cell} xs={12} md={4}>
                    <Field
                      variant="outlined"
                      component={TextField}
                      placeholder="Address"
                      label="Address"
                      name="shipAddress.address"
                      fullWidth={true}
                      required
                    />
                  </Grid>

                  <Grid item style={styles.cell} xs={12} md={4}>
                    <Field
                      variant="outlined"
                      component={TextField}
                      placeholder="City"
                      label="City"
                      name="shipAddress.city"
                      fullWidth={true}
                      required
                    />
                  </Grid>

                  <Grid item style={styles.cell} xs={12} md={4}>
                    <Field
                      variant="outlined"
                      component={TextField}
                      placeholder="Country"
                      label="Country"
                      name="shipAddress.country"
                      fullWidth={true}
                      required
                    />
                  </Grid>

                  <Grid item style={styles.cell} xs={12} md={4}>
                    <Field
                      variant="outlined"
                      component={TextField}
                      placeholder="Zip Code"
                      label="Zip Code"
                      name="shipAddress.zipcode"
                      fullWidth={true}
                      value={
                        order.shipAddress && order.shipAddress.zipcode
                          ? order.shipAddress.zipcode
                          : ""
                      }
                      required
                    />
                  </Grid>
                </Grid>

                <p style={styles.productList}>Product List: </p>
                <Divider />

                {order.products && (
                  <div>
                    <List dense={false}>
                      {order.products.map((product, index) => (
                        <ListItem key={index}>
                          <ListItemText
                            primary={product.name}
                            secondary={`Price: $ ${product.unitPrice}`}
                          />
                          <IconButton
                            onClick={() => this.removeProduct(product)}
                          >
                            <ActionDelete />
                          </IconButton>
                        </ListItem>
                      ))}
                    </List>
                  </div>
                )}

                <Divider />
                {isSubmitting && <LinearProgress />}
                <div style={styles.buttons}>
                  <Link to="/orders">
                    <Button variant="contained">
                      <ArrowBackIosIcon /> Back{" "}
                    </Button>
                  </Link>
                  <Button
                    variant="contained"
                    style={styles.saveButton}
                    onClick={submitForm}
                    color="primary"
                    disabled={isSubmitting}
                  >
                    <SaveIcon /> Save
                  </Button>
                  <Button
                    variant="contained"
                    style={styles.saveButton}
                    onClick={this.addProduct}
                    color="secondary"
                  >
                    <ContentCreate /> Add
                  </Button>
                </div>

                <React.Fragment>
                  <Dialog
                    title="Add Product"
                    open={this.state.open}
                    maxWidth="xs"
                    fullWidth
                  >
                    <DialogTitle key="alert-dialog-title">
                      {"Information"}
                    </DialogTitle>
                    <DialogContent
                      key="alert-dialog-content"
                      style={{ display: "inline-flex" }}
                    >
                      <Select
                        style={{ width: 200, marginRight: 10 }}
                        label="Categories"
                        name="categoryId"
                      >
                        {categoryList.map((category, index) => (
                          <MenuItem key={index} value={category.id}>
                            {category.name}
                          </MenuItem>
                        ))}
                      </Select>

                      <Select
                        style={{ width: 200 }}
                        label="Products"
                        name="categoryId"
                        onChange={this.onSelectProduct}
                      >
                        {productList.map((product, index) => (
                          <MenuItem key={index} value={index}>
                            {product.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </DialogContent>
                    <DialogActions key="alert-dialog-action">
                      <Button
                        variant="contained"
                        onClick={this.handleCancel}
                        color="primary"
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        onClick={this.onAddProduct}
                        color="primary"
                      >
                        Ok
                      </Button>
                    </DialogActions>
                  </Dialog>
                </React.Fragment>
                <Snackbar
                  open={this.state.snackbarOpen}
                  autoHideDuration={this.state.autoHideDuration}
                  onClose={this.onSnackBarClose}
                >
                  <Alert onClose={this.onSnackBarClose} severity="success">
                    The operation completed successfully !
                  </Alert>
                </Snackbar>
              </Form>
            )}
          </Formik>
        )}
      </PageBase>
    );
  }
}

function mapStateToProps(state) {
  const {
    order,
    isFetching,
    productList,
    categoryList,
    updated,
  } = state.order;

  return {
    order,
    isFetching,
    categoryList,
    productList,
    updated,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getOrder: (action) => dispatch(thunkApiQCall(action)),
    saveOrder: (action) => dispatch(thunkApiCall(action)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderFormPage);
