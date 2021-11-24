import * as React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Box from "@mui/material/Box";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import MatchDayRows from "../components/MatchesTable";
import StandingsTable from "../components/Standings/StandingsTable";
import { useRouter } from "next/router";
import LeagueMatchTable from "../components/LeagueFixtureStatsTable";
import { styled } from "@mui/material/styles";
import Layout from "../components/Layout";
import { FixtureStatsMap } from "../types/FixtureStatsMap";
import { all_leagues } from "../data/all_leagues";
import { leagues } from "../data/leagues";

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
            {leagues.map((league) => {
              return (
                fixtures[league.id] && (
                  <LeagueMatchTable
                    code={league.countryCode}
                    fixtures={fixtures[league.id]}
                  />
                )
              );
            })}
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default HomePage;
