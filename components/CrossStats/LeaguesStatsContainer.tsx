import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { styled } from "@mui/material/styles";
import { StandingsType } from "../../types/StandingsType";
import { TabPanel } from "../TabPanel";
import StandingsTable from "../Standings/StandingsTable";
import LeaguesStatsTable from "./LeaguesStatsTable";
import CrossLeaguesStatsDTO from "../../types/CrossLeaguesStatsDTO";
import FTLeaguesStatsTable from "./FTLeaguesStatsTable";
import HTLeaguesStatsTable from "./HTLeaguesStatsTable";

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
    "& .MuiTabs-indicator": {
      height: "100%",
      backgroundColor: "rgba(255, 255, 255, .2)",
      borderRadius: theme.spacing(1),
    },
  })
);

const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  backgroundColor: "transparent",
  color: "#fff",
  "&.Mui-selected": {
    color: "#fff",
  },
}));

const a11yProps = (index: number) => {
  return {
    id: `standings-tab-${index}`,
    "aria-controls": `standings-tabpanel-${index}`,
  };
};

interface LeaguesStatsContainerProps {
  stats: CrossLeaguesStatsDTO;
}

const LeaguesStatsContainer: React.FC<LeaguesStatsContainerProps> = ({
  stats,
}) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ backgroundColor: "primary.main" }}>
        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <StyledTab label="Full time" {...a11yProps(0)} />
          <StyledTab label="1st half" {...a11yProps(1)} />
          <StyledTab label="2nd half" {...a11yProps(2)} />
        </StyledTabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Grid container>
          <Grid item xs={12} md>
            <FTLeaguesStatsTable stats={stats.FT} />
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid container>
          <Grid item xs={12} md>
            <HTLeaguesStatsTable stats={stats._1HT} />
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Grid container>
          <Grid item xs={12} md>
            <HTLeaguesStatsTable stats={stats._2HT} />
          </Grid>
        </Grid>
      </TabPanel>
    </Box>
  );
};

export default LeaguesStatsContainer;
