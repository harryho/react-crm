import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

// import { _orders } from '../_mock';

import * as service from "../services/orderService";

import { Iconify } from '../components/iconify';
import { Scrollbar } from '../components/scrollbar';

import { TableNoData } from '../components/table/TableNoData';
import { OrderTableRow } from '../components/order/OrderTableRow';
import { OrderTableHead } from '../components/order/OrderableHead';
import { TableEmptyRows } from '../components/table/TableEmptyRows';
import { OrderTableToolbar } from '../components/order/OrderTableToolbar';
import { emptyRows, applyFilter, getComparator, useTable } from '../components/table/utils';

import { RouterLink } from '../routes/components';
import Slide, { SlideProps } from '@mui/material/Slide';
import Fade from '@mui/material/Fade';
import React from 'react';
import SnapNotice from '../components/controls/SnapNotice';
import { TransitionProps } from '@mui/material/transitions';

// ----------------------------------------------------------------------



export default function OrdersView() {
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
    postDeleteRoute: '/orders',
    service,
    toggleNotice
  });

  const _orders = service.getAllItems();

  const [filterName, setFilterName] = useState('');

  const dataFiltered: TODO = applyFilter({
    inputData: _orders,
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
          Orders
        </Typography>
        <Button
          variant="contained"
           color="primary"
          startIcon={<Iconify icon="mingcute:add-line" />}
             component={RouterLink} href="/order-form"
        >
          New order
        </Button>
      </Box>

      <Card > 
        <OrderTableToolbar
          numSelected={table.selected.length}
          filterName={filterName}
          onFilterName={(event: React.ChangeEvent<HTMLInputElement>) => {
            setFilterName(event.target.value);
            table.onResetPage();
          }}
          onMultipleDelete={table.onMultipleDelete}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset'  }}>
            <Table sx={{ minWidth: 800 }}>
              <OrderTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={_orders.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    _orders.map((order: Order) => order.id)
                  )
                }
                headLabel={[
                  { id: 'id', label: 'Order Number' },
                  { id: 'item', label: 'Item' },
                  { id: 'amount', label: 'Total Amount', align: 'right' },
                  // { id: 'discount', label: 'Discount', align: 'right' },
                  { id: 'promoCode', label: 'Promote Code', align: 'center' },
                  { id: 'customer', label: 'Customer', align: 'left' },
                  { id: 'isDelayed', label: 'Is Delayed', align: 'center' },

                  { id: 'status', label: 'Status' },
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
                    <OrderTableRow
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
                  emptyRows={emptyRows(table.page, table.rowsPerPage, _orders.length)}
                />

                {notFound && <TableNoData searchQuery={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page}
          count={_orders.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>
      <SnapNotice open={notice.open} transition={notice.transition}
        handleClose={handleClose} />
      </>
  );
}

// ----------------------------------------------------------------------
