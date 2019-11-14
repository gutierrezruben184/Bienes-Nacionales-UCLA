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
    color: '#564BC0',
    flexGrow: 1
  },
}));

export default function CantTotalEquipos() {
  const classes = useStyles();
  const [estadistica, setEstadistica] = useState([]);


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
        >
          <Typography className={classes.heading}  >
          {`${data.nombreDecanato}`}
          </Typography>
          <Typography variant="button" display="block" gutterBottom  >
          {` TOTAL:${data.total} | BUENOS:${data.buenos} | MALOS:${data.malos} | En REPARACION:${data.enReparacion}`}
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