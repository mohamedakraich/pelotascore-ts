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
import { FixtureStatsDTO } from '../types/FixtureStatsDTO';

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
  fixtures: FixtureStatsDTO[];
}

export const StyledGrid = styled(Grid)(({ theme }) => ({
  shouldForwardProp: () => true,
  [`&.${gridClasses.container}`]: {
    backgroundColor: theme.palette.primary.main,
  },
  minHeight: 50,
  padding: theme.spacing(1),
}));

const LeagueMatchTable: React.FC<LeagueMatchTableProps> = ({ fixtures }) => {
  return (
    <Box mt={2} component={Paper} elevation={10}>
      <Grid container direction="column">
        <Grid item>
          <StyledGrid container alignItems="center" direction="row">
            <Grid item>
              <Typography variant="h6" color="white">
                {fixtures[0].league_name || ''}
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
                  <StyledTableCell align="left">FTS</StyledTableCell>
                  <StyledTableCell align="left">CS</StyledTableCell>
                  <StyledTableCell align="left">BTS</StyledTableCell>
                  <StyledTableCell align="left">+1.5 (1HT)</StyledTableCell>
                  <StyledTableCell align="left">+1.5 (2HT)</StyledTableCell>
                  <StyledTableCell align="left">S2G</StyledTableCell>
                  <StyledTableCell align="left">C2G</StyledTableCell>
                  <StyledTableCell align="left">S3G</StyledTableCell>
                  <StyledTableCell align="left">C3G</StyledTableCell>
                  <StyledTableCell align="left">P25</StyledTableCell>
                  <StyledTableCell align="left">P35</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fixtures.map((fixture) => (
                  <React.Fragment key={fixture.id}>
                    <StyledTableRow>
                      <StyledTableCell>{fixture.home_name}</StyledTableCell>
                      <StyledTableCell rowSpan={2} align="center">
                        {fixture.date.split('T')[1]?.split(':')[0] +
                          ':' +
                          fixture.date.split('T')[1]?.split(':')[1]}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {fixture.overall.home.GP}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {calculatePercentage(
                          fixture.overall.home.W,
                          fixture.overall.home.GP
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {calculatePercentage(
                          fixture.overall.home.FTS,
                          fixture.overall.home.GP
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {calculatePercentage(
                          fixture.overall.home.CS,
                          fixture.overall.home.GP
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {calculatePercentage(
                          fixture.overall.home.BTS,
                          fixture.overall.home.GP
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {calculatePercentage(
                          fixture.overall.home._1HT_P15,
                          fixture.overall.home.GP
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {calculatePercentage(
                          fixture.overall.home._2HT_P15,
                          fixture.overall.home.GP
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {calculatePercentage(
                          fixture.overall.home.S2G,
                          fixture.overall.home.GP
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {calculatePercentage(
                          fixture.overall.home.C2G,
                          fixture.overall.home.GP
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {calculatePercentage(
                          fixture.overall.home.S3G,
                          fixture.overall.home.GP
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {calculatePercentage(
                          fixture.overall.home.C3G,
                          fixture.overall.home.GP
                        )}
                      </StyledTableCell>

                      <StyledTableCell align="left">
                        {calculatePercentage(
                          fixture.overall.home.P25,
                          fixture.overall.home.GP
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {calculatePercentage(
                          fixture.overall.home.P35,
                          fixture.overall.home.GP
                        )}
                      </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <StyledTableCell component="th" scope="row">
                        {fixture.away_name}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {fixture.overall.away.GP}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {calculatePercentage(
                          fixture.overall.away.W,
                          fixture.overall.away.GP
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {calculatePercentage(
                          fixture.overall.away.FTS,
                          fixture.overall.away.GP
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {calculatePercentage(
                          fixture.overall.away.CS,
                          fixture.overall.away.GP
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {calculatePercentage(
                          fixture.overall.away.BTS,
                          fixture.overall.away.GP
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {calculatePercentage(
                          fixture.overall.away._1HT_P15,
                          fixture.overall.away.GP
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {calculatePercentage(
                          fixture.overall.away._2HT_P15,
                          fixture.overall.away.GP
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {calculatePercentage(
                          fixture.overall.away.S2G,
                          fixture.overall.away.GP
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {calculatePercentage(
                          fixture.overall.away.C2G,
                          fixture.overall.away.GP
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {calculatePercentage(
                          fixture.overall.away.S3G,
                          fixture.overall.away.GP
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {calculatePercentage(
                          fixture.overall.away.C3G,
                          fixture.overall.away.GP
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {calculatePercentage(
                          fixture.overall.away.P25,
                          fixture.overall.away.GP
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {calculatePercentage(
                          fixture.overall.away.P35,
                          fixture.overall.away.GP
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
