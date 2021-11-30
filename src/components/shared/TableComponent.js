import React, { useEffect, useState } from 'react';
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
            onClick={() => setCollapseOpen(row)}
          >
            { collapseOpen === row._id ? 
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
            in={collapseOpen === row._id} 
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
  columnHeaders, rows, sortDirection, pagination, total,
  handleSort, renderCollapseData, handlePagination
}) => {
  const [collapseOpen, setCollapseOpen] = useState('');
  const [collapseData, setCollapseData] = useState(null);

  useEffect(() => {
    setCollapseOpen('');
  }, [rows]);

  const handleCollapseOpenAndShowData = (rowData) => {
    setCollapseData(renderCollapseData(rowData));
    setCollapseOpen(rowData._id === collapseOpen ? null : rowData._id);
  };

  const handleChangePage = (event, newPage) => {
    handlePagination(newPage, null);
  };

  const handleChangeRowsPerPage = (event) => {
    handlePagination(0, parseInt(event.target.value, 10));
  };

  return (
    <React.Fragment>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={total}
        rowsPerPage={pagination.resPerPage}
        page={pagination.page}
        onPageChange={(e, newPage) => handleChangePage(e, newPage)}
        onRowsPerPageChange={(e) => handleChangeRowsPerPage(e)}
      />
      <TableContainer 
        className='dash-table-container'
        component={Paper} 
      >
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <StyledTableCell/>
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
            { rows.map((row, i) => (
              <Row 
                key={i} 
                row={row} 
                collapseOpen={collapseOpen} 
                setCollapseOpen={(rowData) => handleCollapseOpenAndShowData(rowData)}
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