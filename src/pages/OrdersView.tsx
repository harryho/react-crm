import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import { useLoaderData } from 'react-router';

import type { Order, User } from '../types';
import { fetchOrders, fetchUsers } from '../api/client';
import { Iconify } from '../components/iconify';
import { Scrollbar } from '../components/scrollbar';
import { Label } from '../components/label';
import { TableNoData } from '../components/table/TableNoData';
import { TableEmptyRows } from '../components/table/TableEmptyRows';
import { emptyRows } from '../components/table/utils';
import { useRouter } from '../routes/hooks/use-router';

// ----------------------------------------------------------------------

const STATUS_COLOR: Record<string, 'default' | 'success' | 'warning' | 'error' | 'info'> = {
  pending: 'warning',
  paid: 'info',
  processing: 'info',
  shipped: 'info',
  delivered: 'success',
  cancelled: 'error',
};

export async function ordersLoader() {
  const [orders, users] = await Promise.all([fetchOrders(), fetchUsers()]);
  return { orders, users };
}

export default function OrdersView() {
  const { orders, users } = useLoaderData() as { orders: Order[]; users: User[] };
  const router = useRouter();

  const [filterName, setFilterName] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const userNameById = new Map(users.map((u) => [u.userId, `${u.firstName} ${u.lastName}`]));

  const filtered = orders.filter((order) => {
    if (!filterName) return true;
    const customerName = userNameById.get(order.userId) ?? '';
    const haystack = `${order.orderNumber} ${customerName}`.toLowerCase();
    return haystack.includes(filterName.toLowerCase());
  });

  const notFound = !filtered.length && !!filterName;

  return (
    <>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Orders
        </Typography>
      </Box>

      <Card>
        <Toolbar
          sx={{
            height: 96,
            display: 'flex',
            justifyContent: 'space-between',
            p: (theme) => theme.spacing(0, 1, 0, 3),
          }}
        >
          <OutlinedInput
            fullWidth
            value={filterName}
            onChange={(event) => {
              setFilterName(event.target.value);
              setPage(0);
            }}
            placeholder="Search order number or customer..."
            startAdornment={
              <InputAdornment position="start">
                <Iconify width={20} icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            }
            sx={{ maxWidth: 320 }}
          />
        </Toolbar>

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Order Number</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Ordered At</TableCell>
                  <TableCell align="right">Items</TableCell>
                  <TableCell align="right">Grand Total</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((order) => (
                    <TableRow hover key={order.orderId}>
                      <TableCell component="th" scope="row">
                        {order.orderNumber}
                      </TableCell>
                      <TableCell>{userNameById.get(order.userId) ?? `User ${order.userId}`}</TableCell>
                      <TableCell>{new Date(order.orderedAt).toLocaleDateString()}</TableCell>
                      <TableCell align="right">{order.items.length}</TableCell>
                      <TableCell align="right">
                        {order.currency} {order.grandTotal.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Label color={STATUS_COLOR[order.status] ?? 'default'}>
                          {order.status.toUpperCase()}
                        </Label>
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title="View details">
                          <IconButton onClick={() => router.push(`/orders/${order.orderId}`)}>
                            <Iconify icon="solar:eye-bold" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}

                <TableEmptyRows height={68} emptyRows={emptyRows(page, rowsPerPage, filtered.length)} />

                {notFound && <TableNoData searchQuery={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={page}
          count={filtered.length}
          rowsPerPage={rowsPerPage}
          onPageChange={(_event, newPage) => setPage(newPage)}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          }}
        />
      </Card>
    </>
  );
}
