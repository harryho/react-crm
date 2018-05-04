import React, { PropTypes } from "react";
import { Link } from "react-router";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentCreate from "material-ui/svg-icons/content/create";
import ActionDelete from "material-ui/svg-icons/action/delete";
import ContentAdd from "material-ui/svg-icons/content/add";
import Search from "material-ui/svg-icons/action/search";
import {
  pink500,
  grey200,
  grey500,
  green400,
  white
} from "material-ui/styles/colors";
import PageBase from "../components/PageBase";
// import Data from '../data';
import Pagination from "../components/Pagination";
import { connect } from "react-redux";
import { loadOrders, deleteOrder } from "../actions/order";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import Drawer from "material-ui/Drawer";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import Snackbar from "material-ui/Snackbar";

class OrderListPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      searchOpen: false,
      snackbarOpen: false,
      autoHideDuration: 1500,
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: false,
      selectable: false,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      showCheckboxes: false,
      pageOfItems: [],
      orderId: null,
      dialogText: "Are you sure to do this?",
      search: {
        product: ""
      }
    };

    this.onChangePage = this.onChangePage.bind(this);
    this.onDelete = this.onDelete.bind(this);

    this.handleToggle = this.handleToggle.bind(this);
    this.handleSearchFilter = this.handleSearchFilter.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleErrorMessage = this.handleErrorMessage.bind(this);
    this.handleSnackBarClose = this.handleSnackBarClose.bind(this);

    if (this.props.orderList || this.props.orderList.length < 1)
      props.getAllOrders(this.state.search);
  }

  componentWillMount() { }

  /* eslint-disable */
  componentDidUpdate(prevProps, prevState) {
    // reset page if items array has changed
    if (this.props.orderList !== prevProps.orderList) {
      //this.setPage(this.props.initialPage);
      this.onChangePage(this.props.orderList.slice(0, 10));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.errorMessage && !nextProps.deleteSuccess) {
      this.setState({ snackbarOpen: true });
    }

    if (
      !this.props.deleteSuccess &&
      nextProps.deleteSuccess &&
      !nextProps.errorMessage &&
      !nextProps.isFetching
    ) {
      this.props.getAllOrders();
    }
  }

  onChangePage(pageOfItems) {
    if (
      !this.props.isFetching &&
      this.state.pageOfItems &&
      this.props.orderList
    )
      this.setState({ pageOfItems: pageOfItems });
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
    this.setState({ searchOpen: !this.state.searchOpen });
    this.props.getAllOrders(this.state.search);
  }

  handleOpen(id) {
    this.setState({ dialogText: "Are you sure to delete this data?" });
    this.setState({ open: true });
    this.setState({ orderId: id });
  }

  handleClose(isConfirmed) {
    this.setState({ open: false });

    if (isConfirmed && this.state.orderId) {
      this.props.deleteOrder(this.state.orderId);
      this.setState({ orderId: null });
    }
  }

  handleSearch() {
    this.setState({ searchOpen: !this.state.searchOpen });
    this.props.getAllOrders(this.state.search);
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
      snackbarOpen: true
    });
  }

  handleSnackBarClose() {
    this.setState({
      snackbarOpen: false
    });
  }

  render() {
    const { errorMessage, orderList } = this.props;

    const styles = {
      fab: {
        // margin: 0,
        top: "auto",
        right: 20,
        bottom: 20,
        left: "auto",
        position: "fixed",
        marginRight: 20
      },
      fabSearch: {
        // margin: 0,
        top: "auto",
        right: 100,
        bottom: 20,
        left: "auto",
        position: "fixed",
        marginRight: 20,
        backgroundColor: "lightblue"
      },
      editButton: {
        paddingRight: 25
      },
      editButtonIcon: {
        fill: white
      },
      deleteButton: {
        fill: grey500
      },
      columns: {
        id: {
          width: "10%"
        },
        name: {
          width: "20%"
        },
        price: {
          width: "20%",
          textAlign: "right"
        },
        category: {
          width: "20%"
        },
        edit: {
          width: "20%"
        }
      },
      dialog: {
        width: "20%",
        maxWidth: "none"
      },
      drawer: {
        backgroundColor: "lightgrey"
      }
    };

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        value={false}
        onTouchTap={() => this.handleClose(false)}
      />,
      <FlatButton
        label="Confirm"
        primary={true}
        value={true}
        onTouchTap={() => this.handleClose(true)}
      />
    ];

    return (
      <PageBase
        title={"Orders (" + orderList.length + ")"}
        navigation="React CRM / Order"
      >
        <div>
          <Link to="/order">
            <FloatingActionButton style={styles.fab} backgroundColor={pink500}>
              <ContentAdd />
            </FloatingActionButton>
          </Link>
          <FloatingActionButton
            style={styles.fabSearch}
            backgroundColor={pink500}
            onTouchTap={this.handleToggle}
          >
            <Search />
          </FloatingActionButton>

          <Snackbar
            open={this.state.snackbarOpen}
            message={errorMessage ? errorMessage : ""}
            autoHideDuration={this.state.autoHideDuration}
            onRequestClose={this.handleSnackBarClose}
          />

          <Table
            fixedHeader={this.state.fixedHeader}
            fixedFooter={this.state.fixedFooter}
            selectable={this.state.selectable}
            multiSelectable={this.state.multiSelectable}
          >
            <TableHeader
              displaySelectAll={this.state.showCheckboxes}
              adjustForCheckbox={this.state.showCheckboxes}
              enableSelectAll={this.state.enableSelectAll}
            >
              <TableRow>
                <TableHeaderColumn style={styles.columns.name}>
                  Reference
                </TableHeaderColumn>
                {/*<TableHeaderColumn style={styles.columns.name}>Price</TableHeaderColumn>*/}
                <TableHeaderColumn style={styles.columns.price}>
                  Quantity
                </TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.price}>
                  Amount
                </TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.price}>
                  Order Date
                </TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.price}>
                  Shipped Date
                </TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.name}>
                  Customer
                </TableHeaderColumn>
                {/*<TableHeaderColumn style={styles.columns.category}>Status</TableHeaderColumn>*/}
                <TableHeaderColumn style={styles.columns.edit}>
                  Edit
                </TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={this.state.showCheckboxes}
              deselectOnClickaway={this.state.deselectOnClickaway}
              showRowHover={this.state.showRowHover}
              stripedRows={this.state.stripedRows}
            >
              {this.state.pageOfItems.map(item => (
                <TableRow key={item.id}>
                  <TableRowColumn style={styles.columns.name}>
                    {item.reference}
                  </TableRowColumn>
                  <TableRowColumn style={styles.columns.price}>
                    {item.products.length}
                  </TableRowColumn>
                  <TableRowColumn style={styles.columns.price}>
                    AUD ${item.amount}
                  </TableRowColumn>
                  <TableRowColumn style={styles.columns.price}>
                    {item.orderDate}
                  </TableRowColumn>
                  <TableRowColumn style={styles.columns.price}>
                    {item.shippedDate}
                  </TableRowColumn>
                  {/*<TableRowColumn style={styles.columns.price}>{item.quantity * item.price}</TableRowColumn>*/}
                  <TableRowColumn style={styles.columns.category}>
                    {item.customer
                      ? item.customer.firstName + " " + item.customer.lastName
                      : ""}
                  </TableRowColumn>
                  <TableRowColumn style={styles.columns.edit}>
                    <Link className="button" to={"/order/" + item.id}>
                      <FloatingActionButton
                        zDepth={0}
                        mini={true}
                        style={styles.editButton}
                        backgroundColor={green400}
                        iconStyle={styles.editButtonIcon}
                      >
                        <ContentCreate />
                      </FloatingActionButton>
                    </Link>

                    <FloatingActionButton
                      zDepth={0}
                      mini={true}
                      backgroundColor={grey200}
                      iconStyle={styles.deleteButton}
                      onTouchTap={() => this.onDelete(item.id)}
                    >
                      <ActionDelete />
                    </FloatingActionButton>
                  </TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className={"row center-xs"}>
            <div className={"col-xs-6"}>
              <div className={"box"}>
                {orderList && (
                  <Pagination
                    items={orderList}
                    onChangePage={this.onChangePage}
                  />
                )}
              </div>
            </div>
          </div>
          <Dialog
            title="Confirm Dialog "
            actions={actions}
            modal={true}
            contentStyle={styles.dialog}
            open={this.state.open}
          >
            {this.state.dialogText}
          </Dialog>

          <Drawer
            width={300}
            openSecondary={true}
            open={this.state.searchOpen}
            containerStyle={styles.drawer}
          >
            {/*<AppBar title="AppBar" />*/}
            <RaisedButton
              label="Search"
              style={styles.saveButton}
              type="button"
              onClick={this.handleSearch}
              secondary={true}
            />

            <TextField
              hintText="Product"
              floatingLabelText="Product"
              name="product"
              fullWidth={true}
              value={this.state.search.product}
              onChange={this.handleSearchFilter}
            />
          </Drawer>
        </div>
      </PageBase>
    );
  }
}

OrderListPage.propTypes = {
  orderList: PropTypes.array,
  getAllOrders: PropTypes.func.isRequired,
  deleteOrder: PropTypes.func.isRequired,
  deleteSuccess: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string
};

function mapStateToProps(state) {
  const { orderReducer } = state;
  const {
    orderList,
    deleteSuccess,
    isFetching,
    isAuthenticated,
    errorMessage,
    user
  } = orderReducer;

  return {
    orderList,
    isFetching,
    isAuthenticated,
    errorMessage,
    deleteSuccess,
    user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllOrders: filters => dispatch(loadOrders(filters)),
    deleteOrder: id => dispatch(deleteOrder(id))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderListPage);
