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

const HomePage: NextPage = () => {
  const [matches, setMatches] = React.useState<MatchesType>({});
  const [count, setCount] = React.useState<number>(-1);

  React.useEffect(() => {
    axios
      .get('/api/matches')
      .then((response) => {
        const matches = response.data?.matches as unknown as MatchesType;
        const count = response.data?.count as unknown as number;
        setCount(count);
        setMatches(matches);
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
        <Typography variant="h6" gutterBottom>
          All Matches
        </Typography>
        <Grid container>
          <Grid item xs></Grid>
          <Grid item xs={8}>
            <TableContainer component={Paper} elevation={5}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
