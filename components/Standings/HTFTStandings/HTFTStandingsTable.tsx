import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { HTFTStandingsType } from '../../../types/HTFTStandingsType';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey[300],
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  /*'&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },*/
  // hide last border
  /*'&:last-child td, &:last-child th': {
    border: 0,
  },*/
}));

interface HTFTStandingsTableProps {
  standings: HTFTStandingsType[];
}

const HTFTStandingsTable: React.FC<HTFTStandingsTableProps> = ({
  standings,
}) => {
  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">#</StyledTableCell>
            <StyledTableCell align="left">Team</StyledTableCell>
            <StyledTableCell align="center">GP</StyledTableCell>
            <StyledTableCell align="center">W/W</StyledTableCell>
            <StyledTableCell align="center">W/D</StyledTableCell>
            <StyledTableCell align="center">W/L</StyledTableCell>
            <StyledTableCell align="center">D/W</StyledTableCell>
            <StyledTableCell align="center">D/D</StyledTableCell>
            <StyledTableCell align="center">D/L</StyledTableCell>
            <StyledTableCell align="center">L/W</StyledTableCell>
            <StyledTableCell align="center">L/D</StyledTableCell>
            <StyledTableCell align="center">L/L</StyledTableCell>
            <StyledTableCell align="center">Pts</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {standings.map((team, index) => (
            <StyledTableRow key={team.id}>
              <StyledTableCell align="center">{index + 1}</StyledTableCell>
              <StyledTableCell align="left">{team.team_name}</StyledTableCell>
              <StyledTableCell align="center">{team.GP}</StyledTableCell>
              <StyledTableCell align="center">{team.WW}</StyledTableCell>
              <StyledTableCell align="center">{team.WD}</StyledTableCell>
              <StyledTableCell align="center">{team.WL}</StyledTableCell>
              <StyledTableCell align="center">{team.DW}</StyledTableCell>
              <StyledTableCell align="center">{team.DD}</StyledTableCell>
              <StyledTableCell align="center">{team.DL}</StyledTableCell>
              <StyledTableCell align="center">{team.LW}</StyledTableCell>
              <StyledTableCell align="center">{team.LD}</StyledTableCell>
              <StyledTableCell align="center">{team.LL}</StyledTableCell>
              <StyledTableCell align="center">{team.Pts}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HTFTStandingsTable;
