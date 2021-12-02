import React, { useReducer, useState, useContext, useEffect } from "react";
// material ui imports
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import Button from "@mui/material/Button";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import CollapsibleTable from "../../shared/TableComponent";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
// dependences externals imports
import _ from "lodash";
// local files imports
import LoaderContext from "../../../contexts/loaderScreen/LoaderContext";
import AlertMsgContext from "../../../contexts/alertMessage/AlertMsgContext";
import GlobalLayout from "../../layout/GeneralLayout";
import FullScreenDialog from "../../shared/FullScreenDialog";
import UserDataCard from "../../shared/UserDataCard";
import { userFormDialogBody } from "../../../util/drawerElements";
import { userFormReducer } from "../../../reducers/userFormReducer";
import { FieldsValidator } from "../../../util/classes/FieldsValidator";
import { columnHeaders } from "../../../util/columnsTable";
import { userRules } from "../../../util/rulesForms";
import { 
  createNewUser, getAnalysts, getOldestUser, 
  getUsers, getUsersByFilters 
} from "../../../adapters/dashboardAdapter";

let userDataDefault = {
  email: "",
  phone_number: "",
  first_name: "",
  second_name: "",
  first_last_name: "",
  second_last_name: "",
  birth_date: "",
  status: "",
  analist_id: ""
};

let paginationDefault = {
  page: 0,
  resPerPage: 10
};

let querySearchDefault = {
  textSearch: "",
  statusSearch: ""
};

let oldestUserDef = {
  _id: null,
  full_name: "",
  created: ""
};

const Dashboard = () => {  
  const [sortDirection, setSortDirection] = useState("asc");
  const [headerSorted, setHeaderSorted] = useState(null);
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [userFormErrors, setUserFormErrors] = useState({});
  const [analystsOptions, setAnalystsOptions] = useState([]);
  const [pagination, setPagination] = useState(paginationDefault);
  const [querySearch, setQuerySearch] = useState(querySearchDefault);
  const [resetComponent, setResetComponent] = useState(false);
  const [oldestUser, setOldestUser] = useState(oldestUserDef);
  const [userForm, dispatchUserForm] = useReducer(userFormReducer, userDataDefault);
  const { setLoaderScreen } = useContext(LoaderContext);
  const { setShowAlert } = useContext(AlertMsgContext);

  useEffect(() => {
    (async function() {
      setLoaderScreen(true);
      await getUsers(
        pagination, querySearch, setShowAlert, 
        setTotal, setTotalUsers, setRows
      );
      await getOldestUser(setShowAlert, setOldestUser);
      setLoaderScreen(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetComponent]);

  const handleChangeUserForm = (event) => {
    const { name, value } = event.target;
    const payload = { fieldName: name, value };
    delete userFormErrors[name];
    dispatchUserForm({
      type: "ON_CHANGE_HANDLER",
      payload
    });
  };

  const handleSort = (headerToSort) => {
    if (headerToSort.canSort) {
      let currentSortDirection = headerSorted === headerToSort.dataKey ?
      (sortDirection === "asc" ? "desc" : "asc") :
      "asc";
      let copyRows = [...rows];
      copyRows = _.sortBy(
        copyRows, 
        [headerToSort.dataKey]
      );
      setRows(currentSortDirection === "asc" ? copyRows : copyRows.reverse());
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
        true, "right", 
        "Los campos marcado en rojo son requeridos",
        5000, "error"
      );
    }
    else {
      setLoaderScreen(true);
      setUserFormErrors({});
      setPagination(paginationDefault);
      setQuerySearch(querySearchDefault);
      await createNewUser(
        userForm, setShowAlert, setResetComponent, 
        setOpenDialog, resetComponent, setUserFormErrors
      );
      setLoaderScreen(false);
    }
  };

  const handleOpenDialog = () => {
    dispatchUserForm({
      type: "RESET",
      payload: { value: userDataDefault }
    });
    setUserFormErrors({});
    setOpenDialog(true);
  };

  const handleGetAnalysts = async () => {
    if (analystsOptions.length === 0) {
      setLoaderScreen(true);
      await getAnalysts(setShowAlert, setAnalystsOptions);
      setLoaderScreen(false);
    }
  };

  const handleFilters = async () => {
    const { textSearch, statusSearch } = querySearch;
    if (textSearch || statusSearch) {
      setLoaderScreen(true);
      setPagination({ page: 0, resPerPage: 10 });
      await getUsersByFilters(
        querySearch, setShowAlert, setTotal, 
        setTotalUsers, setRows
      );
      setLoaderScreen(false);
    }
  };

  const handleCleanFilters = async () => {
    setLoaderScreen(true);
    let newQuerySearch = {
      textSearch: "",
      statusSearch: ""
    };
    setQuerySearch(newQuerySearch);
    setPagination({
      page: 0,
      resPerPage: 10
    });
    await getUsersByFilters(
      newQuerySearch, setShowAlert, setTotal, 
      setTotalUsers, setRows
    );
    setLoaderScreen(false);
  };

  const handlePagination = (newPage, newResPerPage) => {
    if (!newResPerPage) newResPerPage = pagination.resPerPage;
    setPagination({ page: newPage, resPerPage: newResPerPage });
    setResetComponent(!resetComponent);
  };

  return (
    <GlobalLayout>
      <div className="dash-container">
        <div className="dash-first-child">
          <div className="dash-small-card">
            <div className="dash-card color-blue">
              <PersonAddAltIcon className="dash-card-icon" />
            </div>
            <div className="dash-small-card-text">
              <p>Total de usuarios:</p>
              <h2 className="mTn-24">{totalUsers}</h2>
            </div>
            <Button 
              className="dash-card-btn color-blue"
              variant="contained" 
              endIcon={<PersonAddAltIcon />}
              fullWidth={true}
              onClick={() => handleOpenDialog()}
            >
              Crear
            </Button>
          </div>
          <div className="dash-small-card">
            <div className="dash-card color-orange">
              <QueryBuilderIcon className="dash-card-icon" />
            </div>
            <div className="dash-small-card-text">
              { oldestUser?._id && totalUsers > 0 ?
                <React.Fragment>
                  <p>Usuario rezagado:</p>
                  <h3 className="mTn-24 mBn-8">
                    {oldestUser.full_name}
                  </h3>
                  <small>{oldestUser.created}</small>
                </React.Fragment> :
                <React.Fragment>
                  <h3 className="mBn-8">
                    ¡Estás al día!
                  </h3>
                  <small>Sin usuarios rezagados</small>
                </React.Fragment> }
            </div>
            <Button 
              className="dash-card-btn color-orange"
              variant="contained" 
              endIcon={<AssignmentTurnedInIcon />}
              fullWidth={true}
              onClick={() => {
                setShowAlert(
                  true, "right", 
                  "Funcionalidad para la segunda entrega :D",
                  5000, "warning"
                );
              }}
              disabled={oldestUser?._id === null}
            >
              Atender
            </Button>
          </div>
        </div>
        <div className="dash-big-card">
          <div className="dash-big-card-icon-container">
            <FilterAltIcon className="dash-card-icon" />
          </div>
          <div>
            <FormControl className="dash-status-container">
              <InputLabel 
                className="mTn-5"
                id="demo-simple-select-autowidth-label"
              >
                Estatus
              </InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                autoWidth
                label="Estatus"
                style={{ height:"40px" }}
                value={querySearch.statusSearch}
                onChange={(e) => setQuerySearch({
                  ...querySearch,
                  statusSearch: e.target.value
                })}
              >
                <MenuItem value="">
                  <em>Ninguno</em>
                </MenuItem>
                <MenuItem value={"PENDIENTE"}>Pendiente</MenuItem>
                <MenuItem value={"EN PROCESO"}>En proceso</MenuItem>
                <MenuItem value={"COMPLETADO"}>Completado</MenuItem>
              </Select>
            </FormControl>
            <TextField 
              label="Id, nombre, correo ó teléfono" 
              variant="outlined" 
              className="dash-text-search"
              onChange={(e) => setQuerySearch({
                ...querySearch,
                textSearch: e.target.value
              })}
              value={querySearch.textSearch}
            />
          </div>
          <Button 
            className="dash-card-btn dash-btn-filter color-blue-light"
            variant="contained" 
            endIcon={<FilterAltIcon />}
            fullWidth={true}
            onClick={() => handleFilters()}
          >
            Filtrar
          </Button>
          <Button 
            className="dash-btn-clean-filter color-blue-light"
            variant="contained" 
            fullWidth={true}
            onClick={() => handleCleanFilters()}
          >
            <DeleteIcon />
          </Button>
        </div>
      </div>
      <div className="dash-table-wrapper">
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
          handlePagination={(newPage, newResPerPage) => handlePagination(
            newPage, newResPerPage
          )}
          pagination={pagination}
          total={total}
        />
      </div>
      {
        rows.length === 0 && totalUsers !== 0 &&
        <div style={{ textAlign:"center" }}>
          <SentimentVeryDissatisfiedIcon className="mT-20"/>
          <h5 className="mTn-10">
            Tu búsqueda no ha arrojado resultados 
          </h5>
        </div>
      }
      <FullScreenDialog 
        open={openDialog} 
        handleClose={() => setOpenDialog(false)}
        title={"Crear usuario:"}
        handleAction={() => handleSaveUser()}
        labelAction={"Guardar"}
        dialogBody={userFormDialogBody(
          handleChangeUserForm, userForm, userFormErrors,
          handleGetAnalysts, analystsOptions
        )}
      />
    </GlobalLayout>
  );
};

export default Dashboard;