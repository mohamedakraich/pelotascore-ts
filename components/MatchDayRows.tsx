import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

interface MatchDayTableProps {
  matches: Match[];
}

const MatchDayRows: React.FC<MatchDayTableProps> = ({ matches }) => {
  return (
    <React.Fragment>
      {matches.map((match) => {
        return match.status === 1 ? (
          <TableRow
            key={match.id}
            sx={{
              '&:last-child td, &:last-child th': { border: 0 },
            }}
          >
            <TableCell component="th" scope="row">
              {match.date.split('T')[0]}
            </TableCell>
            <TableCell align="right">{match.home_name}</TableCell>
            <TableCell align="center">{`${match.home_FullTimeGoals} - ${match.away_FullTimeGoals}`}</TableCell>
            <TableCell align="left">{match.away_name}</TableCell>
            <TableCell align="left">
              {'(' +
                match.home_FirstHalfGoals +
                ' - ' +
                match.away_FirstHalfGoals +
                ')'}
            </TableCell>
          </TableRow>
        ) : (
          <TableRow
            key={match.id}
            sx={{
              '&:last-child td, &:last-child th': { border: 0 },
            }}
          >
            <TableCell component="th" scope="row">
              {match.date.split('T')[0]}
            </TableCell>
            <TableCell align="right">{match.home_name}</TableCell>
            <TableCell align="center">{match.date.split('T')[1]}</TableCell>
            <TableCell align="left">{match.away_name}</TableCell>
            <TableCell align="left"></TableCell>
          </TableRow>
        );
      })}
      <TableRow
        sx={{
          '&:last-child td, &:last-child th': { border: 0 },
        }}
      >
        <TableCell component="th" scope="row" colSpan={5}></TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default MatchDayRows;
