import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from "axios";
import Swal from 'sweetalert2';


const localhost= '192.168.43.244:8080'

export default function MaterialTableDemo() {
  const [state, setState] = React.useState([]);

  async function getMarcas(){
    try{
      const response = await axios({
        url: `http://localhost:8080/backend/webresources/api.marca`,
        method: 'GET'
      })
      return response.data
  
    } catch(e){
      console.log(e)
  
    }
  }

  useEffect(() => {
    async function loadMarcas () {
      const response = await getMarcas()
        //console.log(response)
        setState(response)
            
    }
    loadMarcas()
  }, []);

  async function refresh() {
    const response = await getMarcas()
      setState(response)
  }

  async function addMarca(datos){
    try{
      const response = await axios({
        url: `http://localhost:8080/backend/webresources/api.marca`,
        method: 'POST',
        data: {
                idmarca: datos.idmarca,
                nombre: datos.nombre,                
              }
      })
      refresh();
      Swal.fire(
        'Listo!',
        'Marca Agregada con Exito!',
        'success'
      )
      return response.data
      } catch(e){
        console.log(e)
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Algo salió mal!',
        })
    }
  }

  async function updateMarcas(newData, oldData){
    try{
      const response = await axios({
        url: `http://localhost:8080/backend/webresources/api.marca/`+oldData.idmarca,
        method: 'PUT',
        data: {
                idmarca: newData.idmarca,
                nombre: newData.nombre,
              }
      })
      refresh();
      Swal.fire(
        'Listo!',
        'Marca Actualizada con Exito!',
        'success'
      )
      return response.data
      } catch(e){
        console.log(e)
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Algo salió mal!',
        })
    }
  }


  async function DeleteMarcas(idmarca){
    try{

      
      
      const response = await axios({
        url: `http://localhost:8080/backend/webresources/api.marca/${idmarca}`,
        method: 'DELETE'
      })
      
      let resultado = state.filter( state => (
        idmarca != idmarca
   ));
        refresh();
        Swal.fire(
          'Listo!',
          'Marca Eliminada con Exito!',
          'success'
        )
        setState(resultado)

    } catch(e){
      console.log(e)
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Algo salió mal!',
      })

    }
    
  }


  return (
    <MaterialTable
      title="Lista de Marcas"
      columns={[
        { title: 'ID Marca', field: 'idmarca' },
        { title: 'Nombre', field: 'nombre' }]}
      data={state}
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






