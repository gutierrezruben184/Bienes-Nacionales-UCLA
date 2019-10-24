import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { Switch, Route, NavLink } from "react-router-dom"
import Header from "../Header/Header";
import DecanatoList from "../DecanatoList/DecanatoList";
import Departamento from "../Departamento/Departamento";

import "./style.css";

const drawerWidth = 240;

const list = [
  {
    name : "Decanatos",
    route : "/decanatos"
  },
  {
    name : "Departamentos",
    route : "/departamentos"
  },
  {
    name : "Equipos", 
    route : "/equipos"
  },
  {
    name : "Marcas", 
    route : "/marcas"
  },
  {
    name : "Empleados",
    route : "/empleados"
  } 
]

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36,
    color: '#788195'
  },
  hide: {
    display: "none",
    color: '#788195'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    backgroundColor: '#2d3446',
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    backgroundColor: '#2d3446',
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },

  mainTitle: {
    textAlign: 'center',
	  marginTop: '20px',
  },

  mainTitleH2: {
    textTransform: 'uppercase',
    color: '#fff',
    fontSize: '2em',
    fontWeight: 'bold',
    display: 'inline-block',
    verticalAlign: 'middle',
    lineHeight: 'normal'
  },
  toolbarRoot:{
    backgroundColor: '#fff'
  },
  iconButton:{
    color: '#fff',
  },
  botones: {
    color: '#788195'
  },
  gris: {
    color: '#788195'
  }
}));

export default function MiniDrawer() {

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar classes={{
          root: classes.toolbarRoot
        }}>
          <IconButton className={classes.iconButton}
            color="#788195"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            
          >
            <MenuIcon />
          </IconButton>

          <Header />
        </Toolbar>
      </AppBar>
      
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })}
          classes={{
            paper:  clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open, 
            })
          }}
          open={open}
        >
          <div className={classes.toolbar}>
            <div className={classes.mainTitle}>
              <Typography className={classes.mainTitleH2} variant="h2" gutterBottom>
                B.N. UCLA
              </Typography>
            </div>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            {list.map(
              (item, index) => (
                
                  <NavLink 
                    to={item.route}
                    activeStyle={{
                      textDecoration: "none"
                    }}
                  >
                    <ListItem button key={item.name} >
                      <ListItemIcon className={classes.botones}>
                        {index % 2 === 0 ? <InboxIcon className={classes.botones} /> : <MailIcon className={classes.botones}/>}
                      </ListItemIcon>
                      <ListItemText primary={item.name} />
                    </ListItem>
                  </NavLink>
                  
              )
            )}
          </List>
          <Divider />
          <List>
            {["Reporte de Solicitud"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon className={classes.botones}>
                  {index % 2 === 0 ? <InboxIcon className={classes.botones}/> : <MailIcon className={classes.botones} />}
                </ListItemIcon>
                <ListItemText primary={text} className={classes.gris}/>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          
            <Switch> 
              <Route exact path="/decanatos" component={DecanatoList}  />
              <Route  path="/departamentos" component={Departamento}  />
            </Switch>
  
        </main>
      
    </div>
  );
}
