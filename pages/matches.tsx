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
import LeagueMatchTable from '../components/LeagueMatchTable';

const MatchesPage: NextPage = () => {
  const [matches, setMatches] = React.useState<MatchStatsType>({});
  const { query } = useRouter();

  console.log(query);

  const [count, setCount] = React.useState<number>(-1);

  React.useEffect(() => {
    axios
      .get(`/api/matches`)
      .then((response) => {
        const matches = response.data?.matches as unknown as MatchStatsType;
        const count = response.data?.count as unknown as number;
        setCount(count);
        setMatches(matches);
        console.log(matches);
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
          <Grid item xs={12}>
            {Object.keys(matches).map((key) => (
              <LeagueMatchTable key={key} matches={matches[key]} />
            ))}
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default MatchesPage;
