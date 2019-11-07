import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';


import image from '../assets/img/notFound.png'

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
    margin: theme.spacing(20, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  button: {
    margin: theme.spacing(1),
    fontSize: '30px'
  },
  input: {
    display: 'none',
  },
}));

export default function NotFound404()  {
  const classes = useStyles();


  return (
  	<Grid container component="main" className={classes.root}>
  		<Grid item xs={10} sm={4} md={6} className={classes.image} />
  		<Grid item xs={12} sm={8} md={6} elevation={6} square >
  			<div className={classes.paper}>
  				<Typography variant="h4" gutterBottom>
			       PAGINA NO ENCONTRADA
			     </Typography>
			     <Button variant="contained" href="/menu/decanato" color="primary" className={classes.button}>
			        <HomeRoundedIcon fontSize='large' />
              Volver
			     </Button>
  			</div>
  		</Grid>
  	</Grid>
  );
}
