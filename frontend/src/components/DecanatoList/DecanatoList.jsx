import React from 'react';
import MaterialTable from 'material-table';

export default function MaterialTableDemo() {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Nombre', field: 'nombre' },
      { title: 'Dirección', field: 'direccion' },
      { title: 'Estatus', field: 'estatus' },
    ],
    data: [
      { 
        nombre: 'Ciencias y tecnologias', 
        direccion: 'Obelisco', 
        estatus: 'Activo' 
      },
      { 
        nombre: 'Ingenieria Civil', 
        direccion: 'Zona Indutrial',
        estatus: 'Activo',
      },
    ],
  });

  return (
    <MaterialTable
      title="Lista de Decanatos"
      columns={state.columns}
      data={state.data}
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
