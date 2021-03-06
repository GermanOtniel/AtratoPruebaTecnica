import React, { useReducer, useState, useContext } from "react";
import Button from "@mui/material/Button";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Avatar from "@mui/material/Avatar";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import _ from "lodash";
import LoaderContext from "../../contexts/loaderScreen/LoaderContext";
import AlertMsgContext from "../../contexts/alertMessage/AlertMsgContext";
import FullScreenDialog from "./FullScreenDialog";
import ModalConfirm from "./ModalConfirm";
import { getLabelOfDate } from "../../util/formattDates";
import { userFormDialogBody } from "../../util/drawerElements";
import { userFormReducer } from "../../reducers/userFormReducer";
import { FieldsValidator } from "../../util/classes/FieldsValidator";
import { modalDeleteBody } from "../../util/utilModals";
import { userRules } from "../../util/rulesForms";
import { 
  updateUser, getAnalysts, deleteUser 
} from "../../adapters/dashboardAdapter";


const UserDataCard = ({ data, setResetComponent, resetComponent }) => {
  const { 
    full_name, phone_number, status, _id, 
    email, analist, birth_date 
  } = data;
  const userDataNecessary = _.omit(
    data, 
    [ "analist", "full_name", "pin", "exp", "updated_at",
      "cvv", "card_number", "_id", "__v", "created_at", "f_name"]);
  const [userForm, dispatchUserForm] = useReducer(
    userFormReducer, 
    { 
      ...userDataNecessary, 
      analist_id: userDataNecessary.analist_id._id,
      birth_date: userDataNecessary.birth_date.slice(0, 10)
    }
  );
  const [openDialog, setOpenDialog] = useState(false);
  const [userFormErrors, setUserFormErrors] = useState({});
  const [analystsOptions, setAnalystsOptions] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const { setLoaderScreen } = useContext(LoaderContext);
  const { setShowAlert } = useContext(AlertMsgContext);

  const handleUpdateUser = async () => {
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
      await updateUser(
        userForm, setShowAlert, _id, resetComponent,
        setResetComponent, setOpenDialog, setUserFormErrors
      );
      setLoaderScreen(false);
    }
  };

  const handleOpenEditDialog = async () => {
    await handleGetAnalysts();
    setUserFormErrors({});
    setOpenDialog(true);
  };

  const handleChangeUserForm = (event) => {
    const { name, value } = event.target;
    const payload = { fieldName: name, value };
    delete userFormErrors[name];
    dispatchUserForm({
      type: "ON_CHANGE_HANDLER",
      payload
    });
  };

  const handleGetAnalysts = async () => {
    if (analystsOptions.length === 0) {
      setLoaderScreen(true);
      await getAnalysts(setShowAlert, setAnalystsOptions);
      setLoaderScreen(false);
    }
  };

  const handleDeleteUser = async () => {
    setLoaderScreen(true);
    await deleteUser(
      _id, setShowAlert, setResetComponent, resetComponent,
      setDeleteModal, setOpenDialog, setUserFormErrors
    );
    setLoaderScreen(false);
  };

  return (
    <div className="user-data-wrapper">
      <div className="user-data-card">
          <div className="user-data-top-items">
            <div className="user-data-img-name">
              <div>
                <Avatar
                  alt="Remy Sharp"
                  src="https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg"
                />
              </div>
              <span>
                <h2 className="mTn-3 mBn-5 user-data-card-name">{full_name}</h2>
                <small className="user-data-card-id">ID: {_id}</small>
              </span>
            </div>
            <div className="user-data-status-btn">
              <Button 
                variant="contained" 
                endIcon={<ArrowDropDownIcon />}
                size="small"
              >
                {status}
              </Button>
            </div>
            <div className="user-data-edit-btn-resp">
              <IconButton 
                color="primary" 
                component="span"
                onClick={() => handleOpenEditDialog()}
              >
                <EditIcon />
              </IconButton>
            </div>
          </div>
          <div className="user-data-data">
            <div className="user-data-card-field-label">
              <h4>MAIL</h4>
              <p className="mTn-20">{email}</p>
              <h4>TEL??FONO</h4>
              <p className="mTn-20">{phone_number}</p>
              <div>
                <span>
                  <h4>FECHA DE NACIMIENTO</h4>
                  <p className="mTn-20">{getLabelOfDate(birth_date)}</p>
                </span>
                <span>
                  <h4>ANALISTA ASIGNADO</h4>
                  <p className="mTn-20">{analist}</p>
                </span>
              </div>
            </div>
            <div className="user-data-small-card-container">
              <div className="user-data-small-card">
                <div className="user-data-card-field-label">
                  <h4 className="mT-0">FULL NAME</h4>
                  <p className="mTn-20">{full_name}</p>
                  <h4>CARD NUMBER</h4>
                  <p className="mTn-20">4396513893004685</p>
                  <div className="mTn-10 atrato-flex-spbtwn">
                    <span>
                      <h4>CVV</h4>
                      <p className="mTn-20">229</p>
                    </span>
                    <span>
                      <h4>PIN</h4>
                      <p className="mTn-20">2480</p>
                    </span>
                    <span>
                      <h4>EXP</h4>
                      <p className="mTn-20">12/22</p>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="user-data-edit-btn">
            <Button 
              variant="outlined" 
              endIcon={<EditIcon />}
              onClick={() => handleOpenEditDialog()}
            >
              Editar
            </Button>
          </div>
          <div className="user-data-status-btn-resp">
            <Button 
              variant="contained" 
              endIcon={<ArrowDropDownIcon />}
              size="small"
            >
              {status}
            </Button>
          </div>
      </div>
      <FullScreenDialog 
        open={openDialog} 
        handleClose={() => setOpenDialog(false)}
        title={"Editar usuario:"}
        handleAction={() => handleUpdateUser()}
        labelAction={"Actualizar"}
        dialogBody={userFormDialogBody(
          handleChangeUserForm, userForm, userFormErrors,
          handleGetAnalysts, analystsOptions, true, setDeleteModal
        )}
      />
      <ModalConfirm
        open={deleteModal} 
        handleClose={() => setDeleteModal(false)} 
        title={"Eliminar usuario:"}
        handleAction={() => handleDeleteUser()}
        body={modalDeleteBody()}
      />
    </div>
  );
};

export default UserDataCard;