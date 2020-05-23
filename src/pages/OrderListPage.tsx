import React from 'react';
import Fab from '@material-ui/core/Fab';
import ContentAdd from '@material-ui/icons/Add';
import Search from '@material-ui/icons/Search';
import PageBase from '../components/PageBase';
import { connect } from 'react-redux';
import { getAction } from '../actions/order';
import Dialog from '@material-ui/core/Dialog';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import { pink } from '@material-ui/core/colors';
import { thunkApiCall } from '../services/thunks';
import { LIST_ORDER, DELETE_ORDER, NEW_ORDER, ApiAction } from '../store/types';
import { Order } from '../types';
import { DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from '@material-ui/core';
import Alert from '../components/Alert';
import SkeletonList from '../components/SkeletonList';
import DataTable from '../components/DataTable';

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
  model: 'order',
  dataKeys: ['reference', 'quantity', 'amount', 'customer.firstname', 'orderDate', 'shippedDate'],
  headers: ['Reference', 'Quantity', 'Amount', 'Customer', 'Order Date', 'Shipping Date'],
};

type DefaultProps = typeof defaultProps;

type OrderListProps = {
  pageCount: number;
  isFetching: boolean;
  orderList: Order[];
  searchOrder: typeof thunkApiCall;
  deleteOrder: typeof thunkApiCall;
  newOrder: typeof thunkApiCall;
  deleteSuccess: boolean;
  errorMessage: string;
  deleted: boolean;
} & DefaultProps;

interface OrderListState {
  open: boolean;
  isFetching: boolean;
  searchOpen: boolean;
  snackbarOpen: boolean;
  autoHideDuration: number;
  page: number;
  items: Order[];
  orderList: Order[];
  totalPages: number;
  orderId: number;
  dialogText: string; //'Are you sure to do this?',
  search: {
    product: string;
    customer: string;
  };
}

class OrderListPage extends React.Component<OrderListProps, OrderListState> {
  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.onSnackBarClose = this.onSnackBarClose.bind(this);
    this.handleNewOrder = this.handleNewOrder.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  static defaultProps = defaultProps;

  state: OrderListState = {
    isFetching: true,
    open: false,
    searchOpen: false,
    snackbarOpen: false,
    autoHideDuration: 1500,
    page: 1,
    items: [],
    totalPages: 1,
    orderList: [],
    orderId: null,
    dialogText: 'Are you sure to do this?',
    search: {
      product: '',
      customer: '',
    },
  };

  componentDidMount() {
    // this.props.searchCustomer(this.apiAction);
    this.handleSearch();
  }

  /* eslint-disable */
  componentDidUpdate(prevProps, prevState) {
    if (this.props.orderList !== prevProps.orderList) {
      this.setState({ orderList: this.props.orderList });
      const page = 1;
      const totalPages = Math.ceil(this.props.orderList.length / 10);
      const items = this.props.orderList.slice(0, 10);
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
    const items = this.props.orderList.slice(startIndex, endIndex);
    this.setState({ page, items });
  }

  onDelete(_event: React.ChangeEvent<unknown>, value: number) {
    if (value != null && value > 0) {
      // this.handleOpen(id);
      this.setState({ dialogText: 'Are you sure to delete this data?' });
      this.setState({ open: true });
      this.setState({ orderId: value });
    }
  }

  handleToggle() {
    this.setState({ searchOpen: !this.state.searchOpen });
  }

  handleSearch() {
    this.setState({ searchOpen: false, isFetching: true });
    const action = getAction(LIST_ORDER, null, null, '') as ApiAction;
    this.props.searchOrder(action); //this.state.search);
  }

  handleOpen(id) {
    this.setState({ dialogText: 'Are you sure to delete this data?' });
    this.setState({ open: true });
    this.setState({ orderId: id });
  }

  handleClose(isConfirmed: boolean) {
    this.setState({ open: false });

    if (isConfirmed && this.state.orderId) {
      const action = getAction(DELETE_ORDER, this.state.orderId, null, '') as ApiAction;
      this.props.deleteOrder(action);
      this.setState({ orderId: null });
    }
  }

  handleNewOrder() {
    const action = getAction(NEW_ORDER) as ApiAction;
    this.props.newOrder(action);
    // @ts-ignore
    this.props.history.push('/neworder');
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

  onSnackBarClose() {
    this.setState({
      snackbarOpen: false,
    });
  }

  render() {
    const { orderList, headers, dataKeys, model } = this.props;
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
      <PageBase title={'Orders (' + orderList.length + ')'} navigation="React CRM / Order">
        {isFetching ? (
          <div>
            <SkeletonList />
          </div>
        ) : (
          <div>
            <Fab size="small" color="secondary" style={styles.fab} onClick={this.handleNewOrder}>
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
              title="Confirm Dialog"
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
                    placeholder="Last Name"
                    label="Last Name"
                    fullWidth={true}
                    name="lastname"
                    value={this.state.search.product}
                    onChange={this.handleSearchFilter}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" onClick={this.handleSearch} color="secondary">
                    Search
                  </Button>
                  <Button variant="contained" onClick={this.handleSearch} color="default">
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
  const { orderList, isFetching, errorMessage, user, deleted } = state.order;

  return {
    orderList,
    isFetching,
    errorMessage,
    user,
    deleted,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    searchOrder: (action?: TODO) => dispatch(thunkApiCall(action)),
    deleteOrder: (action: TODO) => dispatch(thunkApiCall(action)),
    newOrder: (action?: TODO) => dispatch(thunkApiCall(action)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderListPage);
