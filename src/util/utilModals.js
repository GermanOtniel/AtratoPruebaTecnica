import React from 'react';
import WarningIcon from '@mui/icons-material/Warning';

export const modalDeleteBody = () => {
  return (
    <React.Fragment>
      <div style={{ textAlign:'center', color:'rgb(199, 2, 2)' }}>
        <WarningIcon />
      </div>
      <p>
        ¿Estás seguro de eliminar este elemento? 
        Si es así da clic en el botón Aceptar, de lo 
        contrario da clic en Cancelar
      </p>
    </React.Fragment>
  );
};