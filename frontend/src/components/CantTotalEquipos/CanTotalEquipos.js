import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import API from "../../utils/API";
import TablaUnidad from "./TablaUnidad"

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  expPane:{
    backgroundColor: '#3f51b5'
  }
}));

export default function CantTotalEquipos() {
  const classes = useStyles();
  const [estadistica, setEstadistica] = useState([
    {
      buenos:0,
      enReparacion:0,
      idDecanato:2,
      malos:0,
      nombreDecanato:"DECANATO DE CIENCIAS ECONOMICAS",
      td:[
        {
          buenos:3,
          enReparacion:2,
          idDepartamento:123,
          malos:0,
          nombreDepartamento:"z",
          total:5
       },
      ],
      total:0,
    },
    {
      buenos:6,
      enReparacion:1,
      idDecanato:12234,
      malos:1,
      nombreDecanato:"DECANATO DE CIENCIAS Y TECNOLOGIA",
      td:[
         {
            buenos:0,
            enReparacion:0,
            idDepartamento:123,
            malos:0,
            nombreDepartamento:"z",
            total:0
         },
         {
            buenos:0,
            enReparacion:0,
            idDepartamento:1,
            malos:0,
            nombreDepartamento:"hola",
            total:0
         },
         {
            buenos:0,
            enReparacion:0,
            idDepartamento:2,
            malos:0,
            nombreDepartamento:"x",
            total:0
         },
         {
            buenos:3,
            enReparacion:1,
            idDepartamento:3,
            malos:1,
            nombreDepartamento:"y",
            total:4
         },
         {
            buenos:0,
            enReparacion:0,
            idDepartamento:4,
            malos:0,
            nombreDepartamento:"hola",
            total:0
         },
         {
            buenos:0,
            enReparacion:0,
            idDepartamento:5,
            malos:0,
            nombreDepartamento:"hola",
            total:0
         },
         {
            buenos:3,
            enReparacion:0,
            idDepartamento:6,
            malos:0,
            nombreDepartamento:"webo",
            total:3
         }
      ],
      total:7
   },
  ]);


  async function getEstadisticas(){
    await API.get('/api.decanato/estadistica')
      .then(res => {
        console.log(res.data)
        setEstadistica(res.data)
      })
      .catch(e => {
        console.log("error" + e);
      })
  }

  useEffect(() => {
    getEstadisticas()
  }, []);

  return (
    <div className={classes.root}>
    {
      estadistica.map( (data,i) => (
        <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className={classes.expPane}
        >
          <Typography className={classes.heading} key={i} color='default' >
          {`${data.nombreDecanato} TOTAL:${data.total}  
              BUENOS:${data.buenos} MALOS:${data.buenos} En REPARACION:${data.enReparacion}`}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            <TablaUnidad rows={data.td} />
        </ExpansionPanelDetails>
      </ExpansionPanel>

        ) )
    }
      
    </div>
  );
}