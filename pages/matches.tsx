import * as React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Box from '@mui/material/Box';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const HomePage: NextPage = () => {
  const [matches, setMatches] = React.useState<Match[]>([]);
  const [count, setCount] = React.useState<number>(-1);

  React.useEffect(() => {
    axios
      .get('/api/matches')
      .then((response) => {
        const matches = response.data?.matches as unknown as Match[];
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
          <Grid item xs={6}></Grid>
          <Grid item xs={6}>
            <TableContainer component={Paper} elevation={10}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableBody>
                  {matches
                    .filter((match) => match.status === 1)
                    .map((match) => (
                      <TableRow
                        key={match.id}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {match.date}
                        </TableCell>
                        <TableCell align="right">{match.home_name}</TableCell>
                        <TableCell align="center">{`${match.home_FullTimeGoals} - ${match.away_FullTimeGoals}`}</TableCell>
                        <TableCell align="left">{match.away_name}</TableCell>
                        <TableCell align="left">
                          {'(' +
                            match.home_FirstHalfGoals +
                            ' - ' +
                            match.away_FirstHalfGoals +
                            ')'}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>

            <br />
            <br />
            <br />
            <br />
            <br />

            <TableContainer component={Paper} elevation={10}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableBody>
                  {matches
                    .filter((match) => match.status === 0)
                    .map((match) => (
                      <TableRow
                        key={match.id}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {match.date}
                        </TableCell>
                        <TableCell align="right">{match.home_name}</TableCell>
                        <TableCell align="center">{match.time}</TableCell>
                        <TableCell align="left">{match.away_name}</TableCell>
                        <TableCell align="left"></TableCell>
                      </TableRow>
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
