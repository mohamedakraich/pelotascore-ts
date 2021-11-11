import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import { StyledTab, TabPanel } from '../../pages/leagues';
import NormalStandings from './NormalStandings';
import { StandingsDTOType, StandingsType } from '../../types/StandingsType';

const a11yProps = (index: number) => {
  return {
    id: `standings-tab-${index}`,
    'aria-controls': `standings-tabpanel-${index}`,
  };
};

interface StandingsComponentProps {
  standings: StandingsDTOType;
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
      <Box>
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
        <NormalStandings standings={standings} />
      </TabPanel>
    </Box>
  );
};

export default StandingsComponent;
