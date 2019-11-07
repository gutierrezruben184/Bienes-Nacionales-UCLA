import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import API from "../utils/API";
import axios from "axios";
import Swal from 'sweetalert2';

const localhost= 'localhost:8080'

export default function MaterialTableDemo() {
  const [state, setState] = React.useState([]);
  const [decanatos, setDecanato] = useState([]);

  const lookupDecanatos = (decanatos) => {
    let lookup = {}
    decanatos.map((decanato) => {
      lookup[decanato.iddecanato] = decanato.nombre
    })
    console.log('decanatos')
    console.log(lookup)
    return lookup
  }

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

  async function getDecanatos(){
    await API.get("/api.decanato")
      .then(
      res => {
        console.log(res.data)
        setDecanato(res.data)
        lookupDecanatos(res.data)
        // let lookup = {}
        //   res.data.map((data) => {
        //     lookup[data.iddecanato] = data.nombre
        //   })
        //   console.log('decanatos')
        //   console.log(lookup)
      })
      .catch(e => {
        console.log("error" + e);
      })
  }

  useEffect(() => {
    getDepartamentos()
    getDecanatos()
  }, []);

  async function postDepartamentos(datos){
      await axios({
        url: `http://${localhost}/backend/webresources/api.departamento`,
        method: 'POST',
        data: {
                nombre: datos.nombre,
                fkDecanatoid: decanatos.find( decanato => decanato.iddecanato == datos.fkDecanatoid.iddecanato ),
                estatus: datos.estatus,          
              }
      })
      .then(res => {
        Swal.fire(
        'Listo!',
        'Decanato Agregado con Exito!',
        'success'
      )
        refresh()
      }).catch(error => {
        console.log(error)
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Algo salió mal!',
        })
      })
  }

  async function updateDepartamentos(newData, oldData){
       await axios({
        url: `http://${localhost}/backend/webresources/api.departamento/`+oldData.idunidad,
        method: 'PUT',
        data: {
                nombre: newData.nombre,
                fkDecanatoid: newData.fkDecanatoid,
                estatus: newData.estatus,
                idunidad  : newData.idunidad     
              }
      }).then(res => {
        Swal.fire(
        'Listo!',
        'Decanato Modificado con Exito!',
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

  async function deleteDepartamentos(id){
    await axios({
        url: `http://${localhost}/backend/webresources/api.departamento/`+id,
        method: 'DELETE',
      })
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
        { title: 'Decanato', field: 'fkDecanatoid.iddecanato', lookup: lookupDecanatos(decanatos) },
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
              deleteDepartamentos(oldData.idunidad);
              // const data = [...state.data];
              // data.splice(data.indexOf(oldData), 1);
              // setState({ ...state, data });
            }, 600);
          }),
      }}
    />
  );
}
