import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import API from "../utils/API";
import Swal from 'sweetalert2';
import AssignmentIcon from '@material-ui/icons/Assignment';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from 'react-select';

const lookupMarcas = (marcas) => {
  let lookup = {}
  marcas.map((marca) => 
    (
  lookup[marca.idmarca] = marca.nombre
  ))
  return lookup
}

export default function Equipo() {

  let idequipo = React.createRef();
  let descripcion = React.createRef();
  let fecha = React.createRef();
  let observacion = React.createRef();
  let tiposolicitud = React.createRef();

  const [equipos, setEquipos] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [equipoObj, setEquipoObj] = useState({});
  const [open, setOpen] = React.useState(false);
  const usu = JSON.parse(localStorage.getItem('usuario'))
  const tipo = [
    {
      value: '1',
      label: 'Reparacion' 
    },
    {
      value: '2',
      label: 'Desincorporacion' 
    }
  ]
  let today = new Date(),
    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

  const lookupEquipos = (equipo) => {
    let lookup = []
    let obj = {
      value: '',
      label: ''
    }
    obj.value = equipo.idequipo
    obj.label = equipo.nombre
    lookup.push(obj)
    return lookup
  }

  const handleClickOpen = (equipo) => {
    setOpen(true);
    setEquipoObj(equipo);
  };

  const handleClose = () => {
    setOpen(false);
  };




  async function getEquipos(){
    await API.get(`/api.equipo/dec/${usu.fkIddepartamento.iddepartamento}`)
      .then(
      res => {
        console.log(res.data)
        setEquipos(res.data)
      })
      .catch(e => {
        console.log("error" + e);
      })
  }

  async function getMarcas(){
    await API.get("/api.marca")
      .then(
      res => {
        console.log(res.data)
        setMarcas(res.data)
      })
      .catch(e => {
        console.log("error" + e);
      })
  }

  
  useEffect(() => {
    getEquipos()
    getMarcas()
  }, []);

  async function refresh() {
    await getEquipos()
  }

  async function addSolicitud(){



    console.log('los Refs')
    console.log(descripcion.current.childNodes[1].childNodes[0].value)
    console.log(date) 
    console.log(usu)
    console.log(observacion.current.childNodes[1].childNodes[0].value)
    console.log(tiposolicitud.current.state.value.value)
    console.log(equipoObj) 
    console.log(idequipo.current.state.value.value)
    
    
    if(descripcion.current.childNodes[1].childNodes[0].value == "" || observacion.current.childNodes[1].childNodes[0].value == ""){
     alert('Debe Rellernar Todos los Campos')    
    }
    else{
      await API.post("/api.reportesolicitud",
    {
      

      

        descripcion: descripcion.current.childNodes[1].childNodes[0].value,

        estatus: 'a',

        fecharegistro: date,

       /* fkIdequipo:{
          fkIddepartamento: equipoObj.fkIddepartamento,
          fkIdestadoequipo: {
            idestadoequipo: 2,
            tipo: "malo",
            },
            fkIdmarca: equipoObj.fkIdmarca,
            idequipo: equipoObj.idequipo,
            nombre: equipoObj.nombre,
        },*/

        fkIdequipo: equipoObj,
        
        fkUsuariocedula: usu,

        //idreporte: null,

        observacion: observacion.current.childNodes[1].childNodes[0].value,

        tipo: tiposolicitud.current.state.value.value,
        
        
    }
    )
    .then(res => {

      if(tiposolicitud.current.state.value.value == "1" ){
      CambiarEstatus3(equipoObj)
      handleClose()
      }else{CambiarEstatus2(equipoObj)
        handleClose()}
      
        Swal.fire(
        'Listo!',
        'Solicitud Enviada con Exito!',
        'success'
      )
      
      refresh()
        
      })
      .catch(error => {
        console.log(error)
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Algo salió mal!',
        })
      })
    }
  }

  async function CambiarEstatus2(equipoObj){
    
    await API.put("/api.equipo/"+equipoObj.idequipo,
    {
        fkIddepartamento: equipoObj.fkIddepartamento,
        fkIdestadoequipo: {
          idestadoequipo:  2,
          tipo: equipoObj.fkIdestadoequipo.idestadoequipo == "" ? "malo" : "reparacion"
        }, 
        fkIdmarca: marcas.find( marca => marca.idmarca == equipoObj.fkIdmarca.idmarca ),
        nombre: equipoObj.nombre,
        idequipo: equipoObj.idequipo
    }
    )
    .then(res => {refresh()})

  }
  async function CambiarEstatus3(equipoObj){
    
    await API.put("/api.equipo/"+equipoObj.idequipo,
    {
        fkIddepartamento: equipoObj.fkIddepartamento,
        fkIdestadoequipo: {
          idestadoequipo:  3,
          tipo: equipoObj.fkIdestadoequipo.idestadoequipo == "" ? "malo" : "reparacion"
        }, 
        fkIdmarca: marcas.find( marca => marca.idmarca == equipoObj.fkIdmarca.idmarca ),
        nombre: equipoObj.nombre,
        idequipo: equipoObj.idequipo
    }
    )
    .then(res => {refresh()})

  }
 
  async function addEquipo(newData){
    await API.post("/api.equipo",
    {
        fkIddepartamento: usu.fkIddepartamento,
        fkIdestadoequipo: {
          idestadoequipo: newData.fkIdestadoequipo.idestadoequipo,
          tipo: newData.fkIdestadoequipo.idestadoequipo == "1" ? "bueno" : "malo" //cambiar
        }, 
        fkIdmarca:  marcas.find( marca => marca.idmarca == newData.fkIdmarca.idmarca ),
        nombre: newData.nombre,
    }
    )
    .then(res => {
        Swal.fire(
        'Listo!',
        'Equipo Agregado con Exito!',
        'success'
      )
        refresh()
      })
      .catch(error => {
        console.log(error)
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Algo salió mal!',
        })
      })
  }

  async function updateEquipos(newData, oldData){
    await API.put("/api.equipo/"+newData.idequipo,
    {
        fkIddepartamento: usu.fkIddepartamento,
        fkIdestadoequipo: {
          idestadoequipo: newData.fkIdestadoequipo.idestadoequipo,
          tipo: newData.fkIdestadoequipo.idestadoequipo == "1" ? "bueno" : "malo" 
        }, 
        fkIdmarca: marcas.find( marca => marca.idmarca == newData.fkIdmarca.idmarca ),
        nombre: newData.nombre,
        idequipo: newData.idequipo
    }
    )
    .then(res => {
        refresh()
        Swal.fire(
        'Listo!',
        'Equipo modificado con Exito!',
        'success'
      )
      })
      .catch(error => {
        console.log(error)
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Algo salió mal!',
        })
      })
  }

  async function DeleteEquipos(idequipo){
    // no se deberia eliminar
   await API.delete("/api.equipo/"+idequipo,
    )
    .then(res => {
        Swal.fire(
        'Listo!',
        'Equipo Eliminado con Exito!',
        'success'
      )
        refresh()
      })
      .catch(error => {
        console.log(error)
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Algo salió mal!',
        })
      })
    
  }
  

  return (
    <div>
    <div>
      <MaterialTable
        title="Lista de Equipos"
        localization = {{
          body: {
              editRow: {
                deleteText: '¿Seguro que quieres borrar?'
            }
          }
        }}
        columns={[
          { title: 'Nombre', field: 'nombre' },
          { title: 'Marca', field: 'fkIdmarca.idmarca', lookup: lookupMarcas(marcas) },
          { title: 'Estado del Equipo', field: 'fkIdestadoequipo.idestadoequipo', 
          lookup: {1: 'bueno', 2:'malo', 3:'en reparacion'}}
          ]}
        data={equipos}
        editable={{
          onRowAdd: newData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                addEquipo(newData)
              }, 600);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                updateEquipos(newData, oldData)
              }, 600);
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                DeleteEquipos(oldData.idequipo)
              }, 600);
            }),
        }}
        actions={[
          {
            icon: () => <AssignmentIcon/>,
            tooltip: 'Generar reporte',
            onClick: (event, rowData)  =>  {
              handleClickOpen(rowData)
            }
          }
        ]}
      />
    </div>
    <div>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Reporte Solicitud de Equipos </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Reportar un Equipo Dañado o Defectuso
          </DialogContentText>
            <Select 
              defaultValue={lookupEquipos(equipoObj)} 
              ref={idequipo} 
              fullWidth
              required
              variant="outlined"
              margin="normal"
              autoComplete="Descripcion"
              autoFocus
            />
            <Select 
              defaultValue={tipo}
              options={tipo} 
              ref={tiposolicitud} 
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="Descripcion"
              label="Descripcion"
              name="Descripcion"
              autoComplete="Descripcion"
              autoFocus
              ref={descripcion} 
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="Observacion"
              label="Observacion"
              name="Observacion"
              autoComplete="Observacion"
              autoFocus
              ref={observacion} 
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={addSolicitud} color="primary">
            Enviar
          </Button>
        </DialogActions>
      </Dialog>

    </div>
    </div>
  );
}
