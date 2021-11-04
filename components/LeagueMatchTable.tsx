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

const calculatePercentage = (value: number, total: number) => {
  return Math.floor((value / total) * 100) + '%';
};

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
              <StyledTableCell align="left">S2G%</StyledTableCell>
              <StyledTableCell align="left">C2G%</StyledTableCell>
              <StyledTableCell align="left">S3G%</StyledTableCell>
              <StyledTableCell align="left">C3G%</StyledTableCell>
              <StyledTableCell align="left">FHS2G%</StyledTableCell>
              <StyledTableCell align="left">FHC2G%</StyledTableCell>
              <StyledTableCell align="left">FHP15</StyledTableCell>
              <StyledTableCell align="left">P25</StyledTableCell>
              <StyledTableCell align="left">P35</StyledTableCell>
              <StyledTableCell align="left">P45</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {matches.map((match) => (
              <React.Fragment key={match.id}>
                <StyledTableRow>
                  <StyledTableCell>{match.home_name}</StyledTableCell>
                  <StyledTableCell rowSpan={2} align="center"></StyledTableCell>
                  <StyledTableCell align="left">
                    {match.home_stats.GP}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {calculatePercentage(
                      match.home_stats.W,
                      match.home_stats.GP
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {calculatePercentage(
                      match.home_stats.S2G,
                      match.home_stats.GP
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {calculatePercentage(
                      match.home_stats.C2G,
                      match.home_stats.GP
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {calculatePercentage(
                      match.home_stats.S3G,
                      match.home_stats.GP
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {calculatePercentage(
                      match.home_stats.C3G,
                      match.home_stats.GP
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {calculatePercentage(
                      match.home_stats.FHS2G,
                      match.home_stats.GP
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {calculatePercentage(
                      match.home_stats.FHC2G,
                      match.home_stats.GP
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {calculatePercentage(
                      match.home_stats.FHP15,
                      match.home_stats.GP
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    {match.away_name}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {match.away_stats.GP}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {calculatePercentage(
                      match.away_stats.W,
                      match.away_stats.GP
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {calculatePercentage(
                      match.away_stats.S2G,
                      match.away_stats.GP
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {calculatePercentage(
                      match.away_stats.C2G,
                      match.away_stats.GP
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {calculatePercentage(
                      match.away_stats.S3G,
                      match.away_stats.GP
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {calculatePercentage(
                      match.away_stats.C3G,
                      match.away_stats.GP
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {calculatePercentage(
                      match.away_stats.FHS2G,
                      match.away_stats.GP
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {calculatePercentage(
                      match.away_stats.FHC2G,
                      match.away_stats.GP
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {calculatePercentage(
                      match.away_stats.FHP15,
                      match.away_stats.GP
                    )}
                  </StyledTableCell>
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
