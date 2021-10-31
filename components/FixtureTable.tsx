import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

interface FixtureTableProps {
  fixture: Fixture;
}

const FixtureTable: React.FC<FixtureTableProps> = ({ fixture }) => {
  return (
    <Box mt={3} component={Paper} elevation={10}>
      <TableContainer>
        <Table
          sx={{ minWidth: 700 }}
          aria-label="customized table"
          size="small"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell align="left">GP</StyledTableCell>
              <StyledTableCell align="left">W%</StyledTableCell>
              <StyledTableCell align="left">FTS</StyledTableCell>
              <StyledTableCell align="left">CS</StyledTableCell>
              <StyledTableCell align="left">BTS</StyledTableCell>
              <StyledTableCell align="left">TG</StyledTableCell>
              <StyledTableCell align="left">GF</StyledTableCell>
              <StyledTableCell align="left">GA</StyledTableCell>
              <StyledTableCell align="left">P15</StyledTableCell>
              <StyledTableCell align="left">P25</StyledTableCell>
              <StyledTableCell align="left">P35</StyledTableCell>
              <StyledTableCell align="left">PPG</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <StyledTableRow>
              <StyledTableCell component="th" scope="row">
                {fixture.home_name}
              </StyledTableCell>
              <StyledTableCell rowSpan={2} align="center">
                {fixture.time.split('T')[1].split(':')[0] +
                  ':' +
                  fixture.time.split('T')[1].split(':')[1]}
              </StyledTableCell>
              <StyledTableCell align="left">{fixture.home_GP}</StyledTableCell>
              <StyledTableCell align="left">
                {fixture.home_W + '%'}
              </StyledTableCell>
              <StyledTableCell align="left">
                {fixture.home_FTS + '%'}
              </StyledTableCell>
              <StyledTableCell align="left">
                {fixture.home_CS + '%'}
              </StyledTableCell>
              <StyledTableCell align="left">
                {fixture.home_BTS + '%'}
              </StyledTableCell>
              <StyledTableCell align="left">{fixture.home_TG}</StyledTableCell>
              <StyledTableCell align="left">{fixture.home_GF}</StyledTableCell>
              <StyledTableCell align="left">{fixture.home_GA}</StyledTableCell>
              <StyledTableCell align="left">
                {fixture.home_P15 + '%'}
              </StyledTableCell>
              <StyledTableCell align="left">
                {fixture.home_P25 + '%'}
              </StyledTableCell>
              <StyledTableCell align="left">
                {fixture.home_P35 + '%'}
              </StyledTableCell>
              <StyledTableCell align="left">{fixture.home_PPG}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell component="th" scope="row">
                {fixture.away_name}
              </StyledTableCell>
              <StyledTableCell align="left">{fixture.away_GP}</StyledTableCell>
              <StyledTableCell align="left">
                {fixture.away_W + '%'}
              </StyledTableCell>
              <StyledTableCell align="left">
                {fixture.away_FTS + '%'}
              </StyledTableCell>
              <StyledTableCell align="left">
                {fixture.away_CS + '%'}
              </StyledTableCell>
              <StyledTableCell align="left">
                {fixture.away_BTS + '%'}
              </StyledTableCell>
              <StyledTableCell align="left">{fixture.away_TG}</StyledTableCell>
              <StyledTableCell align="left">{fixture.away_GF}</StyledTableCell>
              <StyledTableCell align="left">{fixture.away_GA}</StyledTableCell>
              <StyledTableCell align="left">
                {fixture.away_P15 + '%'}
              </StyledTableCell>
              <StyledTableCell align="left">
                {fixture.away_P25 + '%'}
              </StyledTableCell>
              <StyledTableCell align="left">
                {fixture.away_P35 + '%'}
              </StyledTableCell>
              <StyledTableCell align="left">{fixture.away_PPG}</StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default FixtureTable;
