import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { StandingsType } from '../../types/StandingsType';

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
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
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
  standings: StandingsType[];
}

const StandingsTable: React.FC<StandingsTableProps> = ({ standings }) => {
  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">#</StyledTableCell>
            <StyledTableCell align="left">Team</StyledTableCell>
            <StyledTableCell align="center">GP</StyledTableCell>
            <StyledTableCell align="center">W</StyledTableCell>
            <StyledTableCell align="center">D</StyledTableCell>
            <StyledTableCell align="center">L</StyledTableCell>
            <StyledTableCell align="center">GF</StyledTableCell>
            <StyledTableCell align="center">GA</StyledTableCell>
            <StyledTableCell align="center">GD</StyledTableCell>
            <StyledTableCell align="center">Pts</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {standings.map((team, index) => (
            <StyledTableRow key={team.id}>
              <StyledTableCell align="center">{index + 1}</StyledTableCell>
              <StyledTableCell align="left">{team.team_name}</StyledTableCell>
              <StyledTableCell align="center">{team.GP}</StyledTableCell>
              <StyledTableCell align="center">{team.W}</StyledTableCell>
              <StyledTableCell align="center">{team.D}</StyledTableCell>
              <StyledTableCell align="center">{team.L}</StyledTableCell>
              <StyledTableCell align="center">{team.GF}</StyledTableCell>
              <StyledTableCell align="center">{team.GA}</StyledTableCell>
              <StyledTableCell align="center">{team.GD}</StyledTableCell>
              <StyledTableCell align="center">{team.Pts}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StandingsTable;
