import React, { useReducer, useState, useContext, useEffect } from 'react';
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
import { axiosInstance } from '../../../adapters/axios';
import LoaderContext from '../../../contexts/loaderScreen/LoaderContext';
import { handleFailedResponse } from '../../../util/handleErrors';
import AlertMsgContext from '../../../contexts/alertMessage/AlertMsgContext';
import { getLabelOfDate } from '../../../util/formattDates';
import DeleteIcon from '@mui/icons-material/Delete';
import UserDataCard from '../../shared/UserDataCard';

const columnHeaders = [
  {
    align:'left',
    label: 'Nombre completo',
    dataKey: 'full_name',
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
    dataKey: 'phone_number',
    canSort: true
  },
  {
    align:'center',
    label: 'Correo electrónico',
    dataKey: 'email',
    canSort: true
  },
  {
    align:'center',
    label: 'ID',
    dataKey: '_id',
    canSort: true
  }
];

let userDataDefault = {
  email: '',
  phone_number: '',
  first_name: '',
  second_name: '',
  first_last_name: '',
  second_last_name: '',
  birth_date: '',
  status: '',
  analist_id: ''
};

const userRules = [
  {
    name: 'email',
    regExp: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    isRequired: true
  },
  {
    name: 'phone_number',
    regExp: /^\d+$/,
    isRequired: true
  },
  {
    name: 'first_name',
    regExp: /([^\s])/,
    isRequired: true
  },
  {
    name: 'second_name',
    regExp: /([^\s])/,
    isRequired: false
  },
  {
    name: 'first_last_name',
    regExp: /([^\s])/,
    isRequired: true
  },
  {
    name: 'second_last_name',
    regExp: /([^\s])/,
    isRequired: false
  },
  {
    name: 'birth_date',
    regExp: '',
    isRequired: true
  },
  {
    name: 'status',
    regExp: '',
    isRequired: true
  },
  {
    name: 'analist_id',
    regExp: '',
    isRequired: true
  }
];

const Dashboard = () => {  
  const [sortDirection, setSortDirection] = useState('asc');
  const [headerSorted, setHeaderSorted] = useState(null);
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [userForm, dispatchUserForm] = useReducer(
    userFormReducer, userDataDefault
  );
  const [userFormErrors, setUserFormErrors] = useState({});
  const { setLoaderScreen } = useContext(LoaderContext);
  const { setShowAlert } = useContext(AlertMsgContext);
  const [analystsOptions, setAnalystsOptions] = useState([]);
  const [pagination, setPagination] = useState({
    page: 0,
    resPerPage: 10
  });
  const [querySearch, setQuerySearch] = useState({
    textSearch: '',
    statusSearch: ''
  });
  const [resetComponent, setResetComponent] = useState(false);
  const [oldestUser, setOldestUser] = useState({
    _id: null,
    full_name: '',
    created: ''
  });

  useEffect(() => {
    (async function() {
      setLoaderScreen(true);
      const { page, resPerPage } = pagination;
      const { textSearch, statusSearch } = querySearch;
      const usersResponse = await axiosInstance(
        'get',
        `/users/?page=${(page + 1)}&resPerPage=${
          (resPerPage)}&search=${textSearch}&status=${statusSearch}`,
        {},
        setShowAlert,
        false
      );
      if (usersResponse?.code === 200) {
        setTotal(usersResponse.data?.total || 0);
        setTotalUsers(usersResponse.data?.allTotal || 0);
        setRows((usersResponse.data?.rows ? 
          usersResponse.data?.rows.map(user => ({ 
            ...user, 
            full_name: `${
              ((user.first_name ? user.first_name + ' ' : '') || '') + 
              ((user.second_name ? user.second_name + ' ' : '') || '') +
              ((user.first_last_name ? user.first_last_name + ' ' : '') || '') +
              ((user.second_last_name ? user.second_last_name + ' ' : '') || '')
            }`,
            analist: user.analist_id.full_name
          })) : [])
        );
      }
      const oldestUserResponse = await axiosInstance(
        'get', `/users/oldest`, {}, setShowAlert, false
      );
      if (oldestUserResponse?.code === 200) {
        setOldestUser({
          _id: oldestUserResponse.data?.user?._id,
          full_name: `${oldestUserResponse.data?.user?.first_name} ${
            oldestUserResponse.data?.user?.first_last_name
          }`,
          created: getLabelOfDate(oldestUserResponse.data?.user?.created_at)
        });
      }
      setLoaderScreen(false);
    })();
  }, [resetComponent]);

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

  const handleSaveUser = async () => {
    const newValidation = new FieldsValidator(userRules, userForm);
    const rValidation = newValidation.executeValidation();
    if (rValidation.errors) {
      setUserFormErrors(rValidation.fields);
      setShowAlert(
        true, 'right', 
        'Los campos marcado en rojo son requeridos',
        5000, 'error'
      );
    }
    else {
      setLoaderScreen(true);
      setUserFormErrors({});
      const userResponse = await axiosInstance(
        'post',
        '/users/',
        { ...userForm },
        setShowAlert,
        true
      );
      if (userResponse?.code === 200) {
        setResetComponent(!resetComponent);
        setOpenDialog(false);
      } else handleFailedResponse(userResponse, setUserFormErrors);
      setLoaderScreen(false);
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

  const handleGetAnalysts = async () => {
    if (analystsOptions.length === 0) {
      setLoaderScreen(true);
      const analystResponse = await axiosInstance(
        'get',
        '/analysts/',
        {},
        setShowAlert,
        false
      );
      if (analystResponse?.code === 200) {
        setAnalystsOptions(analystResponse.data?.analysts || []);
      }
      setLoaderScreen(false);
    }
  };

  const handleFilters = async () => {
    const { textSearch, statusSearch } = querySearch;
    if (textSearch || statusSearch) {
      setLoaderScreen(true);
      setPagination({ page: 0, resPerPage: 10 });
      const filterResults = await axiosInstance(
        'get', 
        `/users/?page=1&resPerPage=10&search=${textSearch}&status=${statusSearch}`,
        {},
        setShowAlert,
        false
      );
      if (filterResults?.code === 200) {
        setTotal(filterResults.data?.total || 0);
        setTotalUsers(filterResults.data?.allTotal || 0);
        setRows((filterResults.data?.rows ? 
          filterResults.data?.rows.map(user => ({ 
            ...user, 
            full_name: `${
              ((user.first_name ? user.first_name + ' ' : '') || '') + 
              ((user.second_name ? user.second_name + ' ' : '') || '') +
              ((user.first_last_name ? user.first_last_name + ' ' : '') || '') +
              ((user.second_last_name ? user.second_last_name + ' ' : '') || '')
            }`,
            analist: user.analist_id.full_name
          })) : [])
        );
      }
      setLoaderScreen(false);
    }
  };

  const handleCleanFilters = async () => {
    setLoaderScreen(true);
    setQuerySearch({
      textSearch: '',
      statusSearch: ''
    });
    setPagination({
      page: 0,
      resPerPage: 10
    });
    const cleanFilterResults = await axiosInstance(
      'get', 
      `/users/?page=1&resPerPage=10&search=&status=`,
      {},
      setShowAlert,
      false
    );
    if (cleanFilterResults?.code === 200) {
      setTotal(cleanFilterResults.data?.total || 0);
      setTotalUsers(cleanFilterResults.data?.allTotal || 0);
      setRows((cleanFilterResults.data?.rows ? 
        cleanFilterResults.data?.rows.map(user => ({ 
          ...user, 
          full_name: `${
            ((user.first_name ? user.first_name + ' ' : '') || '') + 
            ((user.second_name ? user.second_name + ' ' : '') || '') +
            ((user.first_last_name ? user.first_last_name + ' ' : '') || '') +
            ((user.second_last_name ? user.second_last_name + ' ' : '') || '')
          }`,
          analist: user.analist_id.full_name
        })) : [])
      );
    }
    setLoaderScreen(false);
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
              <h2 className='mTn-24'>{totalUsers}</h2>
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
                {oldestUser.full_name}
              </h3>
              <small>{oldestUser.created}</small>
            </div>
            <Button 
              className='dash-card-btn color-orange'
              variant="contained" 
              endIcon={<AssignmentTurnedInIcon />}
              fullWidth={true}
              onClick={() => {
                setShowAlert(
                  true, 'right', 
                  'Funcionalidad aún en desarrollo...',
                  5000, 'warning'
                );
              }}
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
                value={querySearch.statusSearch}
                onChange={(e) => setQuerySearch({
                  ...querySearch,
                  statusSearch: e.target.value
                })}
              >
                <MenuItem value="">
                  <em>Ninguno</em>
                </MenuItem>
                <MenuItem value={'PENDIENTE'}>Pendiente</MenuItem>
                <MenuItem value={'EN PROCESO'}>En proceso</MenuItem>
                <MenuItem value={'COMPLETADO'}>Completado</MenuItem>
              </Select>
            </FormControl>
            <TextField 
              label="Id o nombre" 
              variant="outlined" 
              className='dash-text-search'
              onChange={(e) => setQuerySearch({
                ...querySearch,
                textSearch: e.target.value
              })}
              value={querySearch.textSearch}
            />
          </div>
          <Button 
            className='dash-card-btn dash-btn-filter color-blue-light'
            variant="contained" 
            endIcon={<FilterAltIcon />}
            fullWidth={true}
            onClick={() => handleFilters()}
          >
            Filtrar
          </Button>
          <Button 
            className='dash-btn-clean-filter color-blue-light'
            variant="contained" 
            fullWidth={true}
            onClick={() => handleCleanFilters()}
          >
            <DeleteIcon />
          </Button>
        </div>
      </div>
      <div className='dash-table-wrapper'>
        <CollapsibleTable
          columnHeaders={columnHeaders}
          rows={rows}
          sortDirection={sortDirection}
          handleSort={handleSort}
          renderCollapseData={(rowData) => {
            return (
              <UserDataCard 
                data={rowData}
                setResetComponent={setResetComponent}
                resetComponent={resetComponent}
              />
            );
          }}
          handlePagination={(newPage, newResPerPage) => {
            if (!newResPerPage) newResPerPage = pagination.resPerPage;
            setPagination({ page: newPage, resPerPage: newResPerPage });
            setResetComponent(!resetComponent);
          }}
          pagination={pagination}
          total={total}
        />
      </div>
      <FullScreenDialog 
        open={openDialog} 
        handleClose={() => setOpenDialog(false)}
        title={'Crear usuario:'}
        handleAction={() => handleSaveUser()}
        labelAction={'Guardar'}
        dialogBody={userFormDialogBody(
          handleChangeUserForm, userForm, userFormErrors,
          handleGetAnalysts, analystsOptions
        )}
      />
    </GlobalLayout>
  );
};

export default Dashboard;