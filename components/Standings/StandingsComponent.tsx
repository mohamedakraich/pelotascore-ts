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
import MatchesTable from '../MatchesTable';
import StandingsTable from '../StandingsTable';
import { useRouter } from 'next/router';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { styled } from '@mui/material/styles';
import { StyledTab, TabPanel } from '../../pages/leagues';

const a11yProps = (index: number) => {
  return {
    id: `standings-tab-${index}`,
    'aria-controls': `standings-tabpanel-${index}`,
  };
};

interface StandingsComponentProps {
  standings: StandingsType[];
}

const StandingsComponent: React.FC<StandingsComponentProps> = ({
  standings,
}) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', mt: 2 }}>
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
          <StyledTab label="Standings" {...a11yProps(0)} />
          <StyledTab label="Form" {...a11yProps(1)} />
          <StyledTab label="Under/Over" {...a11yProps(2)} />
          <StyledTab label="HT/FT" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Grid container p={3}>
          <Grid item xs={12} md>
            {standings.length > 0 && <StandingsTable standings={standings} />}
          </Grid>
        </Grid>
      </TabPanel>
    </Box>
  );
};

export default StandingsComponent;
