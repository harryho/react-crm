import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import * as service from "../services/agentService";
import { Iconify } from '../components/iconify';
import { Scrollbar } from '../components/scrollbar';

import { TableNoData } from '../components/table/TableNoData';
import { AgentTableRow } from '../components/agent/AgentTableRow';
import { AgentTableHead } from '../components/agent/AgentTableHead';
import { TableEmptyRows } from '../components/table/TableEmptyRows';
import { AgentTableToolbar } from '../components/agent/AgentTableToolbar';
import { emptyRows, applyFilter, getComparator, useTable } from '../components/table/utils';

import { RouterLink } from '../routes/components';
import Slide, { SlideProps } from '@mui/material/Slide';
import Fade from '@mui/material/Fade';
import React from 'react';
import SnapNotice from '../components/controls/SnapNotice';
import { TransitionProps } from '@mui/material/transitions';
// ----------------------------------------------------------------------


export function AgentView() {
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
    postDeleteRoute: '/agents',
    service,
    toggleNotice
  });

  const _agents = service.getAllItems();

  const [filterName, setFilterName] = useState('');

  const dataFiltered: TODO = applyFilter({
    inputData: _agents,
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
          Agents
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Iconify icon="mingcute:add-line" />}
          component={RouterLink} href="/agent-form"
        >
          New agent
        </Button>
      </Box>

      <Card>
        <AgentTableToolbar
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
              <AgentTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={_agents.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    _agents.map((agent: Agent) => agent.id)
                  )
                }
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'company', label: 'Company' },
                  { id: 'role', label: 'Role' },
                  { id: 'email', label: 'E-mail' },
                  { id: 'mobile', label: 'Mobile' },
                  { id: 'isVerified', label: 'Verified', align: 'center' },
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
                    <AgentTableRow
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
                  emptyRows={emptyRows(table.page, table.rowsPerPage, _agents.length)}
                />

                {notFound && <TableNoData searchQuery={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page}
          count={_agents.length}
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
