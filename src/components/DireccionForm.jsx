import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Axios from 'axios'
import { URLDIRECCION } from '../url';
import { ErrorTypes } from '../helpers';

import { Button, Grid, TextField } from '@mui/material';
import Alert from '@mui/material/Alert';

const DireccionForm = ( { propsIdDireccion } ) => {

    const { idDireccion } = useParams();
    const navigate = useNavigate();

    const [ calle, setCalle ] = useState('');
    const [ colonia, setColonia ] = useState('');
    const [ ciudad, setCiudad ] = useState('');
    const [ editFlag, setEditFlag ] = useState(false);
    const [ saveFlag, setSaveFlag ] = useState(false);

    const [errorFlag, setErrorFlag] = useState({
        status: false,
        type: ErrorTypes,
        message: ''
      });


      console.log('PropsIdDirección : ', propsIdDireccion);

    useEffect( () => {
        if ( idDireccion !== undefined ) {
            loadDireccion();
        }
    }, [ idDireccion, propsIdDireccion ]);

    useEffect( () => {
        if ( propsIdDireccion !== undefined ) {
            loadDireccionProps();
        }
    }, [ propsIdDireccion ]);

    const saveDireccionHandlerEvent = () => {
        if ( ( calle != '' && calle != undefined ) && ( colonia != '' && colonia != undefined ) &&
        ( ciudad != '' && ciudad != undefined ) ) {

            const objDireccion = {
                calle,
                colonia,
                ciudad
            }

            Axios.post(URLDIRECCION + '/saveDireccion', objDireccion).then( res => {
                if ( res != null && res != undefined ) {

                    setSaveFlag(true);

                    setTimeout(() => {
                        setSaveFlag(false);
                        navigate('/direcciones');
                    }, 2850);
                }

            }).catch( error => {
                console.log('Error!. ', error);

                setErrorFlag({
                    status: true,
                    type: ErrorTypes.saveError,
                    message: 'Error al Guardar la Dirección'
                  });
          
                  setTimeout(() => {
                    navigate('/direcciones');
                    setErrorFlag({});
                  }, 2850);

            });

        }

    }

    const loadDireccion = () => {
        Axios.get(URLDIRECCION + '/' + idDireccion).then( res => {
            if ( res != null && res != undefined ) {
                let objSelectedDireccion = res.data;
                setCalle( objSelectedDireccion.calle );
                setColonia( objSelectedDireccion.colonia );
                setCiudad( objSelectedDireccion.ciudad );
            }
        }).catch( error => {
            console.log('Error : ', error);

            setTimeout(() => {
                setErrorFlag(false);
            }, 2850);
            
        });
    }

    const loadDireccionProps = () => {
        Axios.get(URLDIRECCION + '/' + propsIdDireccion).then( res => {
            if ( res != null && res != undefined ) {
                let objSelectedDireccion = res.data;
                setCalle( objSelectedDireccion.calle );
                setColonia( objSelectedDireccion.colonia );
                setCiudad( objSelectedDireccion.ciudad );
            }
        }).catch( error => {

            console.log('Error : ', error);

            setTimeout(() => {
                setErrorFlag(false);
            }, 2850);
        });
    }

    const updateDireccionHandlerEvent = () => {

        if ( ( calle != '' && calle != undefined ) && ( colonia != '' && colonia != undefined ) &&
        ( ciudad != '' && ciudad != undefined ) ) {

            const objDireccion = {
                calle,
                colonia,
                ciudad
            }

            Axios.put( ( `${URLDIRECCION}/updateDireccion/${idDireccion}` ), objDireccion).then( res => {
                if ( res.data != null && res.data != undefined ) {
                    setEditFlag(true);
                    setTimeout(() => {
                        setEditFlag(false);
                        navigate('/direcciones');
                    }, 2850);
                }
            }).catch( error => {

                console.log('Error : ', error);

                setErrorFlag({
                    status: true,
                    type: ErrorTypes.editError,
                    message: 'Error al Actualizar la Dirección'
                  });
          
                  setTimeout(() => {
                    navigate('/direcciones');
                    setErrorFlag({});
                  }, 2850);
            });

        }
    }

  return (

    <div>
        {
            propsIdDireccion != undefined ? '' : (
                <>
                    <h1> { idDireccion === undefined ? 'Registrar Dirección' : 'Editar Dirección' }  </h1>
                    {
                        errorFlag.type && errorFlag.status && idDireccion != undefined &&
                            <Alert severity="error" style={ { margin: '18px' } }> { errorFlag.message }  </Alert>

                   }
                </>
            )
        }

        {
            editFlag &&
                <Alert severity="success" style={ { margin: '18px' } }> Dirección Actualizada Con Exito </Alert>
        }

        {
            saveFlag &&
                <Alert severity="success" style={ { margin: '18px' } }> Dirección Registrada Con Exito </Alert>
        }

      <Grid>
            <Grid item sm={10}>
                <TextField
                    label='Calle :'
                    style={{ margin: '12px' }}
                    name='calle'
                    value={ calle }
                    placeholder='Nombre de la Calle'
                    disabled={ propsIdDireccion }
                    onChange={ (e) => setCalle(e.target.value) }
                />
            </Grid>
    
            <Grid item sm={10}>
                <TextField
                    label='Colonia :'
                    style={{ margin: '12px' }}
                    name='colonia'
                    value={ colonia }
                    placeholder='Nombre de la Colonia'
                    disabled={ propsIdDireccion }
                    onChange={ (e) => setColonia(e.target.value) }
                />
            </Grid>
    
            <Grid item sm={10}>
                <TextField
                    label='Ciudad :'
                    style={{ margin: '12px' }}
                    name='ciudad'
                    value={ ciudad }
                    placeholder='Nombre de la Ciudad'
                    disabled={ propsIdDireccion }
                    onChange={ (e) => setCiudad(e.target.value) }
                />
            </Grid>
          </Grid>

        {
            propsIdDireccion != undefined ? '' : (
                <div>
                    <Button
                        variant='contained'
                        color='success'
                        onClick={idDireccion === undefined ? saveDireccionHandlerEvent : updateDireccionHandlerEvent}
                    > {idDireccion === undefined ? 'Guardar Dirección' : 'Actualizar Direccion'} </Button>
                </div>
              
            )
        }

    </div>
  )
}

export default DireccionForm
