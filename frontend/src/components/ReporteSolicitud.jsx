import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import API from "../utils/API";
import Select from 'react-select';


const lookupEquipos = (equipos) => {
    let lookup = {}
    equipos.map((equipo) => 
      (
    lookup[equipo.idequipo] = equipo.nombre
    ))
    console.log("mostrando lookup equipos")
    console.log(lookup)
    return lookup
  }

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [equipos, setEquipos] = useState([]);

  async function getEquipos(){
    await API.get("/api.equipo")
      .then(
      res => {
        lookupEquipos(res.data)
      })
      .catch(e => {
        console.log("error" + e);
      })
  }

  useEffect(() => {
    getEquipos()
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        abrir
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Reporte Solicitud de Equipos</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Reportar un Equipo Dañado o Defectuso
          </DialogContentText>
          <Select
                autoFocus
                value=""
                
                inputProps={{
                  name: 'ID Equipo',
                  id: 'ID Equipo',
                }}
              >
              </Select>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="Descripcion"
              label="Descripcion"
              name="Descripcion"
              autoComplete="Descripcion"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="Fecha de Registro"
              label="Fecha de Registro"
              type="date"
              name="Fecha de Registro"
              autoComplete="Fecha de Registro"
              autoFocus
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleClose} color="primary">
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}