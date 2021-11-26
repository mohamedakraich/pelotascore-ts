import * as React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Box from "@mui/material/Box";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import MatchesTable from "../components/MatchesTable";
import { useRouter } from "next/router";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { styled } from "@mui/material/styles";
import StandingsContainer from "../components/Standings/StandingsContainer";
import { TabPanel } from "../components/TabPanel";
import LeaguesStatsContainer from "../components/CrossStats/LeaguesStatsContainer";
import TeamsStatsContainer from "../components/CrossStats/TeamsStatsContainer";
import CrossLeaguesStatsDTO from "../types/CrossLeaguesStatsDTO";
import CrossTeamStatsDTO from "../types/CrossTeamStatsDTO";

interface StyledTabProps {
  label: string;
}

export const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  backgroundColor: theme.palette.grey[300],
  "&.Mui-selected": {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const CrossPage: NextPage = () => {
  const [crossLeagueStats, setCrossLeagueStats] =
    React.useState<CrossLeaguesStatsDTO>({ FT: [], _1HT: [], _2HT: [] });
  const [crossTeamStats, setCrossTeamStats] = React.useState<CrossTeamStatsDTO>(
    { P15: [], P25: [], P35: [], _1HT_P15: [], _2HT_P15: [] }
  );
  const { query } = useRouter();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    axios
      .get(`/api/leagues`)
      .then((response) => {
        const leaguesResponse = response.data
          ?.leagues as unknown as CrossLeaguesStatsDTO;
        setCrossLeagueStats(leaguesResponse);
        console.log(leaguesResponse);
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
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 5, borderColor: "primary.main" }}>
          <Tabs
            TabIndicatorProps={{
              style: {
                display: "none",
              },
            }}
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <StyledTab label="Leagues (All)" {...a11yProps(0)} />
            <StyledTab label="Teams (Top 50)" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <LeaguesStatsContainer stats={crossLeagueStats} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TeamsStatsContainer stats={crossTeamStats} />
        </TabPanel>
      </Box>
    </React.Fragment>
  );
};

export default CrossPage;
