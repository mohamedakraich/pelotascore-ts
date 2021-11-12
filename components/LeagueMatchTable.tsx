import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Grid, gridClasses, Typography } from '@mui/material';
import { FixtureStatsDTO, FixtureStatsType } from '../types/FixtureStatsDTO';

export type StatsMode = 'Overall' | 'Home/Away';

const StyledSelectedButton = styled(Button, { shouldForwardProp: () => true })(
  ({ theme }) => ({
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    '&:hover': {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
    },
    marginLeft: theme.spacing(1),
  })
);

const StyledNonSelectedButton = styled(Button, {
  shouldForwardProp: () => true,
})(({ theme }) => ({
  backgroundColor: 'transparent',
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  marginLeft: theme.spacing(1),
}));

const calculatePercentage = (value: number, total: number) => {
  const exactVal = (value / total) * 100;
  const floorVal = Math.floor(exactVal);
  const ceilVal = Math.ceil(exactVal);
  return Math.abs(exactVal - ceilVal) < Math.abs(exactVal - floorVal)
    ? ceilVal + '%'
    : floorVal + '%';
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

interface FixtureStatsTableBodyProps {
  fixtures: FixtureStatsType[];
}

const FixtureStatsTableBody: React.FC<FixtureStatsTableBodyProps> = ({
  fixtures,
}) => {
  return (
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
                fixture.home_stats._1HT_P15,
                fixture.home_stats.GP
              )}
            </StyledTableCell>
            <StyledTableCell align="center">
              {calculatePercentage(
                fixture.home_stats._2HT_P15,
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
                fixture.home_stats.S3G,
                fixture.home_stats.GP
              )}
            </StyledTableCell>
            <StyledTableCell align="center">
              {calculatePercentage(
                fixture.home_stats.C3G,
                fixture.home_stats.GP
              )}
            </StyledTableCell>

            <StyledTableCell align="center">
              {calculatePercentage(
                fixture.home_stats.P25,
                fixture.home_stats.GP
              )}
            </StyledTableCell>
            <StyledTableCell align="center">
              {calculatePercentage(
                fixture.home_stats.P35,
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
                fixture.away_stats._1HT_P15,
                fixture.away_stats.GP
              )}
            </StyledTableCell>
            <StyledTableCell align="center">
              {calculatePercentage(
                fixture.away_stats._2HT_P15,
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
                fixture.away_stats.S3G,
                fixture.away_stats.GP
              )}
            </StyledTableCell>
            <StyledTableCell align="center">
              {calculatePercentage(
                fixture.away_stats.C3G,
                fixture.away_stats.GP
              )}
            </StyledTableCell>
            <StyledTableCell align="center">
              {calculatePercentage(
                fixture.away_stats.P25,
                fixture.away_stats.GP
              )}
            </StyledTableCell>
            <StyledTableCell align="center">
              {calculatePercentage(
                fixture.away_stats.P35,
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

const LeagueMatchTable: React.FC<LeagueMatchTableProps> = ({ fixtures }) => {
  const [statsMode, setStatsMode] = useState<StatsMode>('Home/Away');

  const homeAwayfixturesStats: FixtureStatsType[] = fixtures.map((fixture) => ({
    id: fixture.id,
    status: fixture.status,
    date: fixture.date,
    league_name: fixture.league_name,
    home_name: fixture.home_name,
    away_name: fixture.away_name,
    home_stats: fixture.home_away.home,
    away_stats: fixture.home_away.away,
  }));

  const overallfixturesStats: FixtureStatsType[] = fixtures.map((fixture) => ({
    id: fixture.id,
    status: fixture.status,
    date: fixture.date,
    league_name: fixture.league_name,
    home_name: fixture.home_name,
    away_name: fixture.away_name,
    home_stats: fixture.overall.home,
    away_stats: fixture.overall.away,
  }));

  const handleStatsModeToggle = (mode: StatsMode) => {
    setStatsMode(mode);
  };

  return (
    <Box mt={2} component={Paper} elevation={10}>
      <Grid container direction="column">
        <Grid item>
          <StyledGrid container alignItems="center" direction="row">
            <Grid item sx={{ marginRight: 'auto' }}>
              <Typography variant="h6" color="white">
                {fixtures[0].league_name || ''}
              </Typography>
            </Grid>
            {statsMode === 'Overall' ? (
              <>
                <Grid item>
                  <StyledSelectedButton
                    size="small"
                    onClick={() => handleStatsModeToggle('Overall')}
                  >
                    Overall
                  </StyledSelectedButton>
                </Grid>
                <Grid item>
                  <StyledNonSelectedButton
                    size="small"
                    onClick={() => handleStatsModeToggle('Home/Away')}
                  >
                    Home/Away
                  </StyledNonSelectedButton>
                </Grid>
              </>
            ) : (
              <>
                <Grid item>
                  <StyledNonSelectedButton
                    size="small"
                    onClick={() => handleStatsModeToggle('Overall')}
                  >
                    Overall
                  </StyledNonSelectedButton>
                </Grid>
                <Grid item>
                  <StyledSelectedButton
                    size="small"
                    onClick={() => handleStatsModeToggle('Home/Away')}
                  >
                    Home/Away
                  </StyledSelectedButton>
                </Grid>
              </>
            )}
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
                  <StyledTableCell align="center">GP</StyledTableCell>
                  <StyledTableCell align="center">W</StyledTableCell>
                  <StyledTableCell align="center">FTS</StyledTableCell>
                  <StyledTableCell align="center">CS</StyledTableCell>
                  <StyledTableCell align="center">BTS</StyledTableCell>
                  <StyledTableCell align="center">+1.5 (1HT)</StyledTableCell>
                  <StyledTableCell align="center">+1.5 (2HT)</StyledTableCell>
                  <StyledTableCell align="center">S2G</StyledTableCell>
                  <StyledTableCell align="center">C2G</StyledTableCell>
                  <StyledTableCell align="center">S3G</StyledTableCell>
                  <StyledTableCell align="center">C3G</StyledTableCell>
                  <StyledTableCell align="center">P25</StyledTableCell>
                  <StyledTableCell align="center">P35</StyledTableCell>
                </TableRow>
              </TableHead>
              {statsMode === 'Overall' ? (
                <FixtureStatsTableBody fixtures={overallfixturesStats} />
              ) : (
                <FixtureStatsTableBody fixtures={homeAwayfixturesStats} />
              )}
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LeagueMatchTable;
