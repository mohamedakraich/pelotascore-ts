import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

interface MatchDayTableProps {
  matches: Match[];
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
}));

const MatchesTable: React.FC<MatchDayTableProps> = ({ matches }) => {
  console.log(matches);
  return (
    <React.Fragment>
      <StyledTableRow>
        <TableCell component="th" scope="row" colSpan={4}>
          <Typography variant="subtitle2" color="white">
            {matches[0].date.split('#')[0]}
          </Typography>
        </TableCell>
      </StyledTableRow>
      {matches.map((match) => {
        return match.status === 1 ? (
          <TableRow
            key={match.id}
            sx={{
              '&:last-child td, &:last-child th': { border: 0 },
            }}
          >
            {/*<TableCell component="th" scope="row">
              {match.date.split('T')[0]}
            </TableCell>*/}
            <TableCell align="right">
              <Typography variant="subtitle2" color="black">
                {match.home_name}
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2" color="black">
                {`${match.home_FullTimeGoals} - ${match.away_FullTimeGoals}`}
              </Typography>
            </TableCell>
            <TableCell align="left">
              <Typography variant="subtitle2" color="black">
                {match.away_name}
              </Typography>
            </TableCell>
            <TableCell align="left">
              <Typography variant="subtitle2" color="gray">
                {'(' +
                  match.home_FirstHalfGoals +
                  ' - ' +
                  match.away_FirstHalfGoals +
                  ')'}{' '}
              </Typography>
            </TableCell>
          </TableRow>
        ) : (
          <TableRow
            key={match.id}
            sx={{
              '&:last-child td, &:last-child th': { border: 0 },
            }}
          >
            <TableCell align="right">
              <Typography variant="subtitle2" color="black">
                {match.home_name}
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="body2" color="black">
                {match.date.split('#')[1]}
              </Typography>
            </TableCell>
            <TableCell align="left">
              <Typography variant="subtitle2" color="black">
                {match.away_name}
              </Typography>
            </TableCell>
          </TableRow>
        );
      })}
    </React.Fragment>
  );
};

export default MatchesTable;
