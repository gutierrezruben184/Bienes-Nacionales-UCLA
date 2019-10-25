import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from "axios";

export default function MaterialTableDemo() {
  const [state, setState] = React.useState([]);

  async function getEquipos(){
    try{
      const response = await axios({
        url: `http://localhost:8080/UCLA-BN/webresources/api.equipo`,
        method: 'GET'
      })
      return response.data
  
    } catch(e){
      console.log(e)
  
    }
  }

  useEffect(() => {
    async function loadEquipos () {
      const response = await getEquipos()
      console.log(response)
      setState(response)
        
    }
    
    loadEquipos()
  }, []);

  async function refresh() {
    const response = await getEquipos()
      setState(response)
  }

  async function addEquipo(datos){
    try{
      const response = await axios({
        url: `http://localhost:8080/UCLA-BN/webresources/api.equipo`,
        method: 'POST',
        data: {
                idequipo: datos.idequipo,
                nombre: datos.nombre,   
                //fkIdmarca.idmarca: datos.fkIdmarca.idmarca,
                //fkIddepartamento: datos.fkIddepartamento.idunidad,
                //fkIdestadoequipo: datos.fkIdestadoequipo.idestadoequipo,

              }
      })
      refresh();
      return response.data
      } catch(e){
        console.log(e)
    }
  }

  async function updateEquipos(newData, oldData){
    try{
      const response = await axios({
        url: `http://localhost:8080/UCLA-BN/webresources/api.equipo/`+oldData.idequipo,
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

  async function DeleteEquipos(idequipo){
    try{
      const response = await axios({
        url: `http://localhost:8080/UCLA-BN/webresources/api.equipo/${idequipo}`,
        method: 'DELETE'
      })
      let resultado = state.filter( state => (
        idequipo != idequipo
   ));
        refresh();
        setState(resultado)

    } catch(e){
      console.log(e)

    }
    
  }
  

  return (
    <MaterialTable
      title="Lista de Equipos"
      columns={[
        { title: 'ID Equipo', field: 'idequipo' },
        { title: 'Nombre', field: 'nombre' },
        { title: 'ID Marca', field: 'fkIdmarca.idmarca' },
        { title: 'ID Departamento', field: 'fkIddepartamento.idunidad' },
        { title: 'ID Estado-Equipo', field: 'fkIdestadoequipo.idestadoequipo'}]}
      data={state}
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
    />
  );
}
