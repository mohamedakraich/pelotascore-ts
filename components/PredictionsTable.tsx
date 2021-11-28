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
import { PredictionsDTO } from "../types/PreditionsDTO";

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

export const StyledGrid = styled(Grid)(({ theme }) => ({
  shouldForwardProp: () => true,
  [`&.${gridClasses.container}`]: {
    backgroundColor: theme.palette.primary.main,
  },
  minHeight: 50,
  padding: theme.spacing(1),
}));

interface PredictionsTableProps {
  predictions: PredictionsDTO[];
}

const PredictionsTable: React.FC<PredictionsTableProps> = ({ predictions }) => {
  return (
    <Box mt={2} component={Paper} elevation={10}>
      <Grid container direction="column">
        <Grid item>Hello</Grid>
      </Grid>
    </Box>
  );
};

export default PredictionsTable;
