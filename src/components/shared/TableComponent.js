import React, { useState, useContext } from 'react';
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TablePagination from '@mui/material/TablePagination';
import TableSortLabel, { tableSortLabelClasses } from '@mui/material/TableSortLabel';
import LoaderContext from '../../contexts/loaderScreen/LoaderContext';
import UserDataCard from './UserDataCard';

const StyledTableCell = styled(TableCell)(({ theme }) => {
  return {
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#3363FF',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  };
});

const StyledTableSortLabel = styled(TableSortLabel)(({ theme }) => {
  return {
    [`&.${tableSortLabelClasses.root}:hover`]: {
      backgroundColor: '#3363FF',
      color: 'white',
    }
  };
});

function Row(props) {
  const { 
    row, collapseOpen, setCollapseOpen, 
    collapseData, columnHeaders } = props;

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <StyledTableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setCollapseOpen(row.id)}
          >
            { collapseOpen === row.id ? 
              <KeyboardArrowUpIcon /> : 
              <KeyboardArrowDownIcon /> }
          </IconButton>
        </StyledTableCell>
        { columnHeaders.map((key, i) => (
          <StyledTableCell 
            align={key.align} 
            key={i} 
            component="th" 
            scope="row"
          >
            {row[key.dataKey]}
          </StyledTableCell>
        )) }
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse 
            in={collapseOpen === row.id} 
            timeout="auto" 
            unmountOnExit
          >
            { collapseData }
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const CollapsibleTable = ({
  columnHeaders, rows, sortDirection, handleSort
}) => {
  const [collapseOpen, setCollapseOpen] = useState('');
  const [collapseData, setCollapseData] = useState(null);
  const { setLoaderScreen } = useContext(LoaderContext);

  const handleCollapseOpenAndShowData = async (collapse, id) => {
    setLoaderScreen(true);
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + (id + 1));
    const pokemonResponse = await response.json();
    setCollapseData(<UserDataCard data={pokemonResponse} />);
    setCollapseOpen(collapse === collapseOpen ? null : collapse);
    setLoaderScreen(false);
  };

  return (
    <React.Fragment>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={5}
        page={0}
        onPageChange={(uno, dos, tres, cuatro) => console.log(uno, dos, tres, cuatro)}
        onRowsPerPageChange={(uno, dos, tres, cuatro) => console.log(uno, dos, tres, cuatro)}
      />
      <TableContainer component={Paper} style={{ border:'1px solid #adabab' }}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <StyledTableCell />
              { columnHeaders.map((header, i) => (
                <StyledTableCell
                  key={i}
                  align={header.align}
                >
                  <StyledTableSortLabel
                    direction={sortDirection}
                    onClick={() => handleSort(header)}
                  >
                    {header.label}
                  </StyledTableSortLabel>
                </StyledTableCell>
              )) }
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <Row 
                key={i} 
                row={row} 
                collapseOpen={collapseOpen} 
                setCollapseOpen={(collapse) => handleCollapseOpenAndShowData(collapse, i)}
                collapseData={collapseData}
                columnHeaders={columnHeaders}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}

export default CollapsibleTable;