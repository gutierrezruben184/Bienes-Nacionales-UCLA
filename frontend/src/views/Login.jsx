import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import image from '../assets/img/ucla.jpg';
import API from "../utils/API"
import Swal from 'sweetalert2';

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh"
  },
  image: {
    backgroundImage: `url(${image})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function SignInSide(props) {
  const classes = useStyles();

  const [values, setValues] = useState({
    cedula: "",
    contrasenna: "",
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //setValues({...values, open:false});
    await API.post(`/api.usuario/login/${values.cedula}/${values.contrasenna}`)
      .then(
        res => {
          console.log(res);
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('tipoUsuario', res.data.tipo);
          localStorage.setItem('cedula', res.data.cedula);
          localStorage.setItem('dpto', res.data.depto);
          //hay que setear el objeto departamentp
          localStorage.setItem('nombre', res.data.depto);
          window.location.href = "/menu";
        },
        error => {
          console.log(error);
          setValues({cedula:'',contrasenna:''});
          Swal.fire({
            type: 'error',
            title: 'Error al iniciar sesión',
            text: 'Por favor verique los datos y vuelva a intentar',
          })
          //solo para probar////////////////////
          localStorage.setItem('token', '123');
          localStorage.setItem('tipoUsuario','1');
          localStorage.setItem('cedula', '25147289');
          const dpto = {
            "estatus": "a",
            "fkDecanatoid":{
            "direccion": "cerca de metropolis",
            "estatus": "a",
            "iddecanato": 12234,
            "nombre": "dcyt"
            },
            "idunidad": 1,
            "nombre": "hola"}
          localStorage.setItem('dpto', JSON.stringify(dpto) );
          localStorage.setItem('nombre', 'Ruben');
           window.location.href = "/menu";
           ///////////////////////
        }
      );
  };


  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Inicio de Sesión
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="cedula"
              label="Cedula"
              name="cedula"
              autoComplete="cedula"
              autoFocus
              value={values.cedula}
              onChange={handleChange("cedula")}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="contrasenna"
              label="Contraseña"
              type="password"
              id="contrasenna"
              autoComplete="current-contrasenna"
              value={values.contrasenna}
              onChange={handleChange("contrasenna")}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Iniciar Sesión
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  ¿Olvidó su contraseña?
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
