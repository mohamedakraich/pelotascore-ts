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
import { Grid, gridClasses, Typography } from '@mui/material';

const calculatePercentage = (value: number, total: number) => {
  return Math.floor((value / total) * 100) + '%';
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
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  backgroundColor: theme.palette.action.hover,
}));

interface LeagueMatchTableProps {
  matches: MatchStatsDTO[];
}

export const StyledGrid = styled(Grid)(({ theme }) => ({
  shouldForwardProp: () => true,
  [`&.${gridClasses.container}`]: {
    backgroundColor: theme.palette.primary.main,
  },
  minHeight: 50,
  padding: theme.spacing(1),
}));

const LeagueMatchTable: React.FC<LeagueMatchTableProps> = ({ matches }) => {
  return (
    <Box mt={2} component={Paper} elevation={10}>
      <Grid container direction="column">
        <Grid item>
          <StyledGrid container alignItems="center" direction="row">
            <Grid item>
              <Typography variant="h6" color="white">
                {matches[0].league_name || ''}
              </Typography>
            </Grid>
          </StyledGrid>
        </Grid>

        <Grid item>
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
                  <StyledTableCell align="left">W</StyledTableCell>
                  <StyledTableCell align="left">S2G</StyledTableCell>
                  <StyledTableCell align="left">C2G</StyledTableCell>
                  <StyledTableCell align="left">S3G</StyledTableCell>
                  <StyledTableCell align="left">C3G</StyledTableCell>
                  <StyledTableCell align="left">FHS1G</StyledTableCell>
                  <StyledTableCell align="left">FHC1G</StyledTableCell>
                  <StyledTableCell align="left">FHS2G</StyledTableCell>
                  <StyledTableCell align="left">FHC2G</StyledTableCell>
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
                      <StyledTableCell rowSpan={2} align="center">
                        {match.date.split('T')[1]?.split(':')[0] +
                          ':' +
                          match.date.split('T')[1]?.split(':')[1]}
                      </StyledTableCell>
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
                          match.home_stats.FHS1G,
                          match.home_stats.GP
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {calculatePercentage(
                          match.home_stats.FHC1G,
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
                      <StyledTableCell align="left">
                        {calculatePercentage(
                          match.home_stats.P25,
                          match.home_stats.GP
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {calculatePercentage(
                          match.home_stats.P35,
                          match.home_stats.GP
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {calculatePercentage(
                          match.home_stats.P45,
                          match.home_stats.GP
                        )}
                      </StyledTableCell>
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
                          match.away_stats.FHS1G,
                          match.away_stats.GP
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {calculatePercentage(
                          match.away_stats.FHC1G,
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
                      <StyledTableCell align="left">
                        {calculatePercentage(
                          match.away_stats.P25,
                          match.away_stats.GP
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {calculatePercentage(
                          match.away_stats.P35,
                          match.away_stats.GP
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {calculatePercentage(
                          match.away_stats.P45,
                          match.away_stats.GP
                        )}
                      </StyledTableCell>
                    </StyledTableRow>
                    <TableRow>
                      <TableCell colSpan={14} sx={{ height: 10 }} />
                    </TableRow>
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LeagueMatchTable;
