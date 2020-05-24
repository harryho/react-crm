import React from "react";
import { Link, match } from "react-router-dom";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import Divider from "@material-ui/core/Divider";
import PageBase from "../components/PageBase";
import { connect } from "react-redux";
import Card from "@material-ui/core/Card";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { getAction } from "../actions/product";

import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";

import { thunkApiCall, thunkApiQCall } from "../services/thunks";
import { Product,  Category } from "../types";
import { LinearProgress, Grid, MenuItem } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import {
  ApiAction,
  UPDATE_PRODUCT,
  CREATE_PRODUCT,
  EDIT_PRODUCT,
  QActions,
} from "../store/types";
import Alert from "@material-ui/lab/Alert";
import SkeletonForm from "../components/SkeletonForm";
import { formPageStyles } from "../styles";

const styles = formPageStyles;

interface ProductFormProps {
  match: match;
  product: Product;
  getProduct: typeof thunkApiQCall;
  saveProduct: typeof thunkApiCall;
  categoryList: Category[];
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

class ProductFormPage extends React.Component<
  ProductFormProps,
  ProductFormState
> {
  constructor(props) {
    super(props);
    this.onSnackBarClose = this.onSnackBarClose.bind(this);
  }

  state = {
    product: {} as Product,
    snackbarOpen: false,
    autoHideDuration: 2000,
  };

  componentDidMount() {
    // @ts-ignore
    const productId = this.props.match.params?.id;
    let action: QActions;
    if (productId) {
      action = getAction(EDIT_PRODUCT, productId) as QActions;
      this.props.getProduct(action);
    }
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.updated !== prevProps.updated &&
      this.props.updated === true
    ) {
      this.setState({ snackbarOpen: true });
    }
  }

  onSnackBarClose() {
    this.setState({
      snackbarOpen: false,
    });
  }

  onSave(values: TODO) {
    const product = { ...this.state.product, ...values };
    let action: ApiAction; 
    if (product.id > 0) {
      action = getAction(UPDATE_PRODUCT, null, product) as ApiAction;
    } else {
      action = getAction(CREATE_PRODUCT, null, product) as ApiAction;
    }
    this.props.saveProduct(action);
  }

  render() {
    const { categoryList, product, isFetching } = this.props;

    return (
      <PageBase title="Product" navigation="Application / Product ">
        {isFetching ? (
          <div>
            <SkeletonForm />
          </div>
        ) : (
          <Formik
            initialValues={{
              ...product,
            }}
            validate={(values) => {
              const errors: Partial<Product> = {};
              if (!values.name) {
                errors.name = "Required";
              }
              if (!values.categoryId) {
                errors.categoryId = "Required";
              }

              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              this.onSave(values);
              setTimeout(() => {
                setSubmitting(false);
              }, 500);
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
                      name="categoryId"
                    >
                      {categoryList.map((category, index) => (
                        <MenuItem
                          key={index}
                          value={category.id}
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
                      fullWidth={true}
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
                      type="number"
                      name="unitPrice"
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
                </div>
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
  const { product, isFetching, categoryList, deleted, updated } = state.product;

  return {
    product,
    isFetching,
    categoryList,
    deleted,
    updated,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getProduct: (action) => dispatch(thunkApiQCall(action)),
    saveProduct: (action) => dispatch(thunkApiCall(action)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductFormPage);
