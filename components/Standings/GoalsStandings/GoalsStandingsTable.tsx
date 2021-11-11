import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { StandingsType } from '../../../types/StandingsType';
import { GoalsStandingsType } from '../../../types/GoalsStandingsType';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey[300],
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  /*'&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },*/
  // hide last border
  /*'&:last-child td, &:last-child th': {
    border: 0,
  },*/
}));

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

interface StandingsTableProps {
  standings: GoalsStandingsType[];
}

const GoalsStandingsTable: React.FC<StandingsTableProps> = ({ standings }) => {
  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">#</StyledTableCell>
            <StyledTableCell align="left">Team</StyledTableCell>
            <StyledTableCell align="center">GP</StyledTableCell>
            <StyledTableCell align="center">+1.5(1HT)</StyledTableCell>
            <StyledTableCell align="center">+1.5(2HT)</StyledTableCell>
            <StyledTableCell align="center">+1.5</StyledTableCell>
            <StyledTableCell align="center">+2.5</StyledTableCell>
            <StyledTableCell align="center">+3.5</StyledTableCell>
            <StyledTableCell align="center">+4.5</StyledTableCell>
            <StyledTableCell align="center">G</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {standings.map((team, index) => (
            <StyledTableRow key={team.id}>
              <StyledTableCell align="center">{index + 1}</StyledTableCell>
              <StyledTableCell align="left">{team.team_name}</StyledTableCell>
              <StyledTableCell align="center">{team.GP}</StyledTableCell>
              <StyledTableCell align="center">{team._1HT_P15}</StyledTableCell>
              <StyledTableCell align="center">{team._2HT_P15}</StyledTableCell>
              <StyledTableCell align="center">{team.P15}</StyledTableCell>
              <StyledTableCell align="center">{team.P25}</StyledTableCell>
              <StyledTableCell align="center">{team.P35}</StyledTableCell>
              <StyledTableCell align="center">{team.P45}</StyledTableCell>
              <StyledTableCell align="center">
                {team.GF + ':' + team.GA}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GoalsStandingsTable;
