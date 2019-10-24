import React, { useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from "axios";

export default function MaterialTableDemo() {
  const [state, setState] = React.useState([]);

  async function getDepartamento(){
    try{
      const response = await axios({
        url: `http://localhost:8080/UCLA-BN/webresources/api.departamento`,
        method: 'GET'
      })
      return response.data

    } catch(e){
      console.log(e)

    }
  }
  
  useEffect(() => {
    async function loadDepartamentos () {
      const response = await getDepartamento()
       
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
        { title: 'Estatus', field: 'estatus' }
        ]}
      data={state}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data.push(newData);
              setState({ ...state, data });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data[data.indexOf(oldData)] = newData;
              setState({ ...state, data });
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data.splice(data.indexOf(oldData), 1);
              setState({ ...state, data });
            }, 600);
          }),
      }}
    />
  );
}
