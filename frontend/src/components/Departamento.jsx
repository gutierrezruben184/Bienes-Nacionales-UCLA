import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import API from "../utils/API";
import Swal from 'sweetalert2';


export default function MaterialTableDemo() {
  const [state, setState] = React.useState([]);
  const [decanatos, setDecanato] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);

  const lookupDecanatos = (decanatos) => {
    let lookup = {}
    decanatos.map((decanato) => {
      lookup[decanato.iddecanato] = decanato.nombre
    })
    return lookup
  }

  async function refresh() {
    await getDepartamentos()
  }

  async function getDepartamentos() {
    await API.get("/api.departamento")
      .then(
        res => {
          setDepartamentos(res.data)
        })
      .catch(e => {
        console.log("error" + e);
      })
  }

  async function getDecanatos() {
    await API.get("/api.decanato")
      .then(
        res => {
          setDecanato(res.data)
          lookupDecanatos(res.data)
        })
      .catch(e => {
        console.log("error" + e);
      })
  }

  useEffect(() => {
    getDepartamentos()
    getDecanatos()
  }, []);

  async function postDepartamentos(datos) {
    await API.post("/api.departamento",
      {
        nombre: datos.nombre,
        fkIddecanato: decanatos.find(decanato => decanato.iddecanato == datos.fkIddecanato.iddecanato),
        estatus: datos.estatus,
      }
    )
      .then(res => {
        Swal.fire(
          'Listo!',
          'Departamento Agregado con Exito!',
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

  async function updateDepartamentos(newData, oldData) {
    await API.put("/api.departamento/" + oldData.iddepartamento,
      {
        nombre: newData.nombre,
        fkIddecanato: newData.fkIddecanato,
        estatus: newData.estatus,
        iddepartamento: newData.iddepartamento
      }
    ).then(res => {
      Swal.fire(
        'Listo!',
        'Departamento Modificado con Exito!',
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

  async function deleteDepartamentos(id) {
    await API.delete("/api.departamento/" + id)
      .then(res => {
        Swal.fire(
          'Listo!',
          'Departamento Eliminado con Exito!',
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
    async function loadDepartamentos() {
      const response = await getDepartamentos()
      setState(response)
    }
    loadDepartamentos()
  }, []);

  return (
    <MaterialTable
      title="Lista de Departamentos"
      localization={{
        header: {
          actions: "Acciones"
        },
        body: {
          addTooltip: "Agregar Departamento",
          deleteTooltip: "Eliminar Departamento",
          editTooltip: "Editar Departamento",
          editRow: {
            deleteText: '¿Desea eliminar el Departamento?',
            cancelTooltip: 'Cancelar',
            saveTooltip: 'Guardar'
          },
        },
        toolbar: {
          searchPlaceholder: 'Buscar'
        }
      }}
      columns={[
        { title: 'Nombre', field: 'nombre' },
        { title: 'Decanato', field: 'fkIddecanato.iddecanato', lookup: lookupDecanatos(decanatos) },
        { title: 'Estatus', field: 'estatus', lookup: { a: "Activo", i: "Inactivo" } }
      ]}
      data={departamentos}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              postDepartamentos(newData);
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              updateDepartamentos(newData, oldData)
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              deleteDepartamentos(oldData.iddepartamento);
            }, 600);
          }),
      }}
    />
  );
}