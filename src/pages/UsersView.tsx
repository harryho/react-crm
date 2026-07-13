import { useState } from 'react';
import * as React from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Fade from '@mui/material/Fade';
import { TransitionProps } from '@mui/material/transitions';
import { useLoaderData, useRevalidator } from 'react-router';

import type { User } from '../types';
import { fetchUsers, deleteUser } from '../api/client';
import { Iconify } from '../components/iconify';
import { Scrollbar } from '../components/scrollbar';

import { TableNoData } from '../components/table/TableNoData';
import { UserTableRow } from '../components/user/UserTableRow';
import { UserTableHead } from '../components/user/UserTableHead';
import { UserTableToolbar } from '../components/user/UserTableToolbar';
import { TableEmptyRows } from '../components/table/TableEmptyRows';
import { emptyRows, applyFilter, getComparator, useTable } from '../components/table/utils';

import { RouterLink } from '../routes/components/RouterLink';
import SnapNotice from '../components/controls/SnapNotice';

// ----------------------------------------------------------------------

export function usersLoader() {
  return fetchUsers();
}

export function UsersView() {
  const users = useLoaderData() as User[];
  const revalidator = useRevalidator();

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
    setNotice({ ...notice, open });
  };

  const deleteService = {
    deleteItemById: (id: string) => deleteUser(Number(id)).then(() => revalidator.revalidate()),
  };

  const table = useTable({
    postDeleteRoute: '/users',
    service: deleteService,
    toggleNotice,
  });

  const usersForTable = users.map((user) => ({ ...user, name: `${user.firstName} ${user.lastName}` }));

  const [filterName, setFilterName] = useState('');

  const dataFiltered = applyFilter({
    inputData: usersForTable,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  const handleClose = () => {
    setNotice({ ...notice, open: false });
  };

  const handleDeleteRow = async (userId: number) => {
    const confirmed = await table.onDialogConfirm();
    if (!confirmed) return;
    await deleteUser(userId);
    toggleNotice(true);
    revalidator.revalidate();
    setTimeout(() => toggleNotice(false), 1000);
  };

  return (
    <>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Users
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Iconify icon="mingcute:add-line" />}
          component={RouterLink} href="/user-form"
        >
          New user
        </Button>
      </Box>

      <Card>
        <UserTableToolbar
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
              <UserTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={usersForTable.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    usersForTable.map((user) => String(user.userId))
                  )
                }
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'email', label: 'Email' },
                  { id: 'phone', label: 'Phone' },
                  { id: 'companyName', label: 'Company' },
                  { id: 'location', label: 'Location' },
                  { id: 'isActive', label: 'Status' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => (
                    <UserTableRow
                      key={row.userId}
                      row={row}
                      selected={table.selected.includes(String(row.userId))}
                      onSelectRow={() => table.onSelectRow(String(row.userId))}
                      onDeleteRow={handleDeleteRow}
                    />
                  ))}

                <TableEmptyRows
                  height={68}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, usersForTable.length)}
                />

                {notFound && <TableNoData searchQuery={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page}
          count={usersForTable.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>
      <SnapNotice open={notice.open} transition={notice.transition} handleClose={handleClose} />
    </>
  );
}
