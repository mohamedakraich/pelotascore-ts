import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  backgroundColor: theme.palette.action.hover,
}));

interface LeagueMatchTableProps {
  matches: MatchStatsDTO[];
}

const LeagueMatchTable: React.FC<LeagueMatchTableProps> = ({ matches }) => {
  return (
    <Box mt={3} component={Paper} elevation={10}>
      <TableContainer>
        <Table
          sx={{ minWidth: 700 }}
          aria-label="customized table"
          size="small"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell align="left">GP</StyledTableCell>
              <StyledTableCell align="left">W%</StyledTableCell>
              <StyledTableCell align="left">LP15</StyledTableCell>
              <StyledTableCell align="left">VP15</StyledTableCell>
              <StyledTableCell align="left">BTS</StyledTableCell>
              <StyledTableCell align="left">TG</StyledTableCell>
              <StyledTableCell align="left">GF</StyledTableCell>
              <StyledTableCell align="left">GA</StyledTableCell>
              <StyledTableCell align="left">P15</StyledTableCell>
              <StyledTableCell align="left">P25</StyledTableCell>
              <StyledTableCell align="left">P35</StyledTableCell>
              <StyledTableCell align="left">PPG</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {matches.map((match) => (
              <React.Fragment key={match.id}>
                <StyledTableRow>
                  <StyledTableCell>{match.home_name}</StyledTableCell>
                  <StyledTableCell rowSpan={2} align="center"></StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                  <StyledTableCell align="left">
                    {match.home_stats.LP15}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {match.home_stats.VP15}
                  </StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    {match.away_name}
                  </StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                  <StyledTableCell align="left">
                    {match.away_stats.LP15}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {match.away_stats.VP15}
                  </StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                </StyledTableRow>
                <TableRow>
                  <TableCell colSpan={14} sx={{ height: 10 }} />
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default LeagueMatchTable;
