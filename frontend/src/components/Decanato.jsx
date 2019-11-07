import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from "axios";

const localhost= 'localhost:8080'


export default function MaterialTableDemo() {
  const [state, setState] = React.useState([]);


  async function refresh() {
    const response = await getDecanatos()
   
      console.log(response)
      //return response
      setState(response)
  }

  async function getDecanatos(){
    try{
      const response = await axios({
        url: `http://${localhost}/backend/webresources/api.decanato`,
        method: 'GET'
      })
      return response.data
      } catch(e){
        console.log(e)
    }
  }

  async function postDecanatos(datos){
    try{
      const response = await axios({
        url: `http://${localhost}/backend/webresources/api.decanato`,
        method: 'POST',
        data: {
                nombre: datos.nombre,
                direccion: datos.direccion,
                estatus: datos.estatus          
              }
      })
      refresh();
      alert("guardo con exito");
      return response.data
      } catch(e){
        console.log(e)
        alert("error al guardar");

    }
  }

  async function updateDecanatos(newData, oldData){
    try{
      const response = await axios({
        url: `http://${localhost}/backend/webresources/api.decanato/`+oldData.iddecanato,
        method: 'PUT',
        data: {
                nombre: newData.nombre,
                direccion: newData.direccion,
                estatus: newData.estatus,
                iddecanato  : newData.iddecanato     
              },
        
      })
            alert("exito al modificar");

      refresh();
      return response.data
      } catch(e){
        console.log(e);
        alert("error al modificar");
    }
  }

  async function deleteDecanatos(id){
    try{
      const response = await axios({
        url: `http://${localhost}/backend/webresources/api.decanato/`+id,
        method: 'DELETE',
        })
        refresh();
        alert("exito al eliminar");
        return response.data
      } catch(e){
        console.log(e);
        alert("error al eliminar");
    }
  }

  useEffect(() => {
    async function loadDecanatos () {
      const response = await getDecanatos()
     
        console.log(response)
        //return response
        setState(response)
    }
    loadDecanatos()
  }, []);



  return (
  
    <MaterialTable
      title="Lista de Decanatos"
      columns = {[
        { title: 'Nombre', field: 'nombre' },
        { title: 'Dirección', field: 'direccion' },
        { title: 'Estatus', field: 'estatus', lookup: {A:"Activo",I:"Inactivo"}},
      ]}
      data={state}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              console.log(newData);
              postDecanatos(newData);
              /* const data = [...state];
              data.push(newData);
              console.log(newData);
              setState({ ...state, data }); */
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              console.log(oldData);
              console.log(newData);
              updateDecanatos(newData, oldData)
              /* const data = [...state.data];
              data[data.indexOf(oldData)] = newData;
              setState({ ...state, data }); */
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              console.log(oldData)
              deleteDecanatos(oldData.iddecanato);
              /* const data = [...state.data];
              data.splice(data.indexOf(oldData), 1);
              setState({ ...state, data }); */
            }, 600);
          }),
      }}
    />

  );
}