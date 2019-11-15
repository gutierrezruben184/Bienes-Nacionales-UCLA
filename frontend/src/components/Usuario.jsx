import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import Swal from 'sweetalert2';
import API from "../utils/API";


const lookupDepartamento = (departamentos) => {
  let lookup = {}
  departamentos.map((departamento,i) => 
    (
  lookup[departamento.iddepartamento] = departamento.nombre
  ))
  console.log(lookup)
  return lookup
}
export default function Usuario() {
  const [usuarios, setUsuarios] = useState([]); //Setiamos con Set y la data de usuarios se guarda en la variable "usuarios"
  const [departamentos, setDepartamentos] = useState([]);

  useEffect(() => {
    getUsuario()
    getDepartamento()
  }, []);

  //Funcion que refresca la tabla con los nuevos datos
  async function refresh() {
    await getUsuario()
  }

  //Petición a la Api Rest para los usuario guardados
  async function getUsuario(){
    await API.get("/api.usuario")
      .then(
      res => {
        setUsuarios(res.data)
        console.log(res.data)
      })
      .catch(e => {
        console.log("error" + e);
      })
  }

  //Petición a la Api Rest para cargar unidades
  async function getDepartamento(){
    await API.get("/api.departamento")
      .then(
      res => {
        setDepartamentos(res.data)
          console.log(res.data)
      })
      .catch(e => {
        console.log("error" + e);
      })
  }

  //Funcion para guardar nuevos usuarios
  async function postUsuario(datos){
    await API.post("/api.usuario",
    {      
      fkIddepartamento: departamentos.find( departamento => departamento.iddepartamento == datos.fkIddepartamento.iddepartamento),
      cedula: datos.cedula,
      contrasenna: datos.cedula,
      nombre: datos.nombre,
      apellido: datos.apellido,
      correo: datos.correo,
      tipo: datos.tipo,
      estatus: datos.estatus,
    })
    .then(res => {
        Swal.fire(
        'Listo!',
        'Usuario Agregado con Exito!',
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
  //Funcion para actualizar un usuario
  async function updateUsuario(newData, oldData){
    await API.put("/api.usuario/"+oldData.cedula,
    {
      fkIddepartamento: departamentos.find( departamento => departamento.iddepartamento == newData.fkIddepartamento.iddepartamento),
      cedula: newData.cedula,
      contrasenna: oldData.cedula,
      nombre: newData.nombre,
      apellido: newData.apellido,
      correo: newData.correo,
      tipo: newData.tipo,
      estatus: newData.estatus
    })
    .then(res => {
        Swal.fire(
        'Listo!',
        'Usuario modificado con Exito!',
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
  //funcion para eliminar un usuario
  async function DeleteUsuario(id){
    await API.delete("/api.usuario/"+id,)
    .then(res => {
        Swal.fire(
        'Listo!',
        'Usuario Eliminado con Exito!',
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
      title="Lista de Usuarios"
    //Con localization se le cambia el lenguaje o a los mensajes especificos de la plantilla
    localization = {{
      header:{
        actions: "Acciones"
      },
      body: {
        addTooltip:"Agregar Usuario",
        deleteTooltip:"Eliminar Usuario",
        editTooltip:"Editar Usuario",
          editRow: {
            deleteText: '¿Desea eliminar el Usuario?',
            cancelTooltip: 'Cancelar',
            saveTooltip:'Guardar'
        },
      },
      toolbar:{
        searchPlaceholder: 'Buscar Usuario'
      }
    }}
      columns={[
                { title: 'Cedula', field: 'cedula', editable: 'onAdd' },
                { title: 'Nombre', field: 'nombre' },
                { title: 'Apellido', field: 'apellido' },
                { title: 'Correo', field: 'correo' },
                { title: 'Tipo', field: 'tipo', lookup: {1:"Administrador", 2:"Empleado"}},
                { title: 'Departamento', field: 'fkIddepartamento.iddepartamento', lookup: lookupDepartamento(departamentos) },
                { title: 'Estatus', field: 'estatus', lookup: {a:"Activo",i:"Inactivo"}}
              ]}
      data={usuarios} //Aqui es donde se cargan los datos del Get en la tabla
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              console.log("Usuario Guardado: " + newData);
              postUsuario(newData);              
            }, 600);
          }),
          onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              console.log(oldData);
              updateUsuario(newData, oldData)
              console.log("Usuario Actualizado: ");
              console.log(newData);
            }, 600);
          }),
          onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              console.log("Usuario Eliminado" + oldData)
              DeleteUsuario(oldData.cedula);
            }, 600);
          }),
      }}
    />
  );
}
