import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import image from '../assets/img/ucla.jpg';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    image: {
        backgroundImage: `url(${image})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center"
      },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    card: {
        maxWidth: 300,
      },
      media: {
        height: 140,
      }
  }));

export default function MediaCard() {
  const classes = useStyles();

  return (
<section>
<div>
<Grid container spacing={3}  direction="row" >

<Grid item xs={8}>
    <Paper spacing={2}>
    <img src={image} height = "500"/>
    </Paper>
</Grid> 

<Grid item xs={3} justify="center">
    <Paper spacing={2}>
    <div class="fb-page" 
        data-href="https://www.facebook.com/UCLAve" 
        data-tabs="timeline" 
        data-width="" 
        data-height="" 
        data-small-header="false" 
        data-adapt-container-width="true" 
        data-hide-cover="false" 
        data-show-facepile="false">
            <blockquote cite="https://www.facebook.com/UCLAve" 
            class="fb-xfbml-parse-ignore">
                <a href="https://www.facebook.com/UCLAve">Universidad Centroccidental &quot;Lisandro Alvarado&quot; - UCLA</a></blockquote>
        </div>
    </Paper>
</Grid>
</Grid> 
</div>
</section>

  );
}