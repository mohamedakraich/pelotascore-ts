import * as React from 'react';
import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { TabPanel } from '../../TabPanel';
import { HTFTStandingsType } from '../../../types/HTFTStandingsType';
import HTFTStandingsTable from './HTFTStandingsTable';

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

interface HTFTStandingsProps {
  standings: {
    overall: HTFTStandingsType[];
    home: HTFTStandingsType[];
    away: HTFTStandingsType[];
  };
}

const HTFTStandings: React.FC<HTFTStandingsProps> = ({ standings }) => {
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
          <StyledTab label="Overall" {...a11yProps(0)} />
          <StyledTab label="home" {...a11yProps(1)} />
          <StyledTab label="Away" {...a11yProps(2)} />
        </StyledTabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Grid container>
          <Grid item xs={12} md>
            {standings.overall.length > 0 && (
              <HTFTStandingsTable standings={standings.overall} />
            )}
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid container>
          <Grid item xs={12} md>
            {standings.home.length > 0 && (
              <HTFTStandingsTable standings={standings.home} />
            )}
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Grid container>
          <Grid item xs={12} md>
            {standings.away.length > 0 && (
              <HTFTStandingsTable standings={standings.away} />
            )}
          </Grid>
        </Grid>
      </TabPanel>
    </Box>
  );
};

export default HTFTStandings;
