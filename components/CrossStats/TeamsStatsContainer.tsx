import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { styled } from '@mui/material/styles';
import { StandingsType } from '../../types/StandingsType';
import { TabPanel } from '../TabPanel';
import StandingsTable from '../Standings/StandingsTable';
import { CrossLeaguesStats } from '../../types/StandingsDTOType';

interface StyledTabProps {
  label: string;
}

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const StyledTabs = styled((props: StyledTabsProps) => <Tabs {...props} />)(
  ({ theme }) => ({
    padding: 5,
    backgroundColor: theme.palette.primary.main,
    '& .MuiTabs-indicator': {
      height: '100%',
      backgroundColor: 'rgba(255, 255, 255, .2)',
      borderRadius: theme.spacing(1),
    },
  })
);

const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  backgroundColor: 'transparent',
  color: '#fff',
  '&.Mui-selected': {
    color: '#fff',
  },
}));

const a11yProps = (index: number) => {
  return {
    id: `standings-tab-${index}`,
    'aria-controls': `standings-tabpanel-${index}`,
  };
};

interface TeamsStatsContainerProps {
  standings: CrossLeaguesStats;
}

const TeamsStatsContainer: React.FC<TeamsStatsContainerProps> = ({
  standings,
}) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ backgroundColor: 'primary.main' }}>
        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <StyledTab label="1.5+" {...a11yProps(2)} />
          <StyledTab label="2.5+" {...a11yProps(0)} />
          <StyledTab label="3.5+" {...a11yProps(1)} />
          <StyledTab label="1.5+(1st half)" {...a11yProps(2)} />
          <StyledTab label="1.5+(2nd half)" {...a11yProps(0)} />
        </StyledTabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Grid container>
          <Grid item xs={12} md>
            {standings.FT.length > 0 && (
              <StandingsTable standings={standings.FT} />
            )}
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid container>
          <Grid item xs={12} md>
            {standings._1HT.length > 0 && (
              <StandingsTable standings={standings.FT} />
            )}
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Grid container>
          <Grid item xs={12} md>
            {standings._2HT.length > 0 && (
              <StandingsTable standings={standings.FT} />
            )}
          </Grid>
        </Grid>
      </TabPanel>
    </Box>
  );
};

export default TeamsStatsContainer;
