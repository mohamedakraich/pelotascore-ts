import * as React from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { styled } from "@mui/material/styles";
import { FTLeagueStatsDTO } from "../types/CrossLeaguesStatsDTO";
import { PredictionsDTO } from "../types/PreditionsDTO";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey[300],
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

interface Data {
  id: number;
  status: number;
  date: string;
  league_name: string;
  home_name: string;
  away_name: string;
  ACE: number;
  DOS: number;
  ACEPGOD: number;
  DOSPGOD: number;
  ACEP: number;
  DOSP: number;
  ACEP25: number;
  DOSP25: number;
  BTS: number;
  P25: number;
  P35: number;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

export const calculatePercentage = (value: number, total: number): number => {
  const exactVal = (value / total) * 100;
  const floorVal = Math.floor(exactVal);
  const ceilVal = Math.ceil(exactVal);
  return Math.abs(exactVal - ceilVal) < Math.abs(exactVal - floorVal)
    ? ceilVal
    : floorVal;
};

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "home_name",
    numeric: false,
    disablePadding: false,
    label: "Home",
  },
  {
    id: "away_name",
    numeric: false,
    disablePadding: false,
    label: "Away",
  },
  {
    id: "date",
    numeric: false,
    disablePadding: false,
    label: "Time",
  },
  {
    id: "league_name",
    numeric: false,
    disablePadding: false,
    label: "League",
  },
  {
    id: "ACE",
    numeric: true,
    disablePadding: false,
    label: "1",
  },
  {
    id: "DOS",
    numeric: true,
    disablePadding: false,
    label: "2",
  },
  {
    id: "ACEPGOD",
    numeric: true,
    disablePadding: false,
    label: "ACEPGOD",
  },
  {
    id: "DOSPGOD",
    numeric: true,
    disablePadding: false,
    label: "DOSPGOD",
  },
  {
    id: "ACEP",
    numeric: true,
    disablePadding: false,
    label: "1P",
  },
  {
    id: "ACEP25",
    numeric: true,
    disablePadding: false,
    label: "1P25",
  },

  {
    id: "DOSP",
    numeric: true,
    disablePadding: false,
    label: "2P",
  },
  {
    id: "DOSP25",
    numeric: true,
    disablePadding: false,
    label: "2P25",
  },
  {
    id: "BTS",
    numeric: true,
    disablePadding: false,
    label: "BTS",
  },
  {
    id: "P25",
    numeric: true,
    disablePadding: false,
    label: "P25",
  },
  {
    id: "P35",
    numeric: true,
    disablePadding: false,
    label: "P35",
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface LeaguesStatsTableProps {
  predictions: PredictionsDTO[];
}

const PredictionsTable: React.FC<LeaguesStatsTableProps> = ({
  predictions,
}) => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("league_name");
  const [selected, setSelected] = React.useState<readonly string[]>([]);

  // const statsData = convertFTLeagueStatsDTOToData(stats);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="small"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={predictions.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(predictions, getComparator(order, orderBy)).map(
                (prediction, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, prediction.date)}
                      role="checkbox"
                      tabIndex={-1}
                      key={index}
                    >
                      <TableCell component="th" id={labelId} scope="row">
                        {prediction.home_name}
                      </TableCell>
                      <TableCell align="left">{prediction.away_name}</TableCell>
                      <TableCell align="left">
                        {new Date(prediction.date).toLocaleDateString() +
                          " " +
                          new Date(prediction.date).toLocaleTimeString()}
                      </TableCell>
                      <TableCell align="left">
                        <span
                          className={
                            "flag-icon flag-icon-" + prediction.country_code
                          }
                          style={{ width: "3em", height: "1.5em" }}
                        ></span>
                        {prediction.country + " - " + prediction.league_name}
                      </TableCell>
                      <TableCell align="right">
                        {prediction.ACE + "%"}
                      </TableCell>
                      <TableCell align="right">
                        {prediction.DOS + "%"}
                      </TableCell>
                      <TableCell align="right">
                        {prediction.ACEPGOD + "%"}
                      </TableCell>
                      <TableCell align="right">
                        {prediction.DOSPGOD + "%"}
                      </TableCell>
                      <TableCell align="right">
                        {prediction.ACEP + "%"}
                      </TableCell>
                      <TableCell align="right">
                        {prediction.ACEP25 + "%"}
                      </TableCell>
                      <TableCell align="right">
                        {prediction.DOSP + "%"}
                      </TableCell>
                      <TableCell align="right">
                        {prediction.DOSP25 + "%"}
                      </TableCell>
                      <TableCell align="right">
                        {prediction.BTS + "%"}
                      </TableCell>
                      <TableCell align="right">
                        {prediction.P25 + "%"}
                      </TableCell>
                      <TableCell align="right">
                        {prediction.P35 + "%"}
                      </TableCell>
                    </TableRow>
                  );
                }
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default PredictionsTable;
