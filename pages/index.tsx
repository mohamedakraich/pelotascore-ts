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
import MatchDayRows from '../components/MatchesTable';
import StandingsTable from '../components/Standings/StandingsTable';
import { useRouter } from 'next/router';
import LeagueMatchTable from '../components/LeagueMatchTable';
import { styled } from '@mui/material/styles';
import Layout from '../components/Layout';
import { FixtureStatsMap } from '../types/FixtureStatsMap';

const HomePage: NextPage = () => {
  const [fixtures, setFixtures] = React.useState<FixtureStatsMap>({});
  const { query } = useRouter();

  console.log(query);

  const [count, setCount] = React.useState<number>(-1);

  React.useEffect(() => {
    axios
      .get(`/api/matches`)
      .then((response) => {
        const fixturesMap = response.data
          ?.fixtures as unknown as FixtureStatsMap;
        const count = response.data?.count as unknown as number;
        setCount(count);
        setFixtures(fixturesMap);

        console.log(fixturesMap);
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
      <Box m={1}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" color="black">
              Number of matches: {count}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {fixtures['england_1'] && (
              <LeagueMatchTable
                code="gb-eng"
                fixtures={fixtures['england_1']}
              />
            )}
            {fixtures['france_1'] && (
              <LeagueMatchTable code="fr" fixtures={fixtures['france_1']} />
            )}
            {fixtures['germany_1'] && (
              <LeagueMatchTable fixtures={fixtures['germany_1']} />
            )}
            {fixtures['italy_1'] && (
              <LeagueMatchTable code="it" fixtures={fixtures['italy_1']} />
            )}
            {fixtures['spain_1'] && (
              <LeagueMatchTable code="es" fixtures={fixtures['spain_1']} />
            )}
            {fixtures['portugal_1'] && (
              <LeagueMatchTable code="pt" fixtures={fixtures['portugal_1']} />
            )}
            {fixtures['netherlands_1'] && (
              <LeagueMatchTable
                code="nl"
                fixtures={fixtures['netherlands_1']}
              />
            )}
            {fixtures['brazil_1'] && (
              <LeagueMatchTable code="br" fixtures={fixtures['brazil_1']} />
            )}
            {fixtures['england_2'] && (
              <LeagueMatchTable
                code="gb-eng"
                fixtures={fixtures['england_2']}
              />
            )}
            {fixtures['england_3'] && (
              <LeagueMatchTable
                code="gb-eng"
                fixtures={fixtures['england_3']}
              />
            )}
            {fixtures['england_4'] && (
              <LeagueMatchTable
                code="gb-eng"
                fixtures={fixtures['england_4']}
              />
            )}
            {fixtures['england_5'] && (
              <LeagueMatchTable
                code="gb-eng"
                fixtures={fixtures['england_5']}
              />
            )}
            {fixtures['france_2'] && (
              <LeagueMatchTable fixtures={fixtures['france_2']} />
            )}
            {fixtures['france_3'] && (
              <LeagueMatchTable fixtures={fixtures['france_3']} />
            )}
            {fixtures['germany_2'] && (
              <LeagueMatchTable fixtures={fixtures['germany_2']} />
            )}
            {fixtures['spain_2'] && (
              <LeagueMatchTable code="es" fixtures={fixtures['spain_2']} />
            )}
            {fixtures['netherlands_2'] && (
              <LeagueMatchTable
                code="nl"
                fixtures={fixtures['netherlands_2']}
              />
            )}
            {fixtures['brazil_2'] && (
              <LeagueMatchTable code="br" fixtures={fixtures['brazil_2']} />
            )}
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default HomePage;
