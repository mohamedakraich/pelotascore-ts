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
import { useRouter } from 'next/router';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { styled } from '@mui/material/styles';
import StandingsContainer from '../components/Standings/StandingsContainer';
import { StandingsDTOType } from '../types/StandingsDTOType';
import { TabPanel } from '../components/TabPanel';

interface StyledTabProps {
  label: string;
}

export const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  backgroundColor: theme.palette.grey[300],
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
  },
}));

const StyledBox = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
  })
);

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const HomePage: NextPage = () => {
  const [results, setResults] = React.useState<MatchesType>({});
  const [fixtures, setFixtures] = React.useState<MatchesType>({});
  const [standings, setStandings] = React.useState<StandingsDTOType>({
    normal: { overall: [], home: [], away: [] },
    form: { overall: [], home: [], away: [] },
    goals: { overall: [], home: [], away: [] },
    HTFT: { overall: [], home: [], away: [] },
  });
  const { query } = useRouter();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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
          ?.standings as unknown as StandingsDTOType;
        setStandings(standings);
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
        <Box sx={{ borderBottom: 5, borderColor: 'primary.main' }}>
          <Tabs
            TabIndicatorProps={{
              style: {
                display: 'none',
              },
            }}
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <StyledTab label="Results" {...a11yProps(0)} />
            <StyledTab label="Fixtures" {...a11yProps(1)} />
            <StyledTab label="Standings" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Grid container p={3}>
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
          <Grid container p={3}>
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
          <StandingsContainer standings={standings} />
        </TabPanel>
      </Box>
    </React.Fragment>
  );
};

export default HomePage;
