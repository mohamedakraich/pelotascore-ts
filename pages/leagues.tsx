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
import { useRouter } from 'next/router';

const HomePage: NextPage = () => {
  const [matches, setMatches] = React.useState<MatchesType>({});
  const [standings, setStandings] = React.useState<StandingsType[]>([]);
  const { query } = useRouter();

  console.log(query);

  const [count, setCount] = React.useState<number>(-1);

  React.useEffect(() => {
    axios
      .get(`/api/leagues/${query.id}`)
      .then((response) => {
        const matches = response.data?.matches as unknown as MatchesType;
        const count = response.data?.count as unknown as number;
        setCount(count);
        setMatches(matches);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [query]);

  React.useEffect(() => {
    axios
      .get(`/api/standings/${query.id}`)
      .then((response) => {
        const standings = response.data
          ?.standings as unknown as StandingsType[];
        setStandings(standings);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [query]);

  return (
    <React.Fragment>
      <Head>
        <title>Soccerstats Fucker</title>
      </Head>
      <Box m={5}>
        <Grid container spacing={2}>
          <Grid item xs={12} md>
            {standings.length > 0 && <StandingsTable standings={standings} />}
          </Grid>
          <Grid item xs={12} md>
            <TableContainer component={Paper} elevation={5}>
              <Table size="small">
                <TableBody>
                  {Object.keys(matches).map((key, index) => (
                    <React.Fragment key={index}>
                      <MatchDayRows matches={matches[key]} />
                    </React.Fragment>
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
