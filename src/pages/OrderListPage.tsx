import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import Pagination from "@material-ui/lab/Pagination";
import TableRow from "@material-ui/core/TableRow";
import Fab from "@material-ui/core/Fab";
import ContentCreate from "@material-ui/icons/Create";
import ActionDelete from "@material-ui/icons/Delete";
import ContentAdd from "@material-ui/icons/Add";
import Search from "@material-ui/icons/Search";
import CheckCircle from "@material-ui/icons/CheckCircle";
import Cancel from "@material-ui/icons/Cancel";
import PageBase from "../components/PageBase";
import AppBar from "@material-ui/core/AppBar";
import { connect } from "react-redux";
import { getAction } from "../actions/order";
import Dialog from "@material-ui/core/Dialog";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import { teal, pink, grey, green, common } from "@material-ui/core/colors";
import { thunkApiCall } from "../services/thunks";
import { LIST_ORDER, DELETE_ORDER, NEW_ORDER, ApiAction } from "../store/types";
import { Order } from "../types";
import {
  Container,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import Alert from "../components/Alert";

const teal500 = teal["500"];
const pink500 = pink["500"];
const grey500 = grey["500"];
const green400 = green["400"];
const white = common.white;

const styles = {
  fab: {
    top: "auto" as TODO,
    right: 20,
    bottom: 20,
    left: "auto" as TODO,
    position: "fixed" as TODO,
    marginRight: 20,
    backgroundColor: pink500, // {pink500}
  },
  fabSearch: {
    top: "auto" as TODO,
    right: 100,
    bottom: 20,
    left: "auto" as TODO,
    position: "fixed" as TODO,
    marginRight: 20,
    backgroundColor: teal500 as TODO,
  },
  editButton: {
    marginRight: "1em",
    color: white,
    backgroundColor: green400,
    width: 36,
    height: 36,
  },
  editButtonIcon: {
    fill: white,
  },
  deleteButton: {
    color: "grey",
    fill: grey500,
    width: 36,
    height: 36,
  },
  columns: {
    width10: {
      width: "10%",
    },
  },
  dialog: {
    width: "100%",
    maxWidth: "none",
    margin: "auto",
    position: "fixed" as TODO,
    padding: "0px",
  },
  drawer: {
    backgroundColor: "lightgrey",
  },
  row: {
    margin: "1.5em",
    width: "95%",
  },
  pagination: {
    width: "220px",
    margin: "0 auto",
    paddingTop: 10,
  },
};

interface OrderListProps {
  pageCount: number;
  isFetching: boolean;
  orderList: Order[];
  searchOrder: typeof thunkApiCall;
  deleteOrder: typeof thunkApiCall;
  newOrder: typeof thunkApiCall;
  deleteSuccess: boolean;
  errorMessage: string;
  deleted: boolean;
}

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
  orderId: null;
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
  }
  // constructor(props) {
  //   super(props);

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
    dialogText: "Are you sure to do this?",
    search: {
      product: "",
      customer: "",
    },
  };

  UNSAFE_componentWillMount() {}

  componentDidMount() {
    // this.props.searchCustomer(this.apiAction);
    this.handleSearch();
  }

  /* eslint-disable */
  componentDidUpdate(prevProps, prevState) {
    // // reset page if items array has changed
    // if (this.props.orderList !== prevProps.orderList) {
    //   //this.setPage(this.props.initialPage);
    //   this.onChangePage(this.props.orderList.slice(0, 10));
    // }
    if (this.props.orderList !== prevProps.orderList) {
      this.setState({ orderList: this.props.orderList });
      const page = 1;
      const totalPages = Math.ceil(this.props.orderList.length / 10);
      const items = this.props.orderList.slice(0, 10);
      const isFetching = this.props.isFetching;
      this.setState({ page, totalPages, items, isFetching });
    }
    console.log(" this.props.deleted " + this.props.deleted);

    if (
      this.props.deleted !== prevProps.deleted &&
      this.props.deleted === true
    ) {
      this.setState({ snackbarOpen: true });
      this.handleSearch();
    }
  }

  onPageChange(event: React.ChangeEvent<unknown>, page: number) {
    const startIndex = (page - 1) * 10;
    const endIndex = startIndex + 10;
    const items = this.props.orderList.slice(startIndex, endIndex);
    this.setState({ page, items });
  }

  onDelete(id) {
    if (id) {
      this.handleOpen(id);
    }
  }

  handleToggle() {
    this.setState({ searchOpen: !this.state.searchOpen });
  }

  handleSearch() {
    this.setState({ searchOpen: false, isFetching: true });
    const action = getAction(LIST_ORDER, null, null, "") as ApiAction;
    this.props.searchOrder(action); //this.state.search);
  }

  handleOpen(id) {
    this.setState({ dialogText: "Are you sure to delete this data?" });
    this.setState({ open: true });
    this.setState({ orderId: id });
  }

  handleClose(isConfirmed: boolean) {
    this.setState({ open: false });

    if (isConfirmed && this.state.orderId) {
      const action = getAction(
        DELETE_ORDER,
        this.state.orderId,
        null,
        ""
      ) as ApiAction;
      this.props.deleteOrder(action);
      // this.props.deleteOrder(this.state.orderId);
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
    const { errorMessage, orderList } = this.props;
    const { isFetching } = this.state;

    const dialogButtons = [
      <Fab
        key="cancel-btn"
        color="primary"
        variant="extended"
        onClick={() => this.handleClose(false)}
      >
        Cancel
      </Fab>,
      <Fab
        key="confirm-btn"
        color="secondary"
        variant="extended"
        onClick={() => this.handleClose(true)}
      >
        Confirm
      </Fab>,
    ];

    return (
      <PageBase
        title={"Orders (" + orderList.length + ")"}
        navigation="React CRM / Order"
      >
        {isFetching ? (
          <div>
            <Skeleton variant="rect" style={styles.row} height={50} />
            <Skeleton variant="rect" style={styles.row} height={50} />
            <Skeleton variant="rect" style={styles.row} height={50} />
            <Skeleton variant="rect" style={styles.row} height={50} />
            <Skeleton variant="rect" style={styles.row} height={50} />
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
                Operation is done successfully!
              </Alert>
            </Snackbar>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell style={styles.columns.width10}>
                    Reference
                  </TableCell>
                  {/*<TableCell style={styles.columns.width10}>Price</TableCell>*/}
                  <TableCell style={styles.columns.width10}>Quantity</TableCell>
                  <TableCell style={styles.columns.width10}>Amount</TableCell>
                  <TableCell style={styles.columns.width10}>
                    Order Date
                  </TableCell>
                  <TableCell style={styles.columns.width10}>
                    Shipped Date
                  </TableCell>
                  <TableCell style={styles.columns.width10}>Customer</TableCell>
                  {/*<TableCell style={styles.columns.category}>Membership</TableCell>*/}
                  <TableCell style={styles.columns.width10}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell style={styles.columns.width10}>
                      {item.reference}
                    </TableCell>
                    <TableCell style={styles.columns.width10}>
                      {item.products.length}
                    </TableCell>
                    <TableCell style={styles.columns.width10}>
                      AUD ${item.amount}
                    </TableCell>
                    <TableCell style={styles.columns.width10}>
                      {item.orderDate}
                    </TableCell>
                    <TableCell style={styles.columns.width10}>
                      {item.shippedDate}
                    </TableCell>
                    <TableCell style={styles.columns.width10}>
                      {item.customer
                        ? item.customer.firstname + " " + item.customer.lastname
                        : ""}
                    </TableCell>
                    <TableCell style={styles.columns.width10}>
                      <Fab
                        size="small"
                        style={styles.editButton}
                        href={`order/${item.id}`}
                      >
                        <ContentCreate />
                      </Fab>
                      <Fab
                        size="small"
                        style={styles.deleteButton}
                        onClick={() => this.onDelete(item.id)}
                      >
                        <ActionDelete />
                      </Fab>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Container style={styles.pagination}>
              <Pagination
                size="small"
                count={this.state.totalPages}
                page={this.state.page}
                variant="outlined"
                color="primary"
                onChange={this.onPageChange}
              />
            </Container>

            <Dialog
              key="alert-dialog"
              title="Confirm Dialog "
              style={styles.dialog}
              open={this.state.open}
              onClick={() => this.handleClose(false)}
            >
              <DialogTitle key="alert-dialog-title">{"Alert"}</DialogTitle>

              <DialogContent key="alert-dialog-content">
                <DialogContentText key="alert-dialog-description">
                  {this.state.dialogText}
                </DialogContentText>
              </DialogContent>

              <DialogActions key="alert-dialog-action">
                {dialogButtons}
              </DialogActions>
            </Dialog>

            <Drawer
              anchor="right"
              open={this.state.searchOpen}
              onClose={this.handleToggle}
            >
              <AppBar title="AppBar" />

              <Button
                variant="contained"
                onClick={this.handleSearch}
                color="secondary"
              >
                Search
              </Button>
              <TextField
                placeholder="Last Name"
                label="Last Name"
                fullWidth={true}
                name="lastname"
                value={this.state.search.product}
                onChange={this.handleSearchFilter}
              />
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
