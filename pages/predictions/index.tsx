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
import MatchDayRows from "../../components/MatchesTable";
import StandingsTable from "../../components/Standings/StandingsTable";
import { useRouter } from "next/router";
import LeagueFixtureStatsTable from "../../components/LeagueFixtureStatsTable";
import { styled } from "@mui/material/styles";
import Layout from "../../components/Layout";
import { FixtureStatsMap } from "../../types/FixtureStatsMap";
import { all_leagues } from "../../data/all_leagues";
import { leagues } from "../../data/leagues";
import { FixtureStatsDTO } from "../../types/FixtureStatsDTO";
import PredictionsTable from "../../components/PredictionsTable";
import { PredictionsDTO } from "../../types/PreditionsDTO";

const HomePage: NextPage = () => {
  const [predictions, setPredictions] = React.useState<PredictionsDTO[]>([]);
  const { query } = useRouter();

  console.log(query);

  const [count, setCount] = React.useState<number>(-1);

  React.useEffect(() => {
    axios
      .get(`/api/predictions`)
      .then((response) => {
        const predictionsData = response.data
          ?.predictions as unknown as PredictionsDTO[];
        const count = response.data?.count as unknown as number;
        setCount(count);
        setPredictions(predictionsData);

        console.log(predictionsData);
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
            <PredictionsTable predictions={predictions} />
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default HomePage;
