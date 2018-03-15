import React, { PropTypes } from "react";
import { Link } from "react-router";
import RaisedButton from "material-ui/RaisedButton";
// import MenuItem from 'material-ui/MenuItem';
// import TextField from 'material-ui/TextField';
// import SelectField from 'material-ui/SelectField';
// import Toggle from 'material-ui/Toggle';
// import DatePicker from 'material-ui/DatePicker';
import { grey400 } from "material-ui/styles/colors";
import Divider from "material-ui/Divider";
import PageBase from "../components/PageBase";

import { connect } from "react-redux";
import { GridList, GridTile } from "material-ui/GridList";
import { Card } from "material-ui/Card";

import {
  getProduct,
  updateProduct,
  addProduct,
  loadCategories,
  newProduct
} from "../actions/product";
import { FormsyText, FormsySelect } from "formsy-material-ui/lib";
import Formsy from "formsy-react";
// import SelectField from 'material-ui/SelectField';
import MenuItem from "material-ui/MenuItem";
import CircularProgress from "material-ui/CircularProgress";
import autoBind from "react-autobind";

class ProductFormPage extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      product: {}
    };

    // this.handleChange = this.handleChange.bind(this);
    // this.handleClick = this.handleClick.bind(this);
    // this.enableButton = this.enableButton.bind(this);
    // this.notifyFormError = this.notifyFormError.bind(this);
    // this.disableButton = this.disableButton.bind(this);
  }

  componentWillMount() {
    if (this.props.routeParams && this.props.routeParams.id) {
      this.props.getProduct(this.props.routeParams.id);
      this.props.getCategoryList();
    } else {
      this.props.newProduct();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.product &&
      nextProps.product &&
      this.props.product.id != nextProps.product.id
    ) {
      this.setState({ isFetching: false });
      this.setState({ product: Object.assign({}, nextProps.product) });
    }

    if (
      (!this.props.addSuccess && nextProps.addSuccess) ||
      (!this.props.updateSuccess && nextProps.updateSuccess)
    ) {
      this.props.router.push("/products");
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

    if (this.state.product.id) this.props.updateProduct(this.state.product);
    else this.props.addProduct(this.state.product);
  }

  render() {
    const { errorMessage, categoryList } = this.props;
    const { isFetching, product } = this.state;

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
      menuItem: {
        fontSize: 14
      },
      customWidth: {
        width: 250
      }
    };
    if (isFetching) {
      return <CircularProgress />;
    } else {
      return (
        <PageBase title="Product" navigation="Application / Product ">
          <Formsy.Form
            onValid={this.enableButton}
            onInvalid={this.disableButton}
            onValidSubmit={this.handleClick}
            onInvalidSubmit={this.notifyFormError}
          >
            <GridList cellHeight={100} cols="2">
              <GridTile>
                <FormsySelect
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
                </FormsySelect>
              </GridTile>
              <GridTile>
                <FormsyText
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
              </GridTile>

              <GridTile>
                <FormsyText
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
              </GridTile>
              <GridTile>
                <FormsyText
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
              </GridTile>

              <GridTile>
                {product &&
                  product.avatar && (
                    <Card style={styles.card}>
                      <img width={100} src={product.avatar} />
                    </Card>
                  )}
              </GridTile>
            </GridList>
            <Divider />

            <div style={styles.buttons}>
              <Link to="/products">
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
            </div>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          </Formsy.Form>
        </PageBase>
      );
    }
  }
}

ProductFormPage.propTypes = {
  router: PropTypes.router,
  routeParams: PropTypes.object,
  product: PropTypes.object,
  newProduct: PropTypes.func.isRequired,
  getProduct: PropTypes.func.isRequired,
  updateProduct: PropTypes.func.isRequired,
  updateSuccess: PropTypes.bool.isRequired,
  addSuccess: PropTypes.bool.isRequired,
  addProduct: PropTypes.func.isRequired,
  categoryList: PropTypes.array,
  getCategoryList: PropTypes.func.isRequired,
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
    // getAllCustomers: () => dispatch( loadCustomers()),
    getCategoryList: () => dispatch(loadCategories())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductFormPage);
