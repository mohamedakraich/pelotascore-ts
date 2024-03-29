import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import { StyledTab } from '../../pages/leagues';
import NormalStandings from './NormalStandings';
import { StandingsDTOType } from '../../types/StandingsDTOType';
import HTFTStandings from './HTFTStandings/HTFTStandings';
import GoalsStandingsContainer from './GoalsStandings/GoalsStandings';
import { TabPanel } from '../TabPanel';

const a11yProps = (index: number) => {
  return {
    id: `standings-tab-${index}`,
    'aria-controls': `standings-tabpanel-${index}`,
  };
};

interface StandingsContainerProps {
  standings: StandingsDTOType;
}

const StandingsContainer: React.FC<StandingsContainerProps> = ({
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
          <StyledTab label="Goals" {...a11yProps(2)} />
          <StyledTab label="HT/FT" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <NormalStandings standings={standings.normal} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <NormalStandings standings={standings.form} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <GoalsStandingsContainer standings={standings.goals} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <HTFTStandings standings={standings.HTFT} />
      </TabPanel>
    </Box>
  );
};

export default StandingsContainer;
