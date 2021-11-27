import React from 'react';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export const userFormDialogBody = (handleChange, userForm, errors) => {
  const {
    email, phoneNumber, firstName, secondName, status,
    firstLastName, secondLastName, birthDate, analist
  } = userForm;
  const errorsArr = Object.keys(errors);

  return (
    <div className='create-user-form-wrapper'>
      <div className='create-user-form-container'>
        <TextField
          required
          id="filled-required1"
          label="Correo electrónico:"
          variant="outlined"
          className='create-user-text-field'
          onChange={(e) => handleChange(e)}
          value={email}
          name='email'
          error={errorsArr.includes('email')}
          helperText={
            errorsArr.includes('email') ? 
            errors['email'] :
            "Ejemplo: usuario-nuevo@email.com"
          }
        />
        <TextField
          required
          id="filled-required2"
          label="Número de teléfono"
          variant="outlined"
          className='create-user-text-field'
          onChange={(e) => handleChange(e)}
          value={phoneNumber}
          name='phoneNumber'
          error={errorsArr.includes('phoneNumber')}
          helperText={
            errorsArr.includes('phoneNumber') ? 
            errors['phoneNumber'] :
            "Ejemplo: 3378765522"
          }
        />
        <TextField
          required
          id="filled-required3"
          label="Primer nombre"
          variant="outlined"
          className='create-user-text-field'
          onChange={(e) => handleChange(e)}
          value={firstName}
          name='firstName'
          error={errorsArr.includes('firstName')}
          helperText={
            errorsArr.includes('firstName') ? 
            errors['firstName'] :
            "Solo el primer nombre, sin apellidos"
          }
        />
        <TextField
          id="filled-required4"
          label="Segundo nombre"
          variant="outlined"
          className='create-user-text-field'
          onChange={(e) => handleChange(e)}
          value={secondName}
          name='secondName'
          error={errorsArr.includes('secondName')}
          helperText={
            errorsArr.includes('secondName') ? 
            errors['secondName'] :
            "Solo si cuenta con segundo nombre"
          }
        />
        <TextField
          required
          id="filled-required5"
          label="Primer apellido"
          variant="outlined"
          className='create-user-text-field'
          onChange={(e) => handleChange(e)}
          value={firstLastName}
          name='firstLastName'
          error={errorsArr.includes('firstLastName')}
          helperText={
            errorsArr.includes('firstLastName') ? 
            errors['firstLastName'] :
            "Solo el primer apellido"
          }
        />
        <TextField
          required
          id="filled-required6"
          label="Segundo apellido"
          variant="outlined"
          className='create-user-text-field'
          onChange={(e) => handleChange(e)}
          value={secondLastName}
          name='secondLastName'
          error={errorsArr.includes('secondLastName')}
          helperText={
            errorsArr.includes('secondLastName') ? 
            errors['secondLastName'] :
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
          className='create-user-text-field'
          onChange={(e) => handleChange(e)}
          value={birthDate}
          name='birthDate'
          error={errorsArr.includes('birthDate')}
          helperText={
            errorsArr.includes('birthDate') ? 
            errors['birthDate'] :
            "Da clic en el calendario o ingresala manualmente"
          }
        />
        <FormControl className='create-user-text-field'>
          <InputLabel id="demo-simple-select-helper-label">
            Estatus *
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            label="Estatus"
            onChange={(e) => handleChange(e)}
            name='status'
            value={status}
            error={errorsArr.includes('status')}
          >
            <MenuItem value={'pendiente'}>
              PENDIENTE
            </MenuItem>
            <MenuItem value={'proceso'}>
              EN PROCESO
            </MenuItem>
            <MenuItem value={'completado'}>
              COMPLETADO
            </MenuItem>
          </Select>
          <FormHelperText error={errorsArr.includes('status')}>
            {
              errorsArr.includes('status') ? 
              errors['status'] :
              "Elige el estatus correcto"
            }
          </FormHelperText>
        </FormControl>
        <FormControl className='create-user-text-field'>
          <InputLabel id="demo-simple-select-helper-label2">
            Analista asignado *
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label2"
            id="demo-simple-select-helper2"
            label="Analista asignado"
            onChange={(e) => handleChange(e)}
            name='analist'
            value={analist}
            error={errorsArr.includes('analist')}
          >
            <MenuItem value={1}>
              Germán Gutiérrez
            </MenuItem>
            <MenuItem value={2}>
              Manuel Jímenez
            </MenuItem>
            <MenuItem value={3}>
              Sarabi Hernández
            </MenuItem>
          </Select>
          <FormHelperText error={errorsArr.includes('analist')}>
            {
              errorsArr.includes('analist') ? 
              errors['analist'] :
              "Asigna un analista a este usuario"
            }
          </FormHelperText>
        </FormControl>
      </div>
    </div>
  );
};