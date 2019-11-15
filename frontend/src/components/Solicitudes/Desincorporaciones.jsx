import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Swal from 'sweetalert2';
import API from "../../utils/API";

export default function Desincorporaciones() {

    const [desincorporaciones, setDesincorporaciones] = useState([]);

    useEffect(() => {
    getDesincorporaciones()
  }, []);

  //Funcion que refresca la tabla con los nuevos datos
  async function refresh() {
    await getDesincorporaciones()
  }

  //Petición a la Api Rest
  async function getDesincorporaciones(){
    await API.get('/api.reportesolicitud/solicitud/2')
      .then(
      res => {
        setDesincorporaciones(res.data)
        console.log(res.data)
      })
      .catch(e => {
        console.log("error" + e);
      })
  }

  async function updateDesincorporaciones(newData, oldData){
    await API.put("/api.reportesolicitud/"+oldData.idreporte,
    { 
      estatus: newData.estatus,
      observacion: newData.observacion,
      fkIdequipo: oldData.fkIdequipo,
      fkUsuariocedula: oldData.fkUsuariocedula,
      idreporte: oldData.idreporte,
      descripcion: oldData.descripcion,
      tipo: oldData.tipo,
      fecharegistro: oldData.fecharegistro
    })
    .then(res => {
        Swal.fire(
        'Listo!',
        'El estado de la Solicitud se ha modificado con Exito!',
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
        <MaterialTable
          title="Solicitudes de Desincorporación"
          //Con localization se le cambia el lenguaje o a los mensajes especificos de la plantilla
          localization = {{
            header:{
              actions: "Acciones"
            },
            body: {
              editTooltip:"Editar Estatus",
                editRow: {
                  cancelTooltip: 'Cancelar',
                  saveTooltip:'Guardar'
              },
            },
            toolbar:{
                searchPlaceholder: 'Buscar Desincorporación'
            }
          }}
          columns = {[
            { title: 'Tipo', field: 'tipo', editable: 'never', lookup: {1:"Reparacion",2:"Desincorporacion"}},
            { title: 'Equipo', field: 'fkIdequipo.nombre', editable: 'never' },
            { title: 'Descripcion', field: 'descripcion', editable: 'never' },            
            { title: 'Fecha', field: 'fecharegistro', editable: 'never' },           
            { title: 'Estatus', field: 'estatus', lookup: {1:"Aceptada",2:"Pospuesta",3:"En espera"}},
            { title: 'Observación', field: 'observacion'}
          ]}
          data={desincorporaciones} //Aqui es donde se cargan los datos del Get en la tabla          
          detailPanel={[
            {
              tooltip: 'Detalles',
              render: data => {
                return (
                  <div>
                     <Grid container spacing={4}  direction="row" justify="center"  alignItems="center">
                        <Grid item xs={4}>
                          <h3>Responsable</h3>
                            <Paper spacing={2}>
                              <TextField
                              variant="outlined"
                              margin="normal"
                              fullWidth
                              disabled
                              label="Cedula"
                              defaultValue= {data.fkUsuariocedula.cedula}
                              />
                            </Paper>                      
                            <Paper spacing={2}>
                              <TextField
                              variant="outlined"
                              margin="normal"
                              fullWidth
                              disabled
                              label="Nombre"
                              defaultValue= {data.fkUsuariocedula.nombre}
                              />
                            </Paper>
                            <Paper spacing={2}>
                              <TextField
                              variant="outlined"
                              margin="normal"
                              fullWidth
                              disabled
                              label="Apellido"
                              defaultValue= {data.fkUsuariocedula.apellido}
                              />
                            </Paper>
                      </Grid>      
                      <Grid item xs={4}>     
                          <h3>Detalles del Equipo</h3>
                            <Paper spacing={2}>
                              <TextField
                              variant="outlined"
                              margin="normal"
                              fullWidth
                              disabled
                              label="Nombre"
                              defaultValue= {data.fkIdequipo.nombre}
                              />
                            </Paper>
                            <Paper spacing={2}>
                              <TextField
                              variant="outlined"
                              margin="normal"
                              fullWidth
                              disabled
                              label="Departamento"
                              defaultValue= {data.fkIdequipo.fkIddepartamento.nombre}
                              />
                            </Paper>
                            <Paper spacing={2}>
                              <TextField
                              variant="outlined"
                              margin="normal"
                              fullWidth
                              disabled
                              label="Decanato"
                              defaultValue= {data.fkIdequipo.fkIddepartamento.fkIddecanato.nombre}
                              />
                            </Paper>
                          </Grid>
                      </Grid>     
                  </div>
                )
              },
            }]}
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  console.log(oldData);
                  console.log("Solicitud de Desincorporación: " + newData);
                  updateDesincorporaciones(newData, oldData)
                }, 600);
              }),
            }}
        />
      );
}
