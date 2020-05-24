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
import CheckCircle from "@material-ui/icons/CheckCircle";
import Cancel from "@material-ui/icons/Cancel";
import { pink, grey, green, common } from "@material-ui/core/colors";
import { Container, Tooltip } from "@material-ui/core";

const grey500 = grey["500"];
const green400 = green["400"];
const white = common.white;

const styles = {
  searchButton: {
    marginRight: 20,
  },
  editButton: {
    marginRight: "1em",
    color: white,
    backgroundColor: green400,
  },
  editButtonIcon: {
    fill: white,
  },
  deleteButton: {
    color: "grey",
    fill: grey500,
  },
  columns: {
    width10: {
      width: "10%",
    },
  },
  row: {
    margin: "1.5em",
    width: "95%",
  },
  pagination: {
    width: 350,
    margin: "0 auto",
    paddingTop: 10,
  },
};

interface DataTableProps {
  model: string;
  items: { [key: string]: TODO }[];
  totalPages: number;
  page: number;
  headers: string[];
  dataKeys: string[];
  onPageChange: (_event: React.ChangeEvent<unknown>, page: number) => void;
  onDelete: (_event: React.ChangeEvent<unknown>, id?: number) => void;
}


function DataTable<DataTableProps>({
  model,
  items,
  dataKeys,
  totalPages,
  page,
  headers,
  onPageChange,
  onDelete,
}) {
  // =>
  const renderData = (dataKey: string, data: TODO) => {
    if (dataKey === "avatar") {
      return <img width={35} src={data[dataKey]} />;
    } else if (dataKey === "membership") {
      return data[dataKey] ? <CheckCircle /> : <Cancel />;
    } else if (dataKey === "actions") {
      return (
        <>
          <Tooltip title="Edit" aria-label="edit">
            <Fab
              size="small"
              style={styles.editButton}
              // ?path=/story/ is used for storybook 
              href={ model 
                && model.includes("?path=/story/") ?`${model}`: `${model}/${data.id}`}
            >
              <ContentCreate />
            </Fab>
          </Tooltip>
          <Tooltip title="Delete" aria-label="delete">
            <Fab
              size="small"
              style={styles.deleteButton}
              value={data.id}
              onClick={(e) => onDelete(e, data.id)}
            >
              <ActionDelete />
            </Fab>
          </Tooltip>
        </>
      );
    } else {
      if (dataKey.includes(".")) {
        const keys = dataKey.split(".");

        return <>{data[keys[0]][keys[1]]}</>;
      } else return <>{data[dataKey]}</>;
    }
  };

  const headerCount = headers.length;

  return (
    <React.Fragment>
      <Table size="small">
        <TableHead>
          <TableRow>
            {headers.length > 0 &&
              headers.map((header) => (
                <TableCell
                  key={header}
                  component="th"
                  style={styles.columns.width10}
                >
                  {header}
                </TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {items.length > 0 ? (
            items.map((item) => (
              <TableRow key={item.id}>
                {headers &&
                  dataKeys.map((dataKey) => (
                    <TableCell
                      key={dataKey}
                      component="th"
                      style={styles.columns.width10}
                    >
                      {renderData(dataKey, item)}
                    </TableCell>
                  ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={headerCount}>
                <p style={{ textAlign: "center" }}>No Data Found !</p>
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
}

export default DataTable;
