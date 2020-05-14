import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import Pagination from '@material-ui/lab/Pagination';
import TableRow from '@material-ui/core/TableRow';
import Fab from '@material-ui/core/Fab';
import ContentCreate from '@material-ui/icons/Create';
import ActionDelete from '@material-ui/icons/Delete';
import ContentAdd from '@material-ui/icons/Add';
import Search from '@material-ui/icons/Search';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Cancel from '@material-ui/icons/Cancel';
import PageBase from '../components/PageBase';
import AppBar from '@material-ui/core/AppBar';
import { connect } from 'react-redux';
import { deleteCustomer } from '../actions/customer';
import Dialog from '@material-ui/core/Dialog';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import { teal, pink, grey, green, common } from '@material-ui/core/colors';
import { sendMessage } from '../store/actions';
import { thunkSearch } from '../services/thunks';
import { LIST_CUSTOMER, HttpMethod } from '../store/types';
import { Customer } from '../types';
import { Container, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

const teal500 = teal['500'];
const pink500 = pink['500'];
const grey500 = grey['500'];
const green400 = green['400'];
const white = common.white;

interface CustomerListProps {
  pageCount: number;
  isFetching: boolean;
  customerList: Customer[];
  searchCustomer: typeof thunkSearch;
  deleteCustomer: typeof deleteCustomer;
  sendMessage: typeof sendMessage;
  deleteSuccess: boolean;
  errorMessage: string;
}

interface CustomerListState {
  open: boolean;
  searchOpen: boolean;
  snackbarOpen: boolean;
  autoHideDuration: 1500;
  page: number;
  items: Customer[];
  customerList: Customer[];
  totalPages: number;
  customerId: null;
  dialogText: string; //'Are you sure to do this?',
  search: {
    firstName: string;
    lastName: string;
  };
}

class CustomerListPage extends React.Component<CustomerListProps, CustomerListState> {
  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.onEdit = this.onEdit.bind(this);
  }

  state: CustomerListState = {
    open: false,
    searchOpen: false,
    snackbarOpen: false,
    autoHideDuration: 1500,
    page: 1,
    items: [],
    totalPages: 1,
    customerId: null,
    customerList: [],
    dialogText: 'Are you sure to do this?',
    search: {
      firstName: '',
      lastName: '',
    },
  };

  apiAction = {
    type: LIST_CUSTOMER,
    endpoint: 'customers/',
    method: HttpMethod.GET,
    filters: this.state.search,
  };

  componentDidMount() {
    this.props.searchCustomer(this.apiAction);
  }

  /* eslint-disable */
  componentDidUpdate(prevProps) {
    // reset page if items array has changed
    if (this.props.customerList !== prevProps.customerList) {
      this.setState({ customerList: this.props.customerList });
      const page = 1;
      const totalPages = Math.ceil(this.props.customerList.length / 10);
      const items = this.props.customerList.slice(0, 10);
      this.setState({ page, totalPages, items });
    }
  }

  onPageChange(event: React.ChangeEvent<unknown>, page: number) {
    const startIndex = (page - 1) * 10;
    const endIndex = startIndex + 10;
    const items = this.props.customerList.slice(startIndex, endIndex);
    this.setState({ page, items });
  }

  onDelete(id) {
    if (id) {
      this.handleOpen(id);
    }
  }

  onEdit(id) {
    // window.history.push(`/customer/${id}`);
    // window.Location.pathname=`/customer/${id}`;
  }

  handleToggle() {
    this.setState({ searchOpen: !this.state.searchOpen } as TODO);
  }

  handleSearch() {
    this.setState({ searchOpen: !this.state.searchOpen });
    this.props.searchCustomer(this.apiAction); //this.state.search);
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
      this.props.searchCustomer(this.apiAction);
    }
  }

  render() {
    const { errorMessage, customerList } = this.props;

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
        backgroundColor: teal500 as TODO,
      },
      editButton: {
        marginRight: '1em',
        color: white,
        backgroundColor: green400,
      },
      editButtonIcon: {
        fill: white,
      },
      deleteButton: {
        color: 'grey',
        fill: grey500,
      },
      columns: {
        id: {
          width: '10%',
        },
        name: {
          width: '10%',
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

    const dialogButtons = [
      <Fab color="primary" variant="extended" onClick={() => this.handleClose(false)}>
        Cancel
      </Fab>,
      <Fab color="secondary" variant="extended" onClick={() => this.handleClose(true)}>
        Confirm
      </Fab>,
    ];
    return (
      <PageBase title={'Customers (' + customerList.length + ')'} navigation="React CRM / Customer">
        <div>
          <div>
            <Link to="/customer">
              <Fab size="small" color="secondary" style={styles.fab}>
                <ContentAdd />
              </Fab>
            </Link>
            // backgroundColor={teal500}
            <Fab size="small" style={styles.fabSearch} onClick={this.handleToggle}>
              <Search />
            </Fab>
          </div>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

          <Snackbar
            open={this.state.snackbarOpen}
            message={errorMessage ? errorMessage : ''}
            autoHideDuration={this.state.autoHideDuration}
            onClose={this.handleSnackBarClose}
          />

          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell component="th" style={styles.columns.name} />
                <TableCell style={styles.columns.name}>First Name</TableCell>
                <TableCell style={styles.columns.name}>Last Name</TableCell>
                <TableCell style={styles.columns.price}>Rewards</TableCell>
                <TableCell style={styles.columns.category}>Membership</TableCell>
                <TableCell style={styles.columns.edit}>Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.items.length > 0 &&
                this.state.items.map(item => (
                  <TableRow key={item.id}>
                    <TableCell style={styles.columns.name}>
                      <img width={40} src={item.avatar} />
                    </TableCell>
                    <TableCell style={styles.columns.name}>{item.firstName}</TableCell>
                    <TableCell style={styles.columns.name}>{item.lastName}</TableCell>
                    <TableCell style={styles.columns.price}>{item.rewards}</TableCell>
                    <TableCell style={styles.columns.category}>{item.membership ? <CheckCircle /> : <Cancel />}</TableCell>
                    <TableCell style={styles.columns.edit}>
                      <Fab size="small" style={styles.editButton} href={`customer/${item.id}`}>
                        <ContentCreate />
                      </Fab>

                      <Fab size="small" style={styles.deleteButton} onClick={() => this.onDelete(item.id)}>
                        <ActionDelete />
                      </Fab>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>

          <Container maxWidth="xs" style={{ paddingTop: '1em' }}>
            <Pagination
              count={this.state.totalPages}
              page={this.state.page}
              variant="outlined"
              color="primary"
              onChange={this.onPageChange}
            />
          </Container>

          <Dialog title="Confirm Dialog " style={styles.dialog} open={this.state.open} onClick={() => this.handleClose(false)}>
            <DialogTitle id="alert-dialog-title">{'Alert'}</DialogTitle>

            <DialogContent>
              <DialogContentText id="alert-dialog-description">{this.state.dialogText}</DialogContentText>
            </DialogContent>

            <DialogActions>{dialogButtons}</DialogActions>
          </Dialog>

          <Drawer anchor="right" open={this.state.searchOpen} onClose={this.handleToggle}>
            <AppBar title="AppBar" />
            <Button variant="contained" style={styles.saveButton} onClick={this.handleSearch} color="secondary">
              Search
            </Button>

            <TextField
              placeholder="First Name"
              label="First Name"
              name="firstName"
              fullWidth={true}
              value={this.state.search.firstName}
              onChange={this.handleSearchFilter}
            />

            <TextField
              placeholder="Last Name"
              label="Last Name"
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

function mapStateToProps(state) {
  const { customer } = state;
  const { customerList, isFetching, errorMessage, user } = customer;

  return {
    customerList,
    isFetching,
    errorMessage,
    user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    searchCustomer: (action?: TODO) => dispatch(thunkSearch(action)),
    deleteCustomer: (id: TODO) => dispatch(thunkSearch(id)),
    sendMessage,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerListPage);
