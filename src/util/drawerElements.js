import React from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

export const userFormDialogBody = (
  handleChange, userForm, errors, handleGetAnalysts, 
  analystsOptions, isEditing = false, setOpenDelete) => {
  const {
    email, phone_number, first_name, second_name, status,
    first_last_name, second_last_name, birth_date, analist_id
  } = userForm;
  const errorsArr = Object.keys(errors);

  return (
    <div>
      <div className="create-user-form-wrapper">
        <div className="create-user-form-container">
          <TextField
            required
            id="filled-required1"
            label="Correo electrónico:"
            variant="outlined"
            className="create-user-text-field"
            onChange={(e) => handleChange(e)}
            value={email}
            name="email"
            error={errorsArr.includes("email")}
            helperText={
              errorsArr.includes("email") ? 
              errors["email"] :
              "Ejemplo: usuario-nuevo@email.com"
            }
          />
          <TextField
            required
            id="filled-required2"
            label="Número de teléfono"
            variant="outlined"
            className="create-user-text-field"
            onChange={(e) => handleChange(e)}
            value={phone_number}
            name="phone_number"
            error={errorsArr.includes("phone_number")}
            helperText={
              errorsArr.includes("phone_number") ? 
              errors["phone_number"] :
              "Ejemplo: 3378765522"
            }
          />
          <TextField
            required
            id="filled-required3"
            label="Primer nombre"
            variant="outlined"
            className="create-user-text-field"
            onChange={(e) => handleChange(e)}
            value={first_name}
            name="first_name"
            error={errorsArr.includes("first_name")}
            helperText={
              errorsArr.includes("first_name") ? 
              errors["first_name"] :
              "Solo el primer nombre, sin apellidos"
            }
          />
          <TextField
            id="filled-required4"
            label="Segundo nombre"
            variant="outlined"
            className="create-user-text-field"
            onChange={(e) => handleChange(e)}
            value={second_name}
            name="second_name"
            error={errorsArr.includes("second_name")}
            helperText={
              errorsArr.includes("second_name") ? 
              errors["second_name"] :
              "Solo si cuenta con segundo nombre"
            }
          />
          <TextField
            required
            id="filled-required5"
            label="Primer apellido"
            variant="outlined"
            className="create-user-text-field"
            onChange={(e) => handleChange(e)}
            value={first_last_name}
            name="first_last_name"
            error={errorsArr.includes("first_last_name")}
            helperText={
              errorsArr.includes("first_last_name") ? 
              errors["first_last_name"] :
              "Solo el primer apellido"
            }
          />
          <TextField
            required
            id="filled-required6"
            label="Segundo apellido"
            variant="outlined"
            className="create-user-text-field"
            onChange={(e) => handleChange(e)}
            value={second_last_name}
            name="second_last_name"
            error={errorsArr.includes("second_last_name")}
            helperText={
              errorsArr.includes("second_last_name") ? 
              errors["second_last_name"] :
              "Solo el segundo apellido"
            }
          />
          <TextField
            id="date"
            label="Fecha de nacimiento *"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            className="create-user-text-field"
            onChange={(e) => handleChange(e)}
            value={birth_date}
            name="birth_date"
            error={errorsArr.includes("birth_date")}
            helperText={
              errorsArr.includes("birth_date") ? 
              errors["birth_date"] :
              "Da clic en el calendario o ingresala manualmente"
            }
          />
          <FormControl className="create-user-text-field">
            <InputLabel id="demo-simple-select-helper-label">
              Estatus *
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              label="Estatus"
              onChange={(e) => handleChange(e)}
              name="status"
              value={status}
              error={errorsArr.includes("status")}
            >
              <MenuItem value={"PENDIENTE"}>
                PENDIENTE
              </MenuItem>
              <MenuItem value={"EN PROCESO"}>
                EN PROCESO
              </MenuItem>
              <MenuItem value={"COMPLETADO"}>
                COMPLETADO
              </MenuItem>
            </Select>
            <FormHelperText error={errorsArr.includes("status")}>
              {
                errorsArr.includes("status") ? 
                errors["status"] :
                "Elige el estatus correcto"
              }
            </FormHelperText>
          </FormControl>
          <FormControl className="create-user-text-field">
            <InputLabel 
              error={errorsArr.includes("analist_id")}
              id="demo-simple-select-helper-label2"
            >
              Analista asignado *
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label2"
              id="demo-simple-select-helper2"
              label="Analista asignado"
              onChange={(e) => handleChange(e)}
              onFocus={() => handleGetAnalysts()}
              name="analist_id"
              value={analist_id}
              error={errorsArr.includes("analist_id")}
            >
              { analystsOptions.map((analyst, i) => (
                <MenuItem value={analyst.value} key={i}>
                  {analyst.label}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText error={errorsArr.includes("analist_id")}>
              {
                errorsArr.includes("analist_id") ? 
                errors["analist_id"] :
                "Asigna un analista a este usuario"
              }
            </FormHelperText>
          </FormControl>
        </div>
      </div>
      
      { isEditing && 
        <div className="update-user-delete">
          <div>
            <Button onClick={() => setOpenDelete(true)}>Eliminar</Button>
          </div>
        </div> }
    </div>
  );
};