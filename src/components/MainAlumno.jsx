import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { URLALUMNOS } from '../url';
import Axios from 'axios';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

import Alert from '@mui/material/Alert';
import DeleteIconButton from '../assets/Delete Icon.png';
import EditIcon from '../assets/Edit Icon.png';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


const MainAlumno = () => {

  const [dataDB, setDataDB] = useState([]);
  const [deleteFlag, setDeleteFlag] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    cargarDatosDataDB();
  }, [dataDB.length, deleteFlag]);

  const cargarDatosDataDB = async () => {

    Axios.get(URLALUMNOS + "/listarAlumnos").then(res => {
      setDataDB(res.data);
    }).catch(error => {
      console.log('Error : ', error);
      throw Error('New Error Detected : ', error);
    });

  }

  const deleteAlumno = (idAlumno) => {

    Axios.delete(URLALUMNOS + '/' + idAlumno).then(res => {

      if (res != null && res != undefined) {

        setDeleteFlag(true);
        window.scrollTo(0,0);

        setTimeout(() => {
          setDeleteFlag(false);
          navigate('/alumnos');
        }, 2850);
      }
      
    }).catch(error => {

      console.log('ERROR : ', error);
      throw Error('New Error Detected : ', error);

    });
  }

  return (
    <div>
      <div className='pnlTitle'>
        <Button
          variant='text'
          className='btnAdd'
          onClick={() => navigate('/direcciones')}
        >
          Ir a Direcciones
        </Button>
        <h1> Lista De Alumnos </h1>
        <Button
          variant='outlined'
          className='btnAdd'
          onClick={() => navigate('/agregarAlumno')}
        >
          Agregar Alumno
        </Button>
      </div>

      {
        deleteFlag &&
        <Alert severity="success" style={{ margin: '18px' }}> Alumno Eliminado Con Exito </Alert>
      }

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 850 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align='center'> # </StyledTableCell>
              <StyledTableCell align='center'> ID </StyledTableCell>
              <StyledTableCell align="center"> Numero de Control </StyledTableCell>
              <StyledTableCell align="center"> Nombre </StyledTableCell>
              <StyledTableCell align="center"> Apellido Paterno </StyledTableCell>
              <StyledTableCell align="center"> Apellido Materno </StyledTableCell>
              <StyledTableCell align="center"> Email </StyledTableCell>
              <StyledTableCell align="center"> Dirección </StyledTableCell>
              <StyledTableCell align="center"> Teléfono </StyledTableCell>
              <StyledTableCell align="center"> Acciones </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              dataDB.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row" align='center'>
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell align="center"> {row.idAlumno} </StyledTableCell>
                  <StyledTableCell align="center"> {row.numControl} </StyledTableCell>
                  <StyledTableCell align="center"> {row.nombre} </StyledTableCell>
                  <StyledTableCell align="center"> {row.apPaterno} </StyledTableCell>
                  <StyledTableCell align="center"> {row.apMaterno} </StyledTableCell>
                  <StyledTableCell align="center"> {row.email} </StyledTableCell>
                  <StyledTableCell align="center"> {row.direccionId} </StyledTableCell>
                  <StyledTableCell align="center"> {row.telefono} </StyledTableCell>
                  <StyledTableCell align="center">
                    <div className='pnlBotones'>
                      <Button
                        color='warning'
                        variant='outlined'
                        style={{ margin: '5px' }}
                        onClick={() => navigate('/updateAlumno/' + row.idAlumno)}
                      > <img src={ EditIcon } width={32} /> </Button>
                      <Button
                        color='error'
                        variant='outlined'
                        style={{ margin: '5px' }}
                        onClick={() => deleteAlumno(row.idAlumno)}
                      > <img src={ DeleteIconButton } width={32} /> </Button>

                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>

    </div>
  )
}

export default MainAlumno