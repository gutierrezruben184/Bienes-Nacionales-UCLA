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

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    card: {
        maxWidth: 345,
      },
      media: {
        height: 140,
      }
  }));

export default function MediaCard() {
  const classes = useStyles();

  return (
<div className={classes.root}>

    <Grid container spacing={3}>
            <Grid item xs>
            <Paper className={classes.paper}>
                    <CardActionArea >
                        <CardMedia className={classes.media} component="img" height="140" image="/img/instagram.jpg" title="@uclave"/>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                ¡Siguenos en Instagram!
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                            Instagram es una red social y aplicación para postear fotos, noticias, videos y historias, siguenos como @uclave
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                        <CardActions>
                            <Button size="small" align="right" color="primary" href="https://www.instagram.com/uclave/">
                            Ir a Instagram
                            </Button>
                        </CardActions>
                    </Paper>
            </Grid>

            <Grid item xs>
            <Paper className={classes.paper}>
                    <CardActionArea>
                        <CardMedia className={classes.media} component="img" height="100" image="/img/facebook.jpg" title="@uclave"/>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                ¡Regalanos un like en Facebook!
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                            Mantente al día con la información actual de la Universidad
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" align="right" color="primary" href="https://www.facebook.com/UCLAve/">
                        Ir a Facebook 
                        </Button>
                    </CardActions>
                </Paper>
            </Grid>

            <Grid item xs>
            <Paper className={classes.paper}>
                <CardActionArea>
                    <CardMedia className={classes.media} component="img" image="/img/twitter.jpg" title="@uclave"/>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            ¡Siguenos en Twitter!
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                        Mantente informado de todas nuestras publicaciones
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" align="right" color="primary" href="https://twitter.com/UCLAve">
                    Ir a Twitter
                    </Button>
                </CardActions>
                </Paper>
            </Grid>
    </Grid>
</div>
    
  );
}