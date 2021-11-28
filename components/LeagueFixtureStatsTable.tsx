import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Grid, gridClasses, Typography } from "@mui/material";
import {
  FixtureStatsDTO,
  FixtureStatsType,
  FT_FixtureStatsType,
  HT_FixtureStatsType,
} from "../types/FixtureStatsDTO";
import FT_FixtureStatsTable from "./FT_FixtureStatsTable";
import HT_FixtureStatsTable from "./HT_FixtureStatsTable";

export type StatsMode = "FT" | "1HT" | "2HT";

const StyledSelectedButton = styled(Button, { shouldForwardProp: () => true })(
  ({ theme }) => ({
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    "&:hover": {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
    },
    marginLeft: theme.spacing(1),
  })
);

const StyledNonSelectedButton = styled(Button, {
  shouldForwardProp: () => true,
})(({ theme }) => ({
  backgroundColor: "transparent",
  color: theme.palette.common.white,
  "&:hover": {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  marginLeft: theme.spacing(1),
}));

const calculatePercentage = (value: number, total: number) => {
  const exactVal = (value / total) * 100;
  const floorVal = Math.floor(exactVal);
  const ceilVal = Math.ceil(exactVal);
  return Math.abs(exactVal - ceilVal) < Math.abs(exactVal - floorVal)
    ? ceilVal + "%"
    : floorVal + "%";
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  backgroundColor: theme.palette.action.hover,
}));

interface LeagueMatchTableProps {
  code?: string;
  fixtures: FixtureStatsDTO[];
}

export const StyledGrid = styled(Grid)(({ theme }) => ({
  shouldForwardProp: () => true,
  [`&.${gridClasses.container}`]: {
    backgroundColor: theme.palette.primary.main,
  },
  minHeight: 50,
  padding: theme.spacing(1),
}));

interface FixtureStatsTableBodyProps {
  fixtures: (FT_FixtureStatsType | HT_FixtureStatsType)[];
}

const LeagueFixtureStatsTable: React.FC<LeagueMatchTableProps> = ({
  code,
  fixtures,
}) => {
  const [statsMode, setStatsMode] = useState<StatsMode>("2HT");

  const FT_FixturesStats: FT_FixtureStatsType[] = fixtures.map((fixture) => ({
    id: fixture.id,
    status: fixture.status,
    date: fixture.date,
    league_name: fixture.league_name,
    home_name: fixture.home_name,
    away_name: fixture.away_name,
    home_stats: fixture.FT.home,
    away_stats: fixture.FT.away,
  }));

  const _1HT_FixturesStats: HT_FixtureStatsType[] = fixtures.map((fixture) => ({
    id: fixture.id,
    status: fixture.status,
    date: fixture.date,
    league_name: fixture.league_name,
    home_name: fixture.home_name,
    away_name: fixture.away_name,
    home_stats: fixture._1HT.home,
    away_stats: fixture._1HT.away,
  }));

  const _2HT_FixturesStats: HT_FixtureStatsType[] = fixtures.map((fixture) => ({
    id: fixture.id,
    status: fixture.status,
    date: fixture.date,
    league_name: fixture.league_name,
    home_name: fixture.home_name,
    away_name: fixture.away_name,
    home_stats: fixture._2HT.home,
    away_stats: fixture._2HT.away,
  }));

  const handleStatsModeToggle = (mode: StatsMode) => {
    setStatsMode(mode);
  };

  return (
    <Box mt={2} component={Paper} elevation={10}>
      <Grid container direction="column">
        <Grid item>
          <StyledGrid container alignItems="center" direction="row">
            <Grid item sx={{ marginRight: "auto" }}>
              <Grid container alignItems="center" direction="row">
                <Grid item>
                  <span
                    className={"flag-icon flag-icon-" + code}
                    style={{ width: "3em", height: "1.5em" }}
                  ></span>
                </Grid>
                <Grid item>
                  <Typography variant="h6" color="white">
                    {fixtures[0].league_name || ""}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            {statsMode === "FT" && (
              <React.Fragment>
                <Grid item>
                  <StyledSelectedButton
                    size="small"
                    onClick={() => handleStatsModeToggle("FT")}
                  >
                    Full time
                  </StyledSelectedButton>
                </Grid>
                <Grid item>
                  <StyledNonSelectedButton
                    size="small"
                    onClick={() => handleStatsModeToggle("1HT")}
                  >
                    1st half
                  </StyledNonSelectedButton>
                </Grid>
                <Grid item>
                  <StyledNonSelectedButton
                    size="small"
                    onClick={() => handleStatsModeToggle("2HT")}
                  >
                    2nd half
                  </StyledNonSelectedButton>
                </Grid>
              </React.Fragment>
            )}
            {statsMode === "1HT" && (
              <React.Fragment>
                <Grid item>
                  <StyledNonSelectedButton
                    size="small"
                    onClick={() => handleStatsModeToggle("FT")}
                  >
                    Full time
                  </StyledNonSelectedButton>
                </Grid>
                <Grid item>
                  <StyledSelectedButton
                    size="small"
                    onClick={() => handleStatsModeToggle("1HT")}
                  >
                    1st half
                  </StyledSelectedButton>
                </Grid>
                <Grid item>
                  <StyledNonSelectedButton
                    size="small"
                    onClick={() => handleStatsModeToggle("2HT")}
                  >
                    2nd half
                  </StyledNonSelectedButton>
                </Grid>
              </React.Fragment>
            )}
            {statsMode === "2HT" && (
              <React.Fragment>
                <Grid item>
                  <StyledNonSelectedButton
                    size="small"
                    onClick={() => handleStatsModeToggle("FT")}
                  >
                    Full time
                  </StyledNonSelectedButton>
                </Grid>
                <Grid item>
                  <StyledNonSelectedButton
                    size="small"
                    onClick={() => handleStatsModeToggle("1HT")}
                  >
                    1st half
                  </StyledNonSelectedButton>
                </Grid>
                <Grid item>
                  <StyledSelectedButton
                    size="small"
                    onClick={() => handleStatsModeToggle("2HT")}
                  >
                    2nd half
                  </StyledSelectedButton>
                </Grid>
              </React.Fragment>
            )}
          </StyledGrid>
        </Grid>
        <Grid item>
          {statsMode === "FT" && (
            <FT_FixtureStatsTable fixtures={FT_FixturesStats} />
          )}
          {statsMode === "1HT" && (
            <HT_FixtureStatsTable fixtures={_1HT_FixturesStats} />
          )}
          {statsMode === "2HT" && (
            <HT_FixtureStatsTable fixtures={_2HT_FixturesStats} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default LeagueFixtureStatsTable;
