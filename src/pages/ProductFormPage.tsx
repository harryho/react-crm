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
import { getAction } from "../actions/product";

import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";

import { grey } from "@material-ui/core/colors";
import { thunkApiCall } from "../services/thunks";
import { Customer, User, Category } from "../types";
import { LinearProgress, Grid } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import {
  GET_PRODUCT,
  ApiAction,
  UPDATE_PRODUCT,
  CREATE_PRODUCT,
} from "../store/types";
import Alert from "@material-ui/lab/Alert";

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
};

interface CustomerFormProps {
  // router: object;
  match: match;
  product: Customer;
  getCustomer: typeof thunkApiCall;
  saveCustomer: typeof thunkApiCall;
  searchCustomer: typeof thunkApiCall;
  newProduct: typeof thunkApiCall,
  getProduct: typeof thunkApiCall,
  updateProduct: typeof thunkApiCall,
  addProduct: typeof thunkApiCall,
  categoryList: Category[],
  getCategoryList: typeof thunkApiCall,  
  addSuccess: boolean;
  errorMessage?: string;
  isFetching: boolean;
  updated: boolean;
}

interface CustomerFormState {
  product: Customer;
  snackbarOpen: boolean;
  autoHideDuration: number;
}


class ProductFormPage extends React.Component<
CustomerFormProps,
CustomerFormState
> {
  constructor(props) {
    super(props);
    // autoBind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    // this.enableButton = this.enableButton.bind(this);
    this.notifyFormError = this.notifyFormError.bind(this);
    this.onSnackBarClose = this.onSnackBarClose.bind(this);
  }

  state = {
    // isFetching: true,
    product: {} as Customer,
    snackbarOpen: false,
    autoHideDuration: 2000,
  }

  UNSAFE_componentWillMount() {

    // if (this.props.routeParams && this.props.routeParams.id) {
    //   this.props.getProduct(this.props.routeParams.id);
    //   this.props.getCategoryList();
    // } else {
    //   this.props.newProduct();
    // }
  }

  // UNSAFE_componentWillReceiveProps(nextProps) {
  //   if (
  //     this.props.product &&
  //     nextProps.product &&
  //     this.props.product.id != nextProps.product.id
  //   ) {
  //     this.setState({ isFetching: false });
  //     this.setState({ product: Object.assign({}, nextProps.product) });
  //   }

  //   if (
  //     (!this.props.addSuccess && nextProps.addSuccess) ||
  //     (!this.props.updateSuccess && nextProps.updateSuccess)
  //   ) {
  //     this.props.router.push("/products");
  //   }
  // }



  handleChange(event) {
    const field = event.target.name;
    if (event && event.target && field) {
      const product = Object.assign({}, this.state.product);
      product[field] = event.target.value;

      this.setState({ product: product });
    }
  }

  // enableButton() {
  //   this.setState({
  //     canSubmit: true
  //   });
  // }

  // disableButton() {
  //   this.setState({
  //     canSubmit: false
  //   });
  // }

  notifyFormError(data) {
    console.error("Form error:", data);
  }

  handleClick(event) {
    event.preventDefault();

    // if (this.state.product.id) this.props.updateProduct(this.state.product);
    // else this.props.addProduct(this.state.product);
  }

  onSnackBarClose() {
    this.setState({
      snackbarOpen: false,
    });
  }

  onSave(values: TODO) {
    console.log(this.state.product);

    const product = { ...this.state.product, ...values };
    console.log(product);
    let action: ApiAction;
    if (product.id > 0) {
      action = getAction(UPDATE_PRODUCT, null, product);
    } else {
      action = getAction(CREATE_PRODUCT, null, product);
    }
    this.props.saveCustomer(action);
  }

  render() {
    const { errorMessage, categoryList, product,isFetching } = this.props;
    // const { isFetching,  } = this.state;

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
    //   menuItem: {
    //     fontSize: 14
    //   },
    //   customWidth: {
    //     width: 250
    //   }
    // };
    // if (isFetching) {
    //   return <CircularProgress />;
    // } else {


      return (
        <PageBase title="Product" navigation="Application / Product ">
           {isFetching ? (
          <div>
            <Skeleton variant="text" />
            <Skeleton variant="rect" style={styles.fullWidth} height={300} />
          </div>
        ) : (
         <Formik
         initialValues={{
          ...product,
        }}
        validate={(values) => {
          const errors: Partial<Customer & User> = {};
          if (!values.firstname) {
            errors.firstname = "Required";
          }
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
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
           <Form
          >
          <Grid container style={styles.container} spacing={3}>
              <Grid item style={styles.cell} xs={12} md={4}>
                {/* <FormsySelect
                  floatingLabelText="Categories"
                  value={product.category ? product.category.id : 0}
                  onChange={this.handleChange}
                  style={styles.customWidth}
                  name="categoryId"
                >
                  {categoryList.map((category, index) => (
                    <MenuItem
                      key={index}
                      value={category.id}
                      style={styles.menuItem}
                      primaryText={category.categoryName}
                    />
                  ))}
                </FormsySelect> */}
              </Grid>
              <Grid item style={styles.cell} xs={12} md={4}>
                <Field   component={TextField}
                  hintText="Product"
                  floatingLabelText="Product"
                  name="product"
                  onChange={this.handleChange}
                  fullWidth={true}
                  value={product.productName ? product.productName : ""}
                  validations={{
                    isWords: true
                  }}
                  validationErrors={{
                    isWords: "Please provide valid product name",
                    isDefaultRequiredValue: "This is a required field"
                  }}
                  required
                />
              </Grid>

              <Grid item style={styles.cell} xs={12} md={4}>
                <Field   component={TextField}
                  hintText="Price"
                  floatingLabelText="Price"
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
                  value={product.unitPrice}
                  required
                />
              </Grid>
              <Grid item style={styles.cell} xs={12} md={4}>
                <Field   component={TextField}
                  hintText="Quantity"
                  floatingLabelText="Quantity"
                  fullWidth={true}
                  type="number"
                  name="quantity"
                  onChange={this.handleChange}
                  value={product.unitInStock}
                  validations={{
                    isInt: true
                  }}
                  validationErrors={{
                    isInt: "Please provide a valid password",
                    isDefaultRequiredValue: "This is a required field"
                  }}
                  required
                />
              </Grid>

              <Grid item style={styles.cell} xs={12} md={4}>
                {product &&
                  product.avatar && (
                    <Card style={styles.card}>
                      <img width={100} src={product.avatar} />
                    </Card>
                  )}
              </Grid>
            </Grid>
            <Divider />

            <div style={styles.buttons}>
            <Link to="/customers">
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
              {/* <Link to="/products">
                <Button variant="contained" label="Cancel" />
              </Link>

              <Button variant="contained"
                label="Save"
                style={styles.saveButton}
                type="button"
                onClick={() => this.handleClick(event)}
                primary={true}
                disabled={!this.state.canSubmit}
              /> */}
            </div>
            {/* {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>} */}
            </Form>
)}
         </Formik>
        )}
        </PageBase>
      );
    }
  }


ProductFormPage.propTypes = {
  router: PropTypes.object,
  routeParams: PropTypes.object,
  product: PropTypes.object,
  newProduct: typeof thunkApiCall,
  getProduct: typeof thunkApiCall,
  updateProduct: typeof thunkApiCall,
  updateSuccess: PropTypes.bool.isRequired,
  addSuccess: PropTypes.bool.isRequired,
  addProduct: typeof thunkApiCall,
  categoryList: PropTypes.array,
  getCategoryList: typeof thunkApiCall,
  errorMessage: PropTypes.string
};

function mapStateToProps(state) {
  const { productReducer } = state;
  const {
    product,
    isFetching,
    categoryList,
    updateSuccess,
    addSuccess,
    isAuthenticated,
    user
  } = productReducer;

  return {
    product: product || {},
    isFetching,
    categoryList,
    addSuccess,
    updateSuccess,
    isAuthenticated,
    user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    newProduct: () => dispatch(newProduct()),
    getProduct: id => dispatch(getProduct(id)),
    updateProduct: product => dispatch(updateProduct(product)),
    addProduct: product => dispatch(addProduct(product)),
    getCategoryList: () => dispatch(loadCategories())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductFormPage);
