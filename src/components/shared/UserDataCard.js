import React from 'react';
import Button from '@mui/material/Button';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Avatar from '@mui/material/Avatar';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';

const UserDataCard = ({ data }) => {
  const { fullName, phoneNumber, status, id, email, analist, birthDate } = data;

  return (
    <div className='user-data-wrapper'>
      <div className='user-data-card'>
          <div className='user-data-top-items'>
            <div className='user-data-img-name'>
              <div>
                <Avatar
                  alt="Remy Sharp"
                  src="https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg"
                />
              </div>
              <span>
                <h2 className='mTn-3 mBn-5'>{fullName}</h2>
                <small>ID: {id}</small>
              </span>
            </div>
            <div className='user-data-status-btn'>
              <Button 
                variant="contained" 
                endIcon={<ArrowDropDownIcon />}
                size="small"
              >
                {status}
              </Button>
            </div>
            <div className='user-data-edit-btn-resp'>
              <IconButton color="primary" component="span">
                <EditIcon />
              </IconButton>
            </div>
          </div>
          <div className='user-data-data'>
            <div>
              <h4>MAIL</h4>
              <p className='mTn-20'>{email}</p>
              <h4>TELÉFONO</h4>
              <p className='mTn-20'>{phoneNumber}</p>
              <div>
                <span>
                  <h4>FECHA DE NACIMIENTO</h4>
                  <p className='mTn-20'>{birthDate}</p>
                </span>
                <span>
                  <h4>ANALISTA ASIGNADO</h4>
                  <p className='mTn-20'>{analist}</p>
                </span>
              </div>
            </div>
            <div className='user-data-small-card-container'>
              <div className='user-data-small-card'>
                <div>
                  <h4 className='mT-0'>FULL NAME</h4>
                  <p className='mTn-20'>{fullName}</p>
                  <h4>CARD NUMBER</h4>
                  <p className='mTn-20'>4396513893004685</p>
                  <div className='mTn-10 atrato-flex-spbtwn'>
                    <span>
                      <h4>CVV</h4>
                      <p className='mTn-20'>229</p>
                    </span>
                    <span>
                      <h4>PIN</h4>
                      <p className='mTn-20'>2480</p>
                    </span>
                    <span>
                      <h4>EXP</h4>
                      <p className='mTn-20'>12/22</p>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='user-data-edit-btn'>
            <Button 
              variant="outlined" 
              endIcon={<EditIcon />}
            >
              Editar
            </Button>
          </div>
          <div className='user-data-status-btn-resp'>
            <Button 
              variant="contained" 
              endIcon={<ArrowDropDownIcon />}
              size="small"
            >
              {status}
            </Button>
          </div>
      </div>
    </div>
  );
};

export default UserDataCard;