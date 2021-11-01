import * as React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Box from '@mui/material/Box';
import axios from 'axios';
import FixtureTable from '../components/FixtureTable';
import { Typography } from '@mui/material';

const HomePage: NextPage = () => {
  const [fixtures, setFixtures] = React.useState<Fixture[]>([]);
  const [count, setCount] = React.useState<number>(-1);

  React.useEffect(() => {
    axios
      .get('/api/statistics')
      .then((response) => {
        const fixtures = response.data?.fixtures as unknown as Fixture[];
        const count = response.data?.count as unknown as number;
        setCount(count);
        setFixtures(fixtures);
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
          {count}
        </Typography>
        {fixtures.length > 0 &&
          fixtures.map((fixture) => (
            <React.Fragment key={fixture.id}>
              <FixtureTable fixture={fixture} />
            </React.Fragment>
          ))}
      </Box>
    </React.Fragment>
  );
};

export default HomePage;
