import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { styled } from "@mui/material/styles";
import { TabPanel } from "../TabPanel";
import CrossTeamStatsDTO from "../../types/CrossTeamStatsDTO";
import TeamStatsStandingsTable from "./TeamStatsStandingsTable";

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

interface TeamsStatsContainerProps {
  stats: CrossTeamStatsDTO;
}

const TeamsStatsContainer: React.FC<TeamsStatsContainerProps> = ({ stats }) => {
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
          <StyledTab label="P15" {...a11yProps(0)} />
          <StyledTab label="P25" {...a11yProps(1)} />
          <StyledTab label="P35" {...a11yProps(2)} />
          <StyledTab label="P15 (1st half)" {...a11yProps(3)} />
          <StyledTab label="P15 (2nd half)" {...a11yProps(4)} />
        </StyledTabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Grid container>
          <Grid item xs={12} md>
            {stats.P15.length > 0 && (
              <TeamStatsStandingsTable standings={stats.P15} />
            )}
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid container>
          <Grid item xs={12} md>
            {stats.P25.length > 0 && (
              <TeamStatsStandingsTable standings={stats.P25} />
            )}
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Grid container>
          <Grid item xs={12} md>
            {stats.P35.length > 0 && (
              <TeamStatsStandingsTable standings={stats.P35} />
            )}
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Grid container>
          <Grid item xs={12} md>
            {stats._1HT_P15.length > 0 && (
              <TeamStatsStandingsTable standings={stats._1HT_P15} />
            )}
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Grid container>
          <Grid item xs={12} md>
            {stats._2HT_P15.length > 0 && (
              <TeamStatsStandingsTable standings={stats._2HT_P15} />
            )}
          </Grid>
        </Grid>
      </TabPanel>
    </Box>
  );
};

export default TeamsStatsContainer;
