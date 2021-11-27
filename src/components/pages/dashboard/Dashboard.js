import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalLayout from '../../layout/GeneralLayout';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import Button from '@mui/material/Button';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import './dash.css';
import CollapsibleTable from '../../shared/TableComponent';
import _ from 'lodash';

const columnHeaders = [
  {
    align:'left',
    label: 'Nombre completo',
    dataKey: 'fullName',
    canSort: true
  },
  {
    align:'center',
    label: 'ID',
    dataKey: 'id',
    canSort: true
  },
  {
    align:'center',
    label: 'Estatus',
    dataKey: 'status',
    canSort: true
  },
  {
    align:'center',
    label: 'Teléfono',
    dataKey: 'phoneNumber',
    canSort: true
  },
  {
    align:'center',
    label: 'Correo electrónico',
    dataKey: 'email',
    canSort: true
  },
];

const createData = (fullName, phoneNumber, status, id, email) => {
  return {
    fullName,
    phoneNumber,
    status,
    id,
    email
  };
};

const rowsData = [
  createData('Germán Gutiérrez','5512345678','PENDIENTE', 1, 'german@gmail.com'),
  createData('Saúl López', '3312345678', 'EN PROCESO', 2, 'saul@gmail.com'),
  createData('Edgar Lara', '2212345677', 'PENDIENTE', 3, 'edgar@gmail.com'),
  createData('Sarabi Vega', '2212345678', 'PENDIENTE', 4, 'sarabi@gmail.com'),
  createData('Lilia Montes', '2212345679', 'EN PROCESO', 5, 'lilia@gmail.com'),
];

const Dashboard = () => {  
  const [age, setAge] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [headerSorted, setHeaderSorted] = useState(null);
  const [rows, setRows] = useState(rowsData);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleSort = (headerToSort) => {
    if (headerToSort.canSort) {
      let currentSortDirection = headerSorted === headerToSort.dataKey ?
      (sortDirection === 'asc' ? 'desc' : 'asc') :
      'asc';
      let copyRows = [...rows];
      copyRows = _.sortBy(
        copyRows, 
        [headerToSort.dataKey]
      );
      setRows(currentSortDirection === 'asc' ? copyRows : copyRows.reverse());
      setSortDirection(currentSortDirection);
      setHeaderSorted(headerToSort.dataKey);
    }
  };

  return (
    <GlobalLayout>
      <div className='dash-container'>
        <div className='dash-first-child'>
          <div className='dash-small-card'>
            <div className='dash-card color-blue'>
              <PersonAddAltIcon className='dash-card-icon' />
            </div>
            <div className='dash-small-card-text'>
              <p>Total de usuarios:</p>
              <h2 className='mTn-24'>2254</h2>
            </div>
            <Button 
              className='dash-card-btn color-blue'
              variant="contained" 
              endIcon={<PersonAddAltIcon />}
              fullWidth={true}
            >
              Crear
            </Button>
          </div>
          <div className='dash-small-card'>
            <div className='dash-card color-orange'>
              <QueryBuilderIcon className='dash-card-icon' />
            </div>
            <div className='dash-small-card-text'>
              <p>Usuario rezagado:</p>
              <h3 className='mTn-24 mBn-8'>
                Marcos Larcamón
              </h3>
              <small>14 de noviembre de 2020</small>
            </div>
            <Button 
              className='dash-card-btn color-orange'
              variant="contained" 
              endIcon={<AssignmentTurnedInIcon />}
              fullWidth={true}
            >
              Atender
            </Button>
          </div>
        </div>
        <div className='dash-big-card'>
          <div className='dash-big-card-icon-container'>
            <FilterAltIcon className='dash-card-icon' />
          </div>
          <div>
            <FormControl className='dash-status-container'>
              <InputLabel 
                className='mTn-5'
                id="demo-simple-select-autowidth-label">
                Estatus
              </InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={age}
                onChange={handleChange}
                autoWidth
                label="Estatus"
                style={{ height:'40px' }}
              >
                <MenuItem value="">
                  <em>Ninguno</em>
                </MenuItem>
                <MenuItem value={1}>Pendiente</MenuItem>
                <MenuItem value={2}>En proceso</MenuItem>
                <MenuItem value={3}>Completado</MenuItem>
              </Select>
            </FormControl>
            <TextField 
              label="Id o nombre" 
              variant="outlined" 
              className='dash-text-search'
            />
          </div>
          <Button 
            className='dash-card-btn color-blue-light'
            variant="contained" 
            endIcon={<FilterAltIcon />}
            fullWidth={true}
          >
            Filtrar
          </Button>
        </div>
      </div>
      <div className='dash-table-wrapper'>
        <CollapsibleTable
          columnHeaders={columnHeaders}
          rows={rows}
          sortDirection={sortDirection}
          handleSort={handleSort}
        />
      </div>
    </GlobalLayout>
  );
};

export default Dashboard;