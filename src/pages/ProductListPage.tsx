import React from 'react';
import Fab from '@material-ui/core/Fab';
import ContentAdd from '@material-ui/icons/Add';
import Search from '@material-ui/icons/Search';
import PageBase from '../components/PageBase';
import { connect } from 'react-redux';
import { getAction } from '../actions/product';
import Dialog from '@material-ui/core/Dialog';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import { pink, grey, green, common } from '@material-ui/core/colors';
import { thunkApiCall } from '../services/thunks';
import { NEW_PRODUCT, LIST_PRODUCT, ApiAction } from '../store/types';
import { Product } from '../types';
import { DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from '@material-ui/core';
import Alert from '../components/Alert';
import DataTable from '../components/DataTable';
import SkeletonList from '../components/SkeletonList';

const pink500 = pink['500'];

const styles = {
  fab: {
    top: 'auto' as TODO,
    right: 20,
    bottom: 20,
    left: 'auto' as TODO,
    position: 'fixed' as TODO,
    marginRight: 20,
    backgroundColor: pink500, // {pink500}
  },
  fabSearch: {
    top: 'auto' as TODO,
    right: 100,
    bottom: 20,
    left: 'auto' as TODO,
    position: 'fixed' as TODO,
    marginRight: 20,
    backgroundColor: 'lightblue' as TODO,
  },
  searchButton: {
    marginRight: 20,
  },
  drawer: {
    backgroundColor: 'lightgrey',
  },
  searchDrawer: {
    overflow: 'hidden',
    width: 280,
  },
  searchGrid: {
    width: 250,
    // backgroundColor: "lightgrey",
  },
};

const defaultProps = {
  model: 'product',
  dataKeys: ['name', 'category.name', 'unitPrice', 'numInStock'],
  headers: ['Product Name', 'Category Name', 'Price', 'Unit In Stock'],
};

type DefaultProps = typeof defaultProps;

type ProductListProps = {
  pageCount: number;
  isFetching: boolean;
  productList: Product[];
  searchProduct: typeof thunkApiCall;
  deleteProduct: typeof thunkApiCall;
  newProduct: typeof thunkApiCall;
  deleteSuccess: boolean;
  errorMessage: string;
  deleted: boolean;
} & DefaultProps;

interface ProductListState {
  open: boolean;
  isFetching: boolean;
  searchOpen: boolean;
  snackbarOpen: boolean;
  autoHideDuration: number;
  page: number;
  items: Product[];
  productList: Product[];
  totalPages: number;
  productId: number;
  dialogText: string; //'Are you sure to do this?',
  search: {
    product: string;
  };
}

class ProductListPage extends React.Component<ProductListProps, ProductListState> {
  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.onSnackBarClose = this.onSnackBarClose.bind(this);
    this.handleNewProduct = this.handleNewProduct.bind(this);
  }

  static defaultProps = defaultProps;

  state: ProductListState = {
    isFetching: true,
    open: false,
    searchOpen: false,
    snackbarOpen: false,
    autoHideDuration: 2000,
    page: 1,
    items: [],
    totalPages: 1,
    productId: null,
    productList: [],
    dialogText: 'Are you sure to do this?',
    search: {
      product: '',
    },
  };

  /* eslint-disable */
  componentDidMount() {
    this.handleSearch();
  }

  componentDidUpdate(prevProps) {
    // reset page if items array has changed
    if (this.props.productList !== prevProps.productList) {
      this.setState({ productList: this.props.productList });
      const page = 1;
      const totalPages = Math.ceil(this.props.productList.length / 10);
      const items = this.props.productList.slice(0, 10);
      const isFetching = this.props.isFetching;
      this.setState({ page, totalPages, items, isFetching });
    }
    console.log(' this.props.deleted ' + this.props.deleted);

    if (this.props.deleted !== prevProps.deleted && this.props.deleted === true) {
      this.setState({ snackbarOpen: true });
      this.handleSearch();
    }
  }

  onPageChange(_event: React.ChangeEvent<unknown>, page: number) {
    const startIndex = (page - 1) * 10;
    const endIndex = startIndex + 10;
    const items = this.props.productList.slice(startIndex, endIndex);
    this.setState({ page, items });
  }

  onDelete(_event: React.ChangeEvent<unknown>, value: number) {
    if (value != null && value > 0) {
      // this.handleOpen(id);
      this.setState({ dialogText: 'Are you sure to delete this data?' });
      this.setState({ open: true });
      this.setState({ productId: value });
    }
  }

  handleToggle() {
    this.setState({ searchOpen: !this.state.searchOpen });
  }

  handleSearch() {
    const action = getAction(LIST_PRODUCT, null, null, '') as ApiAction;
    this.props.searchProduct(action); //this.state.search);
  }

  handleOpen(id) {
    this.setState({ dialogText: 'Are you sure to delete this data?' });
    this.setState({ open: true });
    this.setState({ productId: id });
  }

  handleClose(isConfirmed) {
    this.setState({ open: false });

    if (isConfirmed && this.state.productId) {
      // this.props.deleteProduct(this.state.productId);
      this.setState({ productId: null });
    }
  }
  onSnackBarClose() {
    this.setState({
      snackbarOpen: false,
    });
  }

  handleNewProduct() {
    const action = getAction(NEW_PRODUCT) as ApiAction;
    this.props.newProduct(action);
    // @ts-ignore
    this.props.history.push('/newproduct');
  }

  handleSearchFilter(event) {
    const field = event.target.name;

    if (event && event.target && field) {
      const search = Object.assign({}, this.state.search);
      search[field] = event.target.value;
      this.setState({ search: search });
    }
  }

  handleErrorMessage() {
    this.setState({
      snackbarOpen: true,
    });
  }

  handleSnackBarClose() {
    this.setState({
      snackbarOpen: false,
    });
  }

  render() {
    const { productList, headers, dataKeys, model } = this.props;
    const { isFetching, page, totalPages, items } = this.state;

    const dialogButtons = [
      <Fab key="cancel-btn" color="primary" variant="extended" onClick={() => this.handleClose(false)}>
        Cancel
      </Fab>,
      <Fab key="confirm-btn" color="secondary" variant="extended" onClick={() => this.handleClose(true)}>
        Confirm
      </Fab>,
    ];

    return (
      <PageBase title={'Products (' + productList.length + ')'} navigation="React CRM / Product">
        {isFetching ? (
          <div>
            <SkeletonList />
          </div>
        ) : (
          <div>
            <Fab size="small" color="secondary" style={styles.fab} onClick={this.handleNewProduct}>
              <ContentAdd />
            </Fab>
            <Fab size="small" style={styles.fabSearch} onClick={this.handleToggle}>
              <Search />
            </Fab>
            <Snackbar open={this.state.snackbarOpen} autoHideDuration={this.state.autoHideDuration} onClose={this.onSnackBarClose}>
              <Alert onClose={this.onSnackBarClose} severity="success">
                The operation completed successfully !
              </Alert>
            </Snackbar>
            <DataTable
              model={model}
              items={items}
              dataKeys={dataKeys}
              headers={headers}
              page={page}
              totalPages={totalPages}
              onDelete={this.onDelete}
              onPageChange={this.onPageChange}
            />

            <Dialog
              key="alert-dialog"
              title="Confirm Dialog "
              fullWidth
              maxWidth="xs"
              open={this.state.open}
              onClick={() => this.handleClose(false)}
            >
              <DialogTitle key="alert-dialog-title">{'Alert'}</DialogTitle>
              <DialogContent key="alert-dialog-content">
                <DialogContentText key="alert-dialog-description">{this.state.dialogText}</DialogContentText>
              </DialogContent>
              <DialogActions key="alert-dialog-action">{dialogButtons}</DialogActions>
            </Dialog>
            <Drawer anchor="right" open={this.state.searchOpen} onClose={this.handleToggle}>
              <Grid container style={styles.searchDrawer} spacing={1}>
                <Grid item xs={12}>
                  <h5>Search</h5>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    placeholder="Product"
                    label="Product"
                    name="product"
                    fullWidth={true}
                    value={this.state.search.product}
                    onChange={this.handleSearchFilter}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" onClick={this.handleSearch} color="secondary">
                    Search
                  </Button>
                </Grid>
              </Grid>
            </Drawer>
          </div>
        )}
      </PageBase>
    );
  }
}

function mapStateToProps(state) {
  const { productList, deleteSuccess, isFetching, isAuthenticated, errorMessage, user } = state.product;

  return {
    productList,
    isFetching,
    isAuthenticated,
    errorMessage,
    deleteSuccess,
    user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    searchProduct: action => dispatch(thunkApiCall(action)),
    getAllProducts: action => dispatch(thunkApiCall(action)),
    deleteProduct: action => dispatch(thunkApiCall(action)),
    newProduct: action => dispatch(thunkApiCall(action)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListPage);
