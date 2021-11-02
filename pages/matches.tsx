import * as React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Box from '@mui/material/Box';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import MatchDayRows from '../components/MatchDayRows';
import StandingsTable from '../components/StandingsTable';

const HomePage: NextPage = () => {
  const [matches, setMatches] = React.useState<MatchesType>({});
  const [standings, setStandings] = React.useState<StandingsType[]>([]);

  const [count, setCount] = React.useState<number>(-1);

  React.useEffect(() => {
    axios
      .get('/api/matches')
      .then((response) => {
        const matches = response.data?.matches as unknown as MatchesType;
        const count = response.data?.count as unknown as number;
        setCount(count);
        setMatches(matches);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  React.useEffect(() => {
    axios
      .get('/api/standings')
      .then((response) => {
        const standings = response.data
          ?.standings as unknown as StandingsType[];
        setStandings(standings);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Soccerstats Fucker</title>
      </Head>
      <Box m={5}>
        <Grid container spacing={2}>
          <Grid item xs>
            {standings.length > 0 && <StandingsTable standings={standings} />}
          </Grid>
          <Grid item xs>
            <TableContainer component={Paper} elevation={5}>
              <Table size="small">
                <TableBody>
                  {Object.keys(matches).map((key) => (
                    <MatchDayRows matches={matches[key]} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default HomePage;
