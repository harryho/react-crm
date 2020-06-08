import React from 'react';
import Fab from '@material-ui/core/Fab';
import ContentAdd from '@material-ui/icons/Add';
import Search from '@material-ui/icons/Search';
import PageBase from '../components/PageBase';
import { connect } from 'react-redux';
import { getAction, fetchingProduct } from '../actions/product';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import { thunkApiCall, thunkApiQCall } from '../services/thunks';
import { NEW_PRODUCT, LIST_PRODUCT, ApiAction, QActions, FETCHING_PRODUCT, DELETE_PRODUCT } from '../store/types';
import { Product, SearchFilter } from '../types';
import Alert from '../components/Alert';
import DataTable from '../components/DataTable';
import SkeletonList from '../components/SkeletonList';
import DeleteDialog from '../components/DeleteDialog';
import { listPageStyle } from '../styles';
import { Grid } from '@material-ui/core';
import { clearSearchFilters, buildSearchFilters, buildJsonServerQuery } from '../utils/app-utils';

const styles = listPageStyle;

const defaultProps = {
  model: 'product',
  dataKeys: ['name', 'category.name', 'unitPrice', 'numInStock','actions'],
  headers: ['Product Name', 'Category Name', 'Price', 'Total In Stock', 'Actions'],
};

type DefaultProps = typeof defaultProps;

type ProductListProps = {
  pageCount: number;
  isFetching: boolean;
  productList: Product[];
  searchProduct: typeof thunkApiCall;
  deleteProduct: typeof thunkApiCall;
  newProduct: typeof thunkApiQCall;
  fetchingProduct: () => {};
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
  search: {
    contain:{
      name: string;
    }
  };
}

class ProductListPage extends React.Component<ProductListProps, ProductListState> {
  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.onSnackBarClose = this.onSnackBarClose.bind(this);
    this.handleSearchFilter = this.handleSearchFilter.bind(this);
    this.clearSearchFilter = this.clearSearchFilter.bind(this);
    this.openDialog = this.openDialog.bind(this);
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
    search: {
     contain:{
      name: '',
     }
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

  openDialog(_event: React.ChangeEvent<unknown>, value: number) {
    if (value != null && value > 0) {
         this.setState({ open: true , productId: value });
    }
  }

  handleToggle() {
    this.setState({ searchOpen: !this.state.searchOpen });
  }

  handleSearch() {
    // const action = getAction(LIST_PRODUCT, null, null, '') as ApiAction;
    // this.props.searchProduct(action); //this.state.search);


    const filters = buildSearchFilters(this.state.search as SearchFilter);
    const query = buildJsonServerQuery(filters);
    // const action = getAction(LIST_CUSTOMER, null, null, query);
    const action = getAction(LIST_PRODUCT, null, null, query) as ApiAction;
    this.props.searchProduct(action); //this.state.search);
    this.setState({ searchOpen: false, isFetching: true });


  }

  closeDialog(isConfirmed) {
    this.setState({ open: false });

    if (isConfirmed && this.state.productId) {
      const action = getAction(DELETE_PRODUCT, this.state.productId, null, '')as ApiAction
      this.props.deleteProduct(action);
        this.setState({ productId: null });
    }
  }

  onSnackBarClose() {
    this.setState({
      snackbarOpen: false,
    });
  }

  handleNewProduct() {
    this.props.fetchingProduct();

    const action = getAction(NEW_PRODUCT) as QActions;
    this.props.newProduct(action);
    // @ts-ignore
    this.props.history.push('/newproduct');
  }

  handleSearchFilter(event) {
    const field = event.target.name;
    if (event && event.target && field) {
      const search = Object.assign({}, this.state.search);
      search.contain[field] = event.target.value;
      this.setState({ search: search });
    }
  }

  clearSearchFilter() {
    const search = Object.assign({}, this.state.search);
    clearSearchFilters(search as SearchFilter);
    this.setState({ search });
    this.handleSearch()
  }

  render() {
    const { productList, headers, dataKeys, model } = this.props;
    const { isFetching, page, totalPages, items } = this.state;

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
              onDelete={this.openDialog}
              onPageChange={this.onPageChange}
            />

            <DeleteDialog open={this.state.open} closeDialog={this.closeDialog} />

            <Drawer anchor="right" open={this.state.searchOpen} onClose={this.handleToggle}>
              <Grid container style={styles.searchDrawer} spacing={1}>
                <Grid item xs={12} style={styles.searchField}>
                  <h5>Search</h5>
                </Grid>
                <Grid item xs={12} style={styles.searchField}>
                  <TextField
                    placeholder="Product Name"
                    label="Product Name"
                    name="name"
                    fullWidth={true}
                    value={this.state.search.contain.name}
                    onChange={this.handleSearchFilter}
                  />
                </Grid>
                <Grid item xs={12} style={styles.searchField}>
                  <Button variant="contained"    style={styles.searchButton} onClick={this.handleSearch} color="secondary">
                    Search
                  </Button>
                  <Button variant="contained"    style={styles.searchButton} onClick={this.clearSearchFilter} color="default" >
                      Cancel
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
  const { productList,  isFetching,  errorMessage, user, deleted } = state.product;

  return {
    productList,
    isFetching,
    errorMessage,
  deleted,
    user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    searchProduct: action => dispatch(thunkApiCall(action)),
    getAllProducts: action => dispatch(thunkApiCall(action)),
    deleteProduct: action => dispatch(thunkApiCall(action)),
    fetchingProduct: () => dispatch(fetchingProduct()),
    newProduct: action => dispatch(thunkApiQCall(action)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListPage);
