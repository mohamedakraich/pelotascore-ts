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
import MatchesTable from '../components/MatchesTable';
import StandingsTable from '../components/StandingsTable';
import { useRouter } from 'next/router';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const HomePage: NextPage = () => {
  const [results, setResults] = React.useState<MatchesType>({});
  const [fixtures, setFixtures] = React.useState<MatchesType>({});
  const [standings, setStandings] = React.useState<StandingsType[]>([]);
  const { query } = useRouter();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  console.log(query);

  const [count, setCount] = React.useState<number>(-1);

  React.useEffect(() => {
    axios
      .get(`/api/results/${query.id}`)
      .then((response) => {
        const resultsResponse = response.data
          ?.matches as unknown as MatchesType;
        const resultsCount = response.data?.count as unknown as number;
        setCount(resultsCount);
        setResults(resultsResponse);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [query]);

  React.useEffect(() => {
    axios
      .get(`/api/fixtures/${query.id}`)
      .then((response) => {
        const fixturesResponse = response.data
          ?.matches as unknown as MatchesType;
        const fixturesCount = response.data?.count as unknown as number;
        setCount(fixturesCount);
        setFixtures(fixturesResponse);
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
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Results" {...a11yProps(0)} />
            <Tab label="Fixtures" {...a11yProps(1)} />
            <Tab label="Standings" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Grid container spacing={2}>
            <Grid item xs={12} md>
              <TableContainer component={Paper} elevation={5}>
                <Table size="small">
                  <TableBody>
                    {Object.keys(results).map((key, index) => (
                      <MatchesTable key={index} matches={results[key]} />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Grid container spacing={2}>
            <Grid item xs={12} md>
              <TableContainer component={Paper} elevation={5}>
                <Table size="small">
                  <TableBody>
                    {Object.keys(fixtures).map((key, index) => (
                      <React.Fragment key={index}>
                        <MatchesTable matches={fixtures[key]} />
                      </React.Fragment>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} md>
              {standings.length > 0 && <StandingsTable standings={standings} />}
            </Grid>
          </Grid>
        </TabPanel>
      </Box>
    </React.Fragment>
  );
};

export default HomePage;
