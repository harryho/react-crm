import * as React from 'react';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
// import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Fab from '@material-ui/core/Fab';
import ContentCreate from '@material-ui/icons/Create';
import ActionDelete from '@material-ui/icons/Delete';
import ContentAdd from '@material-ui/icons/Add';
import Search from '@material-ui/icons/Search';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Cancel from '@material-ui/icons/Cancel';
import PageBase from '../components/PageBase';
// import Data from '../data';
// import Pagination from "../components/Pagination";
import { connect } from 'react-redux';
import { listCustomers, deleteCustomer } from '../store/customer';
import Dialog from '@material-ui/core/Dialog';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import { teal, pink, grey, green, common } from '@material-ui/core/colors';
import { sendMessage } from '../store/actions';
import { thunkSearch } from '../services/thunks';

const teal500 = teal['500'];
const pink500 = pink['500'];
const grey200 = grey['200'];
const grey500 = grey['500'];
const green400 = green['400'];
const white = common.white;

interface CustomerListProps {
  isFetching: boolean;
  customerList: TODO[];
  searchCustomer: typeof thunkSearch;
  deleteCustomer: typeof deleteCustomer;
  sendMessage: typeof sendMessage;
  deleteSuccess: boolean;
  errorMessage: string;
}

class CustomerListPage extends React.Component<CustomerListProps> {
  //
  //   super(props);

  state = {
    open: false,
    searchOpen: false,
    snackbarOpen: false,
    autoHideDuration: 1500,
    // fixedHeader: true,
    // fixedFooter: true,
    // stripedRows: false,
    // showRowHover: false,
    // selectable: false,
    // multiSelectable: false,
    // enableSelectAll: false,
    // deselectOnClickaway: true,
    // showCheckboxes: false,
    pageOfItems: [],
    customerId: null,
    dialogText: 'Are you sure to do this?',
    search: {
      firstName: '',
      lastName: '',
    },
  };

  //   UNSAFE_componentWillMount() {
  componentDidMount() {
      debugger
    this.props.searchCustomer('');
  }

  /* eslint-disable */
  componentDidUpdate(prevProps, prevState) {
    // reset page if items array has changed
    if (this.props.customerList !== prevProps.customerList) {
      this.onChangePage(this.props.customerList.slice(0, 10));
    }
  }

  onChangePage(pageOfItems) {
    if (!this.props.isFetching && this.state.pageOfItems && this.props.customerList) this.setState({ pageOfItems: pageOfItems });
  }

  onDelete(id) {
    if (id) {
      this.handleOpen(id);
    }
  }

  handleToggle() {
    this.setState({ searchOpen: !this.state.searchOpen } as TODO);
  }

  handleSearch() {
    this.setState({ searchOpen: !this.state.searchOpen });
    this.props.searchCustomer(''); //this.state.search);
  }

  handleOpen(id) {
    this.setState({ dialogText: 'Are you sure to delete this data?' });
    this.setState({ open: true });
    this.setState({ customerId: id });
  }

  handleClose(isConfirmed: boolean) {
    this.setState({ open: false });

    if (isConfirmed && this.state.customerId) {
      this.props.deleteCustomer(this.state.customerId);
      this.setState({ customerId: null });
    }
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

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.errorMessage && !nextProps.deleteSuccess) {
      this.setState({ snackbarOpen: true });
    }

    if (!this.props.deleteSuccess && nextProps.deleteSuccess && !nextProps.errorMessage && !nextProps.isFetching) {
      this.props.searchCustomer('');
    }
  }

  render() {
    const { errorMessage, customerList, deleteSuccess, isFetching, searchCustomer } = this.props;

    // if (deleteSuccess && !isFetching) {
    // if (true) {
    //   searchCustomer();
    // } else if (!deleteSuccess && errorMessage) {
    //   this.handleErrorMessage();
    // }

    const styles = {
      fab: {
        // margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
        marginRight: 20,
      },
      fabSearch: {
        // margin: 0,
        top: 'auto' as TODO,
        right: 100,
        bottom: 20,
        left: 'auto' as TODO,
        position: 'fixed' as TODO,
        marginRight: 20,
        backgroundColor: 'lightblue' as TODO,
      },
      editButton: {
        paddingRight: 25,
      },
      editButtonIcon: {
        fill: white,
      },
      deleteButton: {
        fill: grey500,
      },
      columns: {
        id: {
          width: '10%',
        },
        name: {
          width: '40%',
        },
        price: {
          width: '20%',
        },
        category: {
          width: '20%',
        },
        edit: {
          width: '20%',
        },
      },
      dialog: {
        width: '20%',
        maxWidth: 'none',
      },
      drawer: {
        backgroundColor: 'lightgrey',
      },
      saveButton: {},
    };

    const actions = [
      <Button color="primary" onClick={() => this.handleClose(false)}>
        Cancel
      </Button>,
      <Button color="primary" onClick={() => this.handleClose(true)}>
        Confirm
      </Button>,
    ];

    return (
      <PageBase title={'Customers (' + customerList.length + ')'} navigation="React CRM / Customer">
        <div>
          <div>
            <Link to="/customer">
              <Fab
                // backgroundColor="lightblue"
                color="secondary"
                //   style={styles.fab}
                // backgroundColor={pink500}
              >
                <ContentAdd />
              </Fab>
            </Link>
            // backgroundColor={teal500}
            <Fab style={styles.fabSearch} onClick={this.handleToggle}>
              <Search />
            </Fab>
          </div>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

          <Snackbar
            open={this.state.snackbarOpen}
            message={errorMessage ? errorMessage : ''}
            autoHideDuration={this.state.autoHideDuration}
            // onRequestClose={this.handleSnackBarClose}
          />

          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={styles.columns.name} />
                <TableCell style={styles.columns.name}>First Name</TableCell>
                <TableCell style={styles.columns.name}>Last Name</TableCell>
                <TableCell style={styles.columns.price}>Rewards</TableCell>
                <TableCell style={styles.columns.category}>Membership</TableCell>
                <TableCell style={styles.columns.edit}>Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.pageOfItems.map(item => (
                <TableRow key={item.id}>
                  <TableCell style={styles.columns.name}>
                    <img width={40} src={item.avatar} />
                  </TableCell>
                  <TableCell style={styles.columns.name}>{item.firstName}</TableCell>
                  <TableCell style={styles.columns.name}>{item.lastName}</TableCell>
                  <TableCell style={styles.columns.price}>{item.rewards}</TableCell>
                  <TableCell style={styles.columns.category}>{item.membership ? <CheckCircle /> : <Cancel />}</TableCell>
                  <TableCell style={styles.columns.edit}>
                    <Link className="button" to={'/customer/' + item.id}>
                      <Fab color="primary">
                        <ContentCreate />
                      </Fab>
                    </Link>

                    <Fab color="secondary" onClick={() => this.onDelete(item.id)}>
                      <ActionDelete />
                    </Fab>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className={'row center-xs'}>
            <div className={'col-xs-6'}>
              <div className={'box'}>
                {/* <Pagination
                  items={customerList}
                  onChangePage={this.onChangePage}
                /> */}
              </div>
            </div>
          </div>

          <Dialog
            title="Confirm Dialog "
            // actions={actions}
            // modal={true}
            // contentStyle={styles.dialog}
            open={this.state.open}
          >
            {this.state.dialogText}
          </Dialog>

          <Drawer
            // width={300}
            // openSecondary={true}
            open={this.state.searchOpen}
            // containerStyle={styles.drawer}
          >
            {/*<AppBar title="AppBar" />*/}
            <Button variant="contained" style={styles.saveButton} onClick={this.handleSearch} color="secondary">
              Search
            </Button>

            <TextField
              // hintText="First Name"
              // floatingLabelText="First Name"
              name="firstName"
              fullWidth={true}
              value={this.state.search.firstName}
              onChange={this.handleSearchFilter}
            />

            <TextField
              // hintText="Last Name"
              // floatingLabelText="Last Name"
              fullWidth={true}
              name="lastName"
              value={this.state.search.lastName}
              onChange={this.handleSearchFilter}
            />
          </Drawer>
        </div>
      </PageBase>
    );
  }
}

// CustomerListPage.propTypes = {

// };

function mapStateToProps(state) {
  const { customer } = state;
  const { customerList, isFetching, deleteSuccess, isAuthenticated, errorMessage, user } = customer;

  return {
    customerList,
    isFetching,
    isAuthenticated,
    errorMessage,
    deleteSuccess,
    user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    searchCustomer: (filter?:TODO)=>dispatch(thunkSearch(filter)),
    deleteCustomer, //: ()=>dispatch(searchCustomer()),
    sendMessage,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerListPage);
