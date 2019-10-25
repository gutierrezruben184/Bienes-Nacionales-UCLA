import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from "axios";

const localhost= '192.168.43.244:8080'

export default function MaterialTableDemo() {
  const [state, setState] = React.useState([]);

  async function getMarcas(){
    try{
      const response = await axios({
        url: `http://${localhost}/UCLA-BN/webresources/api.marca`,
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
        console.log(response)
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
        url: `http://${localhost}/UCLA-BN/webresources/api.marca`,
        method: 'POST',
        data: {
                idmarca: datos.idmarca,
                nombre: datos.nombre,                
              }
      })
      refresh();
      return response.data
      } catch(e){
        console.log(e)
    }
  }

  async function updateMarcas(newData, oldData){
    try{
      const response = await axios({
        url: `http://${localhost}/UCLA-BN/webresources/api.marca/`+oldData.idmarca,
        method: 'PUT',
        data: {
                nombre: newData.nombre,
              }
      })
      refresh();
      return response.data
      } catch(e){
        console.log(e)
    }
  }


  async function DeleteMarcas(idmarca){
    try{
      const response = await axios({
        url: `http://${localhost}/UCLA-BN/webresources/api.marca/${idmarca}`,
        method: 'DELETE'
      })
      let resultado = state.filter( state => (
        idmarca != idmarca
   ));
        refresh();
        setState(resultado)

    } catch(e){
      console.log(e)

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






