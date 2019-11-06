import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import API from "../utils/API";
import Swal from 'sweetalert2';
import AssignmentIcon from '@material-ui/icons/Assignment';


const lookupMarcas = (marcas) => {
  let lookup = {}
  marcas.map((marca,i) => 
    (
  lookup[marca.idmarca] = marca.nombre
  ))
  // console.log(lookup)
  return lookup
}

export default function Equipo() {
  const [equipos, setEquipos] = useState([]);
  const [marcas, setMarcas] = useState([]);


  async function getEquipos(){
    await API.get("/api.equipo")
      .then(
      res => {
        // console.log(res.data)
        setEquipos(res.data)
        // lookupMarcas(res.data.fkIdmarca)
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
        // lookupMarcas(res.data)
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
 
  async function addEquipo(newData){
    await API.post("/api.equipo",
    {
        fkIddepartamento: JSON.parse(localStorage.getItem('dpto')),
        fkIdestadoequipo: {
          idestadoequipo: newData.fkIdestadoequipo.idestadoequipo,
          tipo: newData.fkIdestadoequipo.idestadoequipo == "1" ? "activo" : "inactivo" //cambiar
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
        fkIddepartamento: newData.fkIddepartamento,
        fkIdestadoequipo: {
          idestadoequipo: newData.fkIdestadoequipo.idestadoequipo,
          tipo: newData.fkIdestadoequipo.idestadoequipo == "1" ? "activo" : "inactivo" //cambiar
        }, 
        fkIdmarca: marcas.find( marca => marca.idmarca == newData.fkIdmarca.idmarca ),
        nombre: newData.nombre,
        idequipo: newData.idequipo
    }
    )
    .then(res => {
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
        lookup: {1: 'activo', 2:'no activo'}}
        ]}
      data={[
        {nombre:'prueba'},
        {nombre:'prueba2'},
      ]}
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
          onClick: (event, rowData)  => alert("Dialog para el formulario " + rowData.name)
        }
      ]}
    />
  );
}
