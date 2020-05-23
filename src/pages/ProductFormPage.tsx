import React from 'react';
import { Link, match } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import SaveIcon from '@material-ui/icons/Save';
import Divider from '@material-ui/core/Divider';
import PageBase from '../components/PageBase';
import Skeleton from '@material-ui/lab/Skeleton';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { getAction } from '../actions/product';

import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';

import { grey } from '@material-ui/core/colors';
import { thunkApiCall, thunkApiQCall } from '../services/thunks';
import { Product, User, Category } from '../types';
import { LinearProgress, Grid, Select, MenuItem } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import { GET_PRODUCT, ApiAction, UPDATE_PRODUCT, CREATE_PRODUCT, LIST_CATEGORY, EDIT_PRODUCT, ApiQActions } from '../store/types';
import Alert from '@material-ui/lab/Alert';

const grey400 = grey['400'];

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
    maxWidth: 300,
    marginTop: 40,
    marginBottom: 5,
  },
  container: {
    marginTop: '2em',
  },
  cell: {
    padding: '1em',
  },
  fullWidth: {
    width: '100%',
  },
};

interface ProductFormProps {
  // router: object;
  match: match;
  product: Product;
  getProduct: typeof thunkApiQCall;
  saveProduct: typeof thunkApiCall;
  searchProduct: typeof thunkApiCall;
  newProduct: typeof thunkApiCall;
  updateProduct: typeof thunkApiCall;
  addProduct: typeof thunkApiCall;
  categoryList: Category[];
  getCategoryList: typeof thunkApiCall;
  addSuccess: boolean;
  errorMessage?: string;
  isFetching: boolean;
  deleted: boolean;
  updated: boolean;
}

interface ProductFormState {
  product: Product;
  snackbarOpen: boolean;
  autoHideDuration: number;
}

class ProductFormPage extends React.Component<ProductFormProps, ProductFormState> {
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
    product: {} as Product,
    snackbarOpen: false,
    autoHideDuration: 2000,
  };

  componentDidMount() {
    console.log('componentDidMount ', this.props);
    // @ts-ignore
    const productId = this.props.match.params?.id;
    let action: ApiQActions;
    if (productId) {
      action = getAction(EDIT_PRODUCT, productId) as ApiQActions; //  Object.assign({}, this.getAction);
      this.props.getProduct(action);
      // const action2 = getAction(LIST_CATEGORY);
      // this.props.getCategoryList(action2);
    }
  }
  componentDidUpdate(prevProps) {
    console.log('componentDidUpdate ', this.props);
    if (this.props.updated !== prevProps.updated && this.props.updated === true) {
      this.setState({ snackbarOpen: true });
    }
  }

  handleChange(event) {
    const field = event.target.name;
    if (event && event.target && field) {
      const product = Object.assign({}, this.state.product);
      product[field] = event.target.value;

      this.setState({ product: product });
    }
  }

  notifyFormError(data) {
    console.error('Form error:', data);
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
    let action: ApiAction; // | ApiQActions;
    if (product.id > 0) {
      action = getAction(UPDATE_PRODUCT, null, product) as ApiAction;
    } else {
      action = getAction(CREATE_PRODUCT, null, product) as ApiAction;
    }
    this.props.saveProduct(action);
  }

  render() {
    const { errorMessage, categoryList, product, isFetching } = this.props;

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
            validate={values => {
              const errors: Partial<Product & User> = {};
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
              // setTimeout(() => {
              //   setSubmitting(false);
              //   console.log(JSON.stringify(values, null, 2));
              // }, 500);
            }}
          >
            {({ submitForm, isSubmitting }) => (
              <Form>
                <Grid container style={styles.container} spacing={3}>
                  <Grid item style={styles.cell} xs={12} md={4}>
                    <Field
                      select
                      component={TextField}
                      as="select"
                      label="Category"
                      placeholder="Category"
                      variant="outlined"
                      fullWidth={true}
                      name="category.id"
                    >
                      {categoryList.map((category, index) => (
                        <MenuItem
                          key={index}
                          value={category.id}
                          // style={styles.menuItem}
                        >
                          {category.name}
                        </MenuItem>
                      ))}
                    </Field>
                  </Grid>
                  <Grid item style={styles.cell} xs={12} md={4}>
                    <Field
                      variant="outlined"
                      component={TextField}
                      placeholder="Product"
                      label="Product"
                      name="name"
                      onChange={this.handleChange}
                      fullWidth={true}
                      // value={product.name ? product.name : ""}
                      required
                    />
                  </Grid>

                  <Grid item style={styles.cell} xs={12} md={4}>
                    <Field
                      variant="outlined"
                      component={TextField}
                      placeholder="Price"
                      label="Price"
                      fullWidth={true}
                      name="unitPrice"
                      onChange={this.handleChange}
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
                      name="numInStock"
                      onChange={this.handleChange}
                      required
                    />
                  </Grid>

                  <Grid item style={styles.cell} xs={12} md={4}>
                    {product && product.avatar && (
                      <Card style={styles.card}>
                        <img width={100} src={product.avatar} />
                      </Card>
                    )}
                  </Grid>
                </Grid>
                <br />
                <Divider />
                {isSubmitting && <LinearProgress />}
                <br />

                <div style={styles.buttons}>
                  <Link to="/products">
                    <Button variant="contained">
                      {/* onClick={this.handleGoBack}> */}
                      <ArrowBackIosIcon /> Back{' '}
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
                <Snackbar open={this.state.snackbarOpen} autoHideDuration={this.state.autoHideDuration} onClose={this.onSnackBarClose}>
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
  // const { productReducer } = state;
  const { product, isFetching, categoryList, updateSuccess, addSuccess, isAuthenticated, user, deleted, updated } = state.product;

  return {
    // product: product || {},
    product,
    isFetching,
    categoryList,
    addSuccess,
    updateSuccess,
    isAuthenticated,
    deleted,
    updated,
    user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    newProduct: action => dispatch(thunkApiCall(action)),
    getProduct: action => dispatch(thunkApiQCall(action)),
    saveProduct: action => dispatch(thunkApiCall(action)),
    // updateProduct: action => dispatch(thunkApiCall(action)),
    // addProduct: action => dispatch(thunkApiCall(action)),
    getCategoryList: action => dispatch(thunkApiCall(action)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductFormPage);
