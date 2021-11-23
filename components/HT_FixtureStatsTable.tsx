import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Grid, gridClasses } from "@mui/material";
import {
  FT_FixtureStatsType,
  HT_FixtureStatsType,
} from "../types/FixtureStatsDTO";

const calculatePercentage = (value: number, total: number) => {
  const exactVal = (value / total) * 100;
  const floorVal = Math.floor(exactVal);
  const ceilVal = Math.ceil(exactVal);
  return Math.abs(exactVal - ceilVal) < Math.abs(exactVal - floorVal)
    ? ceilVal + "%"
    : floorVal + "%";
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  backgroundColor: theme.palette.action.hover,
}));

export const StyledGrid = styled(Grid)(({ theme }) => ({
  shouldForwardProp: () => true,
  [`&.${gridClasses.container}`]: {
    backgroundColor: theme.palette.primary.main,
  },
  minHeight: 50,
  padding: theme.spacing(1),
}));

interface HT_FixtureStatsTableProps {
  fixtures: HT_FixtureStatsType[];
}

interface HT_FixtureStatsTableBodyProps {
  fixtures: HT_FixtureStatsType[];
}

const HT_FixtureStatsTableBody: React.FC<HT_FixtureStatsTableBodyProps> = ({
  fixtures,
}) => {
  return (
    <TableBody>
      {fixtures.map((fixture) => (
        <React.Fragment key={fixture.id}>
          <StyledTableRow>
            <StyledTableCell>{fixture.home_name}</StyledTableCell>
            <StyledTableCell rowSpan={2} align="center">
              {fixture.status === 99
                ? "pp."
                : fixture.date.split("T")[1]?.split(":")[0] +
                  ":" +
                  fixture.date.split("T")[1]?.split(":")[1]}
            </StyledTableCell>
            <StyledTableCell align="center">
              {fixture.home_stats.GP}
            </StyledTableCell>
            <StyledTableCell align="center">
              {calculatePercentage(fixture.home_stats.W, fixture.home_stats.GP)}
            </StyledTableCell>
            <StyledTableCell align="center">
              {calculatePercentage(
                fixture.home_stats.FTS,
                fixture.home_stats.GP
              )}
            </StyledTableCell>
            <StyledTableCell align="center">
              {calculatePercentage(
                fixture.home_stats.CS,
                fixture.home_stats.GP
              )}
            </StyledTableCell>
            <StyledTableCell align="center">
              {calculatePercentage(
                fixture.home_stats.BTS,
                fixture.home_stats.GP
              )}
            </StyledTableCell>
            <StyledTableCell align="center">
              {calculatePercentage(
                fixture.home_stats.S1G,
                fixture.home_stats.GP
              )}
            </StyledTableCell>
            <StyledTableCell align="center">
              {calculatePercentage(
                fixture.home_stats.C1G,
                fixture.home_stats.GP
              )}
            </StyledTableCell>
            <StyledTableCell align="center">
              {calculatePercentage(
                fixture.home_stats.S2G,
                fixture.home_stats.GP
              )}
            </StyledTableCell>
            <StyledTableCell align="center">
              {calculatePercentage(
                fixture.home_stats.C2G,
                fixture.home_stats.GP
              )}
            </StyledTableCell>

            <StyledTableCell align="center">
              {calculatePercentage(
                fixture.home_stats.P15,
                fixture.home_stats.GP
              )}
            </StyledTableCell>
            <StyledTableCell align="center">
              {calculatePercentage(
                fixture.home_stats.P25,
                fixture.home_stats.GP
              )}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell component="th" scope="row">
              {fixture.away_name}
            </StyledTableCell>
            <StyledTableCell align="center">
              {fixture.away_stats.GP}
            </StyledTableCell>
            <StyledTableCell align="center">
              {calculatePercentage(fixture.away_stats.W, fixture.away_stats.GP)}
            </StyledTableCell>
            <StyledTableCell align="center">
              {calculatePercentage(
                fixture.away_stats.FTS,
                fixture.away_stats.GP
              )}
            </StyledTableCell>
            <StyledTableCell align="center">
              {calculatePercentage(
                fixture.away_stats.CS,
                fixture.away_stats.GP
              )}
            </StyledTableCell>
            <StyledTableCell align="center">
              {calculatePercentage(
                fixture.away_stats.BTS,
                fixture.away_stats.GP
              )}
            </StyledTableCell>
            <StyledTableCell align="center">
              {calculatePercentage(
                fixture.away_stats.S1G,
                fixture.away_stats.GP
              )}
            </StyledTableCell>
            <StyledTableCell align="center">
              {calculatePercentage(
                fixture.away_stats.C1G,
                fixture.away_stats.GP
              )}
            </StyledTableCell>
            <StyledTableCell align="center">
              {calculatePercentage(
                fixture.away_stats.S2G,
                fixture.away_stats.GP
              )}
            </StyledTableCell>
            <StyledTableCell align="center">
              {calculatePercentage(
                fixture.away_stats.C2G,
                fixture.away_stats.GP
              )}
            </StyledTableCell>
            <StyledTableCell align="center">
              {calculatePercentage(
                fixture.away_stats.P15,
                fixture.away_stats.GP
              )}
            </StyledTableCell>
            <StyledTableCell align="center">
              {calculatePercentage(
                fixture.away_stats.P25,
                fixture.away_stats.GP
              )}
            </StyledTableCell>
          </StyledTableRow>
          <TableRow>
            <TableCell colSpan={14} sx={{ height: 10 }} />
          </TableRow>
        </React.Fragment>
      ))}
    </TableBody>
  );
};

const HT_FixtureStatsTable: React.FC<HT_FixtureStatsTableProps> = ({
  fixtures,
}) => {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 700 }} aria-label="customized table" size="small">
        <TableHead>
          <TableRow>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell align="center">GP</StyledTableCell>
            <StyledTableCell align="center">W</StyledTableCell>
            <StyledTableCell align="center">FTS</StyledTableCell>
            <StyledTableCell align="center">CS</StyledTableCell>
            <StyledTableCell align="center">BTS</StyledTableCell>
            <StyledTableCell align="center">S1G</StyledTableCell>
            <StyledTableCell align="center">C1G</StyledTableCell>
            <StyledTableCell align="center">S2G</StyledTableCell>
            <StyledTableCell align="center">C2G</StyledTableCell>{" "}
            <StyledTableCell align="center">P15</StyledTableCell>
            <StyledTableCell align="center">P25</StyledTableCell>
          </TableRow>
        </TableHead>
        <HT_FixtureStatsTableBody fixtures={fixtures} />
      </Table>
    </TableContainer>
  );
};

export default HT_FixtureStatsTable;
