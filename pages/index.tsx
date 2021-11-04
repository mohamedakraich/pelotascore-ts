import * as React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

const HomePage: NextPage = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Soccerstats Fucker</title>
      </Head>
      <Box m={5}>
        <Typography variant="h6" gutterBottom>
          Welcome to PelotaScore
        </Typography>
      </Box>
    </React.Fragment>
  );
};

export default HomePage;
