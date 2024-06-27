import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

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

import Axios from 'axios';
import { URLDIRECCION } from '../url';


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

const MainDireccion = () => {

    const [ dataDB, setDataDB ] = useState([]);
    const [ deleteFlag, setDeleteFlag ] = useState(false);

    const navigate = useNavigate();

    useEffect( () => {  
        cargarDatosDataDB();
    }, [ dataDB.length, deleteFlag ] );

    const cargarDatosDataDB =  async () => {

        Axios.get(URLDIRECCION + "/listarDomicilios").then( res => {
        setDataDB( res.data );
        } ).catch( error => {
            console.log('Error : ', error);
            throw Error('New Error Detected : ', error);
        });

    }

    const deleteDireccion = (idDirreccion) => {

        Axios.delete(URLDIRECCION + '/' + idDirreccion).then( res => {

            if ( res != null && res != undefined ) {
                setDeleteFlag(true);
                setTimeout(() => {
                    setDeleteFlag(false);
                    navigate('/direcciones');
                }, 2850);
            }
        }).catch( error => {
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
                    onClick={() => navigate('/alumnos')}
                >
                    Ir a Alumnos
                </Button>
                <h1> Lista De Direcciones </h1>
                <Button
                    variant='outlined'
                    className='btnAdd'
                    onClick={() => navigate('/agregarDireccion')}
                >
                    Agregar Direcición
                </Button>
            </div>

            {
                deleteFlag &&
                <Alert severity="success" style={ { margin: '18px' } }> Dirección Eliminada Con Exito </Alert>
            }

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 850 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align='center'> # </StyledTableCell>
                            <StyledTableCell align='center'> ID </StyledTableCell>
                            <StyledTableCell align="center"> Calle </StyledTableCell>
                            <StyledTableCell align="center"> Colonia </StyledTableCell>
                            <StyledTableCell align="center"> Ciudad </StyledTableCell>
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
                                    <StyledTableCell align="center"> {row.idDireccion} </StyledTableCell>
                                    <StyledTableCell align="center"> {row.calle} </StyledTableCell>
                                    <StyledTableCell align="center"> {row.colonia} </StyledTableCell>
                                    <StyledTableCell align="center"> {row.ciudad} </StyledTableCell>
                                    <StyledTableCell align="center">
                                        <div className='pnlBotones'>
                                            <Button
                                                color='warning'
                                                variant='contained'
                                                style={ { margin: '5px' } }
                                                onClick={ () => navigate('/updateDireccion/' + row.idDireccion) }
                                            > Editar </Button>
                                            <Button
                                                color='error'
                                                variant='contained'
                                                style={ { margin: '5px' } }
                                                startIcon={<DeleteIcon />}
                                                onClick={ () => deleteDireccion( row.idDireccion ) }
                                            > Eliminar </Button>

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

export default MainDireccion
