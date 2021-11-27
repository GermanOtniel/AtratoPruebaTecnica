import React, { useReducer, useState } from 'react';
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
import FullScreenDialog from '../../shared/FullScreenDialog';
import { userFormDialogBody } from '../../../util/drawerElements';
import { userFormReducer } from '../../../reducers/userFormReducer';
import { FieldsValidator } from '../../../util/classes/FieldsValidator';

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

const createData = (
  firstName, secondName, firstLastName, secondLastName,
  phoneNumber, status, id, email, analist, birthDate) => {
  return {
    fullName: `${
      ((firstName ? firstName + ' ' : '') || '') + 
      ((secondName ? secondName + ' ' : '') || '') +
      ((firstLastName ? firstLastName + ' ' : '') || '') +
      ((secondLastName ? secondLastName + ' ' : '') || '')
    }`,
    phoneNumber,
    status,
    id,
    email,
    analist,
    birthDate
  };
};

const rowsData = [
  createData(
    'Germán', '', 'Gutiérrez', '', '5512345678','pendiente', 
    1, 'german@gmail.com', 1, '1994-10-31'),
  createData(
    'Saúl', '', 'López', '', '3312345678', 'proceso', 2, 'saul@gmail.com', 
    2, '1996-10-31'),
  createData(
    'Edgar', '', 'Lara', '', '2212345677', 'proceso', 3, 
    'edgar@gmail.com', 3, '1998-10-31'),
  createData(
    'Sarabi', '', 'Vega', '', '2212345678', 'completado', 4, 
    'sarabi@gmail.com', 1, '1999-10-31'),
  createData(
    'Lilia', '', 'Montes', '', '2212345679', 'pendiente', 5, 
    'lilia@gmail.com', 2, '2000-10-31'),
];

let userDataDefault = {
  email: '',
  phoneNumber: '',
  firstName: '',
  secondName: '',
  firstLastName: '',
  secondLastName: '',
  birthDate: '',
  status: '',
  analist: ''
};

const userRules = [
  {
    name: 'email',
    regExp: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    isRequired: true
  },
  {
    name: 'phoneNumber',
    regExp: /^\d+$/,
    isRequired: true
  },
  {
    name: 'firstName',
    regExp: /([^\s])/,
    isRequired: true
  },
  {
    name: 'secondName',
    regExp: /([^\s])/,
    isRequired: false
  },
  {
    name: 'firstLastName',
    regExp: /([^\s])/,
    isRequired: true
  },
  {
    name: 'secondLastName',
    regExp: /([^\s])/,
    isRequired: false
  },
  {
    name: 'birthDate',
    regExp: '',
    isRequired: true
  },
  {
    name: 'status',
    regExp: '',
    isRequired: true
  },
  {
    name: 'analist',
    regExp: '',
    isRequired: true
  }
];

const Dashboard = () => {  
  const [sortDirection, setSortDirection] = useState('asc');
  const [headerSorted, setHeaderSorted] = useState(null);
  const [rows, setRows] = useState(rowsData);
  const [openDialog, setOpenDialog] = useState(false);
  const [userForm, dispatchUserForm] = useReducer(
    userFormReducer, userDataDefault
  );
  const [userFormErrors, setUserFormErrors] = useState({});

  const handleChangeUserForm = (event) => {
    const { name, value } = event.target;
    const payload = { fieldName: name, value };
    delete userFormErrors[name];
    dispatchUserForm({
      type: 'ON_CHANGE_HANDLER',
      payload
    });
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

  const handleSaveUser = () => {
    const newValidation = new FieldsValidator(userRules, userForm);
    const rValidation = newValidation.executeValidation();
    if (rValidation.errors) setUserFormErrors(rValidation.fields)
    else {
      setUserFormErrors({});
      console.log(userForm);
    }
  };

  const handleOpenDialog = () => {
    dispatchUserForm({
      type: 'RESET',
      payload: { value: userDataDefault }
    });
    setUserFormErrors({});
    setOpenDialog(true);
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
              onClick={() => handleOpenDialog()}
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
                autoWidth
                label="Estatus"
                style={{ height:'40px' }}
                defaultValue = ""
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
      <FullScreenDialog 
        open={openDialog} 
        handleClose={() => setOpenDialog(false)}
        title={'Crear usuario:'}
        handleAction={() => handleSaveUser()}
        labelAction={'Guardar'}
        dialogBody={userFormDialogBody(
          handleChangeUserForm, userForm, userFormErrors
        )}
      />
    </GlobalLayout>
  );
};

export default Dashboard;