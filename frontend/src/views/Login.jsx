import React, { useState } from "react";
import axios from "axios";

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


import Modal from '../components/Modal';

const localhost= '192.168.43.244:8080'

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
    open: false,
    message: ''
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValues({...values, open:false});
    await axios
      .post(
        `http://${localhost}/backend/webresources/api.usuario/login/${values.cedula}/${values.contrasenna}`
      )
      .then(
        res => {
          console.log(res);
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('tipoUsuario', res.data.tipo);
          localStorage.setItem('cedula', res.data.cedula);
          localStorage.setItem('dpto', res.data.depto);
          localStorage.setItem('nombre', res.data.depto);
          window.location.href = "/menu";
        },
        error => {
          console.log(error);
          setValues({cedula:'',contrasenna:'', open: true, message: 'La cedula o la contraseña no son validas, por favor verique los datos y vuelva a intentar' });
          //solo para probar
          localStorage.setItem('token', '123');
          window.location.href = "/menu/decanato";
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


            {values.open ? <Modal message={values.message} /> : ''}

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
