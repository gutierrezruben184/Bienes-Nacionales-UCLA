import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import Swal from 'sweetalert2';
import API from "../utils/API";

export default function MaterialTableDemo() {
  const [marcas, setMarcas] = React.useState([]);

  async function getMarcas(){
    await API.get("/api.marca")
      .then(
      res => {
        //console.log(res.data)
        setMarcas(res.data)
      })
      .catch(e => {
        console.log("error" + e);
      })
  }

  useEffect(() => {
    getMarcas()
  }, []);

  async function refresh() {
    await getMarcas()
  }

  async function addMarca(newData){
    await API.post("/api.marca",
    {
      idmarca: newData.idmarca,
      nombre: newData.nombre,
    }
    )
    .then(res => {
        Swal.fire(
        'Listo!',
        'Marca Agregada con Exito!',
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



  async function updateMarcas(newData, oldData){
    await API.put("/api.marca/"+oldData.idmarca,
    {
      idmarca: newData.idmarca,
      nombre: newData.nombre,
    }
    )
    .then(res => {
        Swal.fire(
        'Listo!',
        'Marca modificada con Exito!',
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

  async function DeleteMarcas(idmarca){
   await API.delete("/api.marca/"+idmarca,
    )
    .then(res => {
        Swal.fire(
        'Listo!',
        'Marca Eliminada con Exito!',
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
      title="Lista de Marcas"
      columns={[
        { title: 'ID Marca', field: 'idmarca' },
        { title: 'Nombre', field: 'nombre' }]}
      data={marcas}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              addMarca(newData)
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              updateMarcas(newData, oldData)
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              DeleteMarcas(oldData.idmarca)
            }, 600);
          }),
      }}
    />
  );
}






