import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { StandingsType } from "../../types/StandingsType";
import { TeamStatsDTO } from "../../types/CrossTeamStatsDTO";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey[300],
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  /*'&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },*/
  // hide last border
  /*'&:last-child td, &:last-child th': {
    border: 0,
  },*/
}));

interface StandingsTableProps {
  standings: TeamStatsDTO[];
}

const TeamStatsStandingsTable: React.FC<StandingsTableProps> = ({
  standings,
}) => {
  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">#</StyledTableCell>
            <StyledTableCell align="left">Team</StyledTableCell>
            <StyledTableCell align="left">League</StyledTableCell>
            <StyledTableCell align="center">GP</StyledTableCell>
            <StyledTableCell align="center">%</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {standings.map((team, index) => (
            <StyledTableRow key={team.id}>
              <StyledTableCell align="center">{index + 1}</StyledTableCell>
              <StyledTableCell align="left">
                <span
                  className={"flag-icon flag-icon-" + team.country_code}
                  style={{ width: "3em", height: "1.5em" }}
                ></span>
                {team.team_name}
              </StyledTableCell>
              <StyledTableCell align="left">
                {team.country + " - " + team.league_name}
              </StyledTableCell>
              <StyledTableCell align="center">{team.GP}</StyledTableCell>
              <StyledTableCell align="center">
                {team.percentage}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TeamStatsStandingsTable;
