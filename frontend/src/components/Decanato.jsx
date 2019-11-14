import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import Swal from 'sweetalert2';
import API from "../utils/API";

export default function Decanato() {
  const [decanatos, setDecanatos] = useState([]); //Setiamos con Set y la data de decanatos se guarda en la variable "decanatos"

  useEffect(() => {
    getDecanatos()
  }, []);

  //Funcion que refresca la tabla con los nuevos datos
  async function refresh() {
    await getDecanatos()
  }

  //Petición a la Api Rest para los decanatos guardados
  async function getDecanatos(){
    await API.get("/api.decanato")
      .then(
      res => {
        setDecanatos(res.data)
      })
      .catch(e => {
        console.log("error" + e);
      })
  }

  //Funcion para guardar nuevos decanatos
  async function postDecanatos(datos){
    await API.post("/api.decanato",
    {
      nombre: datos.nombre,
      direccion: datos.direccion,
      estatus: datos.estatus 
    }
    )
    .then(res => {
        Swal.fire(
        'Listo!',
        'Decanato Agregado con Exito!',
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

  //Funcion para actualizar un decanato
  async function updateDecanatos(newData, oldData){
    await API.put("/api.decanato/"+oldData.iddecanato,
    {
      nombre: newData.nombre,
      direccion: newData.direccion,
      estatus: newData.estatus,
      iddecanato  : newData.iddecanato  
    })
    .then(res => {
        Swal.fire(
        'Listo!',
        'Decanato modificado con Exito!',
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

  //funcion para eliminar un decanato
  async function deleteDecanatos(id){
    await API.delete("/api.decanato/"+id,)
    .then(res => {
        Swal.fire(
        'Listo!',
        'Decanato Eliminado con Exito!',
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
      title="Lista de Decanatos"
      //Con localization se le cambia el lenguaje o a los mensajes especificos de la plantilla
      localization = {{
        header:{
          actions: "Acciones"
        },
        body: {
          addTooltip:"Agregar Decanato",
          deleteTooltip:"Eliminar Decanato",
          editTooltip:"Editar Decanato",
            editRow: {
              deleteText: '¿Desea eliminar el Decanato?',
              cancelTooltip: 'Cancelar',
              saveTooltip:'Guardar'
          },
        },
        toolbar:{
          searchPlaceholder: 'Buscar Decanato'
        }
      }}
      columns = {[
        { title: 'Nombre', field: 'nombre' },
        { title: 'Dirección', field: 'direccion' },
        { title: 'Estatus', field: 'estatus', lookup: {a:"Activo",i:"Inactivo"}},
      ]}
      data={decanatos} //Aqui es donde se cargan los datos del Get en la tabla
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              console.log("Decanato Guardado: " + newData);
              postDecanatos(newData);              
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              console.log(oldData);
              console.log("Decanato Actualizado: " + newData);
              updateDecanatos(newData, oldData)
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              console.log("Decanato Eliminado" + oldData)
              deleteDecanatos(oldData.iddecanato);
            }, 600);
          }),
      }}
    />
  );
}