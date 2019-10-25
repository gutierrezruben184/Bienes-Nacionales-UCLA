import React, { useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from "axios";

const localhost= '192.168.43.244:8080'


export default function MaterialTableDemo() {
  const [state, setState] = React.useState([]);

  async function refresh() {
    const response = await getDepartamentos()
   
      console.log(response)
      //return response
      setState(response)
  }

  async function getDepartamentos(){
    try{
      const response = await axios({
        url: `http://${localhost}/backend/webresources/api.departamento`,
        method: 'GET'
      })
      return response.data
      } catch(e){
        console.log(e)
    }
  }

  async function postDepartamentos(datos){
    try{
      const response = await axios({
        url: `http://${localhost}/backend/webresources/api.departamento`,
        method: 'POST',
        data: {
                nombre: datos.nombre,
                idUnidad: datos.fk_decanatoid,
                estatus: datos.estatus          
              }
      })
      refresh();
      return response.data
      } catch(e){
        console.log(e)
    }
  }

  async function updateDepartamentos(newData, oldData){
    try{
      const response = await axios({
        url: `http://${localhost}/backend/webresources/api.departamento/`+oldData.iddepartamento,
        method: 'PUT',
        data: {
                nombre: newData.nombre,
                decanato: newData.fk_decanatoid,
                estatus: newData.estatus,
                iddepartamento  : newData.iddepartamento     
              }
      })
      refresh();
      return response.data
      } catch(e){
        console.log(e)
    }
  }

  async function deleteDepartamentos(id){
    try{
      const response = await axios({
        url: `http://${localhost}/backend/webresources/api.departamento/`+id,
        method: 'DELETE',
        })
        refresh();
        return response.data
      } catch(e){
        console.log(e)
    }
  }

  useEffect(() => {
    async function loadDepartamentos () {
      const response = await getDepartamentos()
     
        console.log(response)
        //return response
        setState(response)
    }
    loadDepartamentos()
  }, []);


  return (
    <MaterialTable
      title="Lista de Departamentos"
      columns={[
        { title: 'Nombre', field: 'nombre' },
        { title: 'Decanato', field: 'fk_decanatoid' },
        { title: 'Estatus', field: 'estatus', lookup: {A:"Activo",I:"Inactivo"} }
        ]}
      data={state}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              postDepartamentos(newData);
              // const data = [...state.data];
              // data.push(newData);
              // setState({ ...state, data });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              updateDepartamentos(newData, oldData)
              // const data = [...state.data];
              // data[data.indexOf(oldData)] = newData;
              // setState({ ...state, data });
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              deleteDepartamentos(oldData.iddepartamento);
              // const data = [...state.data];
              // data.splice(data.indexOf(oldData), 1);
              // setState({ ...state, data });
            }, 600);
          }),
      }}
    />
  );
}
