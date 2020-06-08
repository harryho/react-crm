import React from "react";
import Fab from "@material-ui/core/Fab";
import ContentAdd from "@material-ui/icons/Add";
import Search from "@material-ui/icons/Search";
import PageBase from "../components/PageBase";
import { connect } from "react-redux";
import { getAction } from "../actions/order";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import { thunkApiCall } from "../services/thunks";
import { LIST_ORDER, DELETE_ORDER, NEW_ORDER, ApiAction } from "../store/types";
import { Order, SearchFilter } from "../types";
import { Grid } from "@material-ui/core";
import Alert from "../components/Alert";
import SkeletonList from "../components/SkeletonList";
import DataTable from "../components/DataTable";
import DeleteDialog from "../components/DeleteDialog";
import { listPageStyle } from "../styles";
import { clearSearchFilters, buildSearchFilters, buildJsonServerQuery } from "../utils/app-utils";

const styles = listPageStyle;

const defaultProps = {
  model: "order",
  dataKeys: [
    "reference",
    "products.length",
    "amount",
    "customer.firstname",
    "orderDate",
    "shippedDate",
    "actions",
  ],
  headers: [
    "Reference",
    "Quantity",
    "Amount",
    "Customer",
    "Order Date",
    "Shipping Date",
    "Actions",
  ],
};

type DefaultProps = typeof defaultProps;

type OrderListProps = {
  pageCount: number;
  isFetching: boolean;
  orderList: Order[];
  searchOrder: typeof thunkApiCall;
  deleteOrder: typeof thunkApiCall;
  newOrder: typeof thunkApiCall;

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
  search: {
    contain: {
      reference: string;
      customer: string;
    };
  };
}

class OrderListPage extends React.Component<OrderListProps, OrderListState> {
  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.onSnackBarClose = this.onSnackBarClose.bind(this);
    this.handleNewOrder = this.handleNewOrder.bind(this);
    this.handleSearchFilter = this.handleSearchFilter.bind(this);
    this.clearSearchFilter = this.clearSearchFilter.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.openDialog = this.openDialog.bind(this);
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
    search: {
      contain: {
        reference: "",
        customer: "",
      },
    },
  };

  componentDidMount() {
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

    if (
      this.props.deleted !== prevProps.deleted &&
      this.props.deleted === true
    ) {
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

  openDialog(_event: React.ChangeEvent<unknown>, value: number) {
    if (value != null && value > 0) {
      this.setState({ open: true, orderId: value });
    }
  }

  handleToggle() {
    this.setState({ searchOpen: !this.state.searchOpen });
  }

  handleSearch() {
    // this.setState({ searchOpen: false, isFetching: true });
    // const action = getAction(LIST_ORDER, null, null, "") as ApiAction;
    // this.props.searchOrder(action); //this.state.search);

    const filters = buildSearchFilters(this.state.search as SearchFilter);
    const query = buildJsonServerQuery(filters);
    const action = getAction(LIST_ORDER, null, null, query) as ApiAction
    this.props.searchOrder(action); //this.state.search);
    this.setState({ searchOpen: false, isFetching: true });
  }

  closeDialog(isConfirmed: boolean) {
    this.setState({ open: false });

    if (isConfirmed && this.state.orderId) {
      const action = getAction(
        DELETE_ORDER,
        this.state.orderId,
        null,
        ""
      ) as ApiAction;
      this.props.deleteOrder(action);
      this.setState({ orderId: null });
    }
  }

  handleNewOrder() {
    const action = getAction(NEW_ORDER) as ApiAction;
    this.props.newOrder(action);
    // @ts-ignore
    this.props.history.push("/neworder");
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

    return (
      <PageBase
        title={"Orders (" + orderList.length + ")"}
        navigation="React CRM / Order"
      >
        {isFetching ? (
          <div>
            <SkeletonList />
          </div>
        ) : (
          <div>
            <Fab
              size="small"
              color="secondary"
              style={styles.fab}
              onClick={this.handleNewOrder}
            >
              <ContentAdd />
            </Fab>

            <Fab
              size="small"
              style={styles.fabSearch}
              onClick={this.handleToggle}
            >
              <Search />
            </Fab>

            <Snackbar
              open={this.state.snackbarOpen}
              autoHideDuration={this.state.autoHideDuration}
              onClose={this.onSnackBarClose}
            >
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

            <DeleteDialog
              open={this.state.open}
              closeDialog={this.closeDialog}
            />

            <Drawer
              anchor="right"
              open={this.state.searchOpen}
              onClose={this.handleToggle}
              style={styles.searchDrawer}
            >
              <Grid container style={styles.searchDrawer} spacing={0}>
                <Grid item xs={12} style={styles.searchField}>
                  <h5>Search</h5>
                </Grid>
                <Grid item xs={12} style={styles.searchField}>
                  <TextField
                    // placeholder="Order Reference"
                    label="Order Reference"
                    fullWidth={true}
                    name="reference"
                    value={this.state.search.contain.reference}
                    onChange={this.handleSearchFilter}
                  />
                </Grid>
                <Grid item xs={12} style={styles.searchField}>
                  <Button
                    variant="contained"
                    style={styles.searchButton}
                    onClick={this.handleSearch}
                    color="secondary"
                  >
                    Search
                  </Button>
                  <Button
                    variant="contained"
                    style={styles.searchButton}
                    onClick={this.clearSearchFilter}
                    color="default"
                  >
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
