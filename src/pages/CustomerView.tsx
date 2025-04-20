import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import * as service from "../services/customerService";
import { Iconify } from '../components/iconify';
import { Scrollbar } from '../components/scrollbar';

import { TableNoData } from '../components/table/TableNoData';
import { CustomerTableRow } from '../components/customer/CustomerTableRow';
import { CustomerTableHead } from '../components/customer/CustomerTableHead';
import { TableEmptyRows } from '../components/table/TableEmptyRows';
import { CustomerTableToolbar } from '../components/customer/CustomerTableToolbar';
import { emptyRows, applyFilter, getComparator, useTable } from '../components/table/utils';


import { RouterLink } from '../routes/components/RouterLink';
import Slide, { SlideProps } from '@mui/material/Slide';
import Fade from '@mui/material/Fade';
import React from 'react';
import SnapNotice from '../components/controls/SnapNotice';
import { TransitionProps } from '@mui/material/transitions';

// ----------------------------------------------------------------------

export function CustomerView() {
  const [notice, setNotice] = React.useState<{
    open: boolean;
    transition: React.ComponentType<
      TransitionProps & {
        children: React.ReactElement<any, any>;
      }
    >;
  }>({
    open: false,
    transition: Fade,
  });

  const toggleNotice = (open: boolean) => {
    setNotice({
      ...notice,
      open,
    });
  }

  const table = useTable({
    postDeleteRoute: '/customers',
    service,
    toggleNotice
  });

  const _customers = service.getAllItems();

  const [filterName, setFilterName] = useState('');

  const dataFiltered: TODO = applyFilter({
    inputData: _customers as TODO,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  const handleClose = () => {
    setNotice({
      ...notice,
      open: false,
    });
  }

  return (
    <>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Customers
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Iconify icon="mingcute:add-line" />}
          component={RouterLink} href="/customer-form"
        >
          New customer
        </Button>
      </Box>

      <Card>
        <CustomerTableToolbar
          numSelected={table.selected.length}
          filterName={filterName}
          onFilterName={(event: React.ChangeEvent<HTMLInputElement>) => {
            setFilterName(event.target.value);
            table.onResetPage();
          }}
          onMultipleDelete={table.onMultipleDelete}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <CustomerTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={_customers.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    _customers.map((customer: TODO) => customer.id)
                  )
                }
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'email', label: 'Email' },
                  { id: 'mobile', label: 'Mobile' },  
                  { id: 'phone', label: 'Phone' },  
                  // { id: 'billingAddress', label: 'Billing Address' },
                  { id: 'hasItemInShoppingCart', label: 'Cart Has Item', align: 'center' },
                  { id: 'membership', label: 'Membership' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row: TODO) => (
                    <CustomerTableRow
                      key={row.id}
                      row={row}
                      selected={table.selected.includes(row.id)}
                      onSelectRow={() => table.onSelectRow(row.id)}
                      toggleNotice={toggleNotice}
                      onDialogConfirm={table.onDialogConfirm}
                    />
                  ))}

                <TableEmptyRows
                  height={68}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, _customers.length)}
                />

                {notFound && <TableNoData searchQuery={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page}
          count={_customers.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>
      <SnapNotice open={notice.open} transition={notice.transition}
        handleClose={handleClose} />
    </>
    // </DashboardContent>
  );
}
