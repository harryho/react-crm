import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import Pagination from '@material-ui/lab/Pagination';
import TableRow from '@material-ui/core/TableRow';
import Fab from '@material-ui/core/Fab';
import ContentCreate from '@material-ui/icons/Create';
import ActionDelete from '@material-ui/icons/Delete';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Cancel from '@material-ui/icons/Cancel';
import { pink, grey, green, common } from '@material-ui/core/colors';
import { Container } from '@material-ui/core';

const pink500 = pink['500'];
const grey500 = grey['500'];
const green400 = green['400'];
const white = common.white;

const styles = {
  searchButton: {
    marginRight: 20,
  },
  editButton: {
    marginRight: '1em',
    color: white,
    backgroundColor: green400,
    // width: 36,
    // height: 36,
  },
  editButtonIcon: {
    fill: white,
  },
  deleteButton: {
    color: 'grey',
    fill: grey500,
    // width: 36,
    // height: 36,
  },
  columns: {
    width10: {
      width: '10%',
    },
  },
  row: {
    margin: '1.5em',
    width: '95%',
  },
  pagination: {
    width: 350,
    margin: '0 auto',
    paddingTop: 10,
  },
};

interface DataTableProps {
  items: { [key: string]: TODO }[];
  totalPages: number;
  page: number;
  headers: string[];
  dataKeys: string[];
  onPageChange: (_event: React.ChangeEvent<unknown>, page: number) => void;
  onDelete: (_event: React.ChangeEvent<unknown>, id?: number) => void;
}

const DataTable: React.FC<DataTableProps> = ({ items, dataKeys, totalPages, page, headers, onPageChange, onDelete }) => {
  const renderData = (dataKey: string, data: TODO) => {
    if (dataKey === 'avatar') {
      return <img width={35} src={data[dataKey]} />;
    } else if (dataKey === 'membership') {
      return data[dataKey] ? <CheckCircle /> : <Cancel />;
    } else {
      return <>{data[dataKey]}</>;
    }
  };

  const headerCount = headers.length;

  return (
    <React.Fragment>
      <Table size="small">
        <TableHead>
          <TableRow>
            {headers.length > 0 &&
              headers.map(header => (
                <TableCell key={header} component="th" style={styles.columns.width10}>
                  {header}
                </TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {items.length > 0 ? (
            items.map(item => (
              <TableRow key={item.id}>
                {headers &&
                  dataKeys.map(dataKey => (
                    <TableCell key={dataKey} component="th" style={styles.columns.width10}>
                      {renderData(dataKey, item)}
                    </TableCell>
                  ))}
                <TableCell key={item.id} style={styles.columns.width10}>
                  <Fab size="small" style={styles.editButton} href={`customer/${item.id}`}>
                    <ContentCreate />
                  </Fab>
                  <Fab size="small" style={styles.deleteButton} value={item.id} onClick={e => onDelete(e, item.id)}>
                    <ActionDelete />
                  </Fab>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={headerCount}>
                <p style={{ textAlign: 'center' }}>No Data Found !</p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {items.length > 0 && (
        <Container style={styles.pagination}>
          <Pagination
            // size="small"
            count={totalPages}
            page={page}
            variant="outlined"
            color="primary"
            onChange={onPageChange}
          />
        </Container>
      )}
    </React.Fragment>
  );
};

export default DataTable;
