import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Axios from 'axios'
import { URLALUMNOS, URLDIRECCION } from '../url';
import { createNumcontrol, ErrorTypes } from '../helpers';
import DireccionForm from './DireccionForm';


import { Button, Grid, TextField } from '@mui/material';
import Alert from '@mui/material/Alert';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const AlumnoForm = () => {

  const { idAlumno } = useParams();
  const navigate = useNavigate();

  const [alumno, setAlumno] = useState({
    numControl: '',
    nombre: '',
    apPaterno: '',
    apMaterno: '',
    email: '',
    direccionId: 0,
    telefono: ''
  });

  const [menuDataDirecciones, setMenuDataDirecciones] = useState([]);

  const [editFlag, setEditFlag] = useState(false);
  const [saveFlag, setSaveFlag] = useState(false);
  const [errorFlag, setErrorFlag] = useState({
    status: false,
    type: ErrorTypes,
    message: ''
  });

  useEffect(() => {
    if (idAlumno !== undefined) {
      loadAlumno();
    }
  }, [idAlumno]);

  useEffect(() => {
    loadMenuDataDirecciones();
  }, [ menuDataDirecciones.length] );


  useEffect(() => {
    let numControl = idAlumno === undefined ? createNumcontrol() : '';
    setAlumno({
      ...alumno,
      ...alumno.numControl = numControl
    })
  }, [alumno.numControl]);


  const alumnoEventHandler = (e) => {
    setAlumno({
      ...alumno,
      [e.target.name]: e.target.value
    });
  }

  const loadMenuDataDirecciones = async () => {

    Axios.get(URLDIRECCION + "/listarDomicilios").then(res => {
      setMenuDataDirecciones(res.data);
    }).catch(error => {
      console.log('Error : ', error);
    });

  }


  const loadAlumno = () => {

    Axios.get(URLALUMNOS + '/idAlumno/' + idAlumno).then( res => {
        if ( res != null && res != undefined ) {
            let objAlumnoSelected = res.data;
            setAlumno( objAlumnoSelected );
        }
    }).catch( error => {

        console.log('Error : ', error);

        setErrorFlag(true)
        setTimeout(() => {
            setErrorFlag(false);
        }, 2850);
        
    });
  }

  const saveAlumnoHandlerEvent = () => {

    if (Object.keys(alumno) != null && Object.keys(alumno) != '' && Object.keys(alumno)) {

      Axios.post(URLALUMNOS + '/guardarAlumno', alumno).then(res => {
        if (res != null && res != undefined) {
          setSaveFlag(true);
          window.scrollTo(0,0)

          setTimeout(() => {
            navigate('/alumnos');
            setSaveFlag(false);
          }, 2850);
        }

      }).catch(error => {
        console.log('Error!. ', error);

        setErrorFlag({
          status: true,
          type: ErrorTypes.saveError,
          message: 'Error al Guardar al Alumno'
        });

        setTimeout(() => {
          navigate('/alumnos');
          setErrorFlag({});
        }, 2850);
      });

    }

  }

  const updateAlumnoHandlerEvent = () => {

    if (Object.keys(alumno) != null && Object.keys(alumno) != '' && Object.keys(alumno)) {

        Axios.put((URLALUMNOS + '/updateAlumno/' + idAlumno), alumno ).then( res => {
            if ( res.data != null && res.data != undefined ) {

                setEditFlag(true);
                window.scrollTo(0,0);

                setTimeout(() => {
                    setEditFlag(false);
                    navigate('/alumnos');
                }, 2850);

            }
        }).catch( error => {

            console.log('Error : ', error);

            setErrorFlag({
              status: true,
              type: ErrorTypes.editError,
              message: 'Error al Actualizar al Alumno'
            });

        });

    }

  }


  return (
    <div>
      <h1> {idAlumno === undefined ? 'Registrar Alumno' : 'Editar Alumno'}  </h1>

      {
        editFlag &&
        <Alert severity="success" style={{ margin: '18px' }}> Alumno Actualizado Con Exito </Alert>
      }

      {
        saveFlag &&
        <Alert severity="success" style={{ margin: '18px' }}> Alumno Registrado Con Exito </Alert>
      }

      {
        errorFlag.type.editError && errorFlag.status && idAlumno != undefined &&
        <Alert severity="error" style={{ margin: '18px' }}> Error al Actualizar al Alumno </Alert>
      }

      {
        errorFlag.type.saveError && errorFlag.status && idAlumno != undefined &&
        <Alert severity="error" style={{ margin: '18px' }}> Error al Registrar al Alumno </Alert>
      }

      <Grid>
        <Grid item sm={10}>
          <TextField
            label='Número de Control :'
            style={{ margin: '12px' }}
            name='numControl'
            value={alumno.numControl}
            placeholder='Número de control'
            disabled
          />
        </Grid>

        <Grid item sm={10}>
          <TextField
            label='Nombre :'
            style={{ margin: '12px' }}
            name='nombre'
            value={alumno.nombre}
            placeholder='Nombre del Alumno'
            onChange={alumnoEventHandler}
          />
        </Grid>

        <Grid item sm={10}>
          <TextField
            label='Apellido Paterno :'
            style={{ margin: '12px' }}
            name='apPaterno'
            value={alumno.apPaterno}
            placeholder='Apellido Paterno'
            onChange={alumnoEventHandler}
          />
        </Grid>

        <Grid item sm={10}>
          <TextField
            label='Apellido Materno :'
            style={{ margin: '12px' }}
            name='apMaterno'
            value={alumno.apMaterno}
            placeholder='Apellido Materno'
            onChange={alumnoEventHandler}
          />
        </Grid>

        <Grid item sm={10}>
          <TextField
            label='Email :'
            style={{ margin: '12px' }}
            name='email'
            value={alumno.email}
            placeholder='Email'
            onChange={alumnoEventHandler}
          />
        </Grid>

        <FormControl sx={ { minWidth: 230 } }>
          <InputLabel id="demo-simple-select-label"> Dirección </InputLabel>
          <Select
            labelId="Dirección"
            id="selectDireccion"
            value={ alumno.direccionId }
            label="Dirección"
            name='direccionId'
            onChange={ alumnoEventHandler }
            
          >
            { 
              menuDataDirecciones.length > 0 &&
              menuDataDirecciones.map(menu => (
                <MenuItem
                  key={menu.idDireccion}
                  value={menu.idDireccion}
                >
                  {`Dirección : Calle : ${menu.calle} , Colonia : ${menu.colonia} `} 
                </MenuItem>
              ))
            }
          </Select>
        </FormControl>

        {

          alumno.direccionId > 0 && alumno.direccionId != '' && alumno.direccionId != undefined &&

          <>
            <p> <b> Dirección : {alumno.direccionId} </b> </p>
            <DireccionForm propsIdDireccion={alumno.direccionId} />
          </>

        }

        <Grid item sm={10}>
          <TextField
            label='Teléfono :'
            style={{ margin: '12px' }}
            name='telefono'
            value={alumno.telefono}
            placeholder='Teléfono'
            onChange={alumnoEventHandler}
          />
        </Grid>

      </Grid>

      <div>
        <Button
          variant='contained'
          color='success'
          onClick={idAlumno === undefined ? saveAlumnoHandlerEvent : updateAlumnoHandlerEvent}
        > {idAlumno === undefined ? 'Guardar Dirección' : 'Actualizar Direccion'} </Button>
      </div>


    </div>
  )
}

export default AlumnoForm