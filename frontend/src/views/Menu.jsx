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
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { NavLink } from "react-router-dom";
import AppRouter from "../AppRouter";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MenuItem from "@material-ui/core/MenuItem";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import LaptopWindowsIcon from "@material-ui/icons/LaptopWindows";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import RedesSociales from "../components/RedesSociales";

const drawerWidth = 240;

const list = [
  {
    name: "Decanato",
    route: "/menu/decanato",
    key: 1,
    icon: <HomeWorkIcon />
  },
  {
    name: "Departamentos",
    route: "/menu/departamento",
    key: 2,
    icon: <HomeWorkIcon />
  },
  {
    name: "Equipos",
    route: "/menu/equipos",
    key: 3,
    icon: <LaptopWindowsIcon />
  },
  {
    name: "Marcas",
    route: "/menu/marca",
    key: 4,
    icon: <PeopleAltIcon />
  },
  {
    name: "Empleados",
    route: "/menu/empleados",
    key: 5,
    icon: <PeopleAltIcon />
  }
];

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
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  hide: {
    display: "none",
    color: "#788195"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  toolbar: {
    boxShadow: 0,
    backgroundColor: "#102C4D",
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarC: {
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
    textAlign: "center",
    marginTop: "20px"
  },

  mainTitleH2: {
    textTransform: "uppercase",
    color: "#fff",
    fontSize: "2em",
    fontWeight: "bold",
    display: "inline-block",
    verticalAlign: "middle",
    lineHeight: "normal"
  },
  botones: {
    color: "#788195",
    fontWeight: "bold"
  },
  gris: {
    color: "#788195"
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    backgroundColor: "#2d3446",
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    backgroundColor: "#2d3446",
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    }
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  }
}));

export default function MiniDrawer() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  //header
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const menuId = "primary-search-account-menu";
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Perfil</MenuItem>
      <MenuItem onClick={logout}>Cerrar sesión</MenuItem>
    </Menu>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon className={classes.gris} />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          ></Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon className={classes.gris} />
            </Badge>
          </IconButton>
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="#788195"
          >
            <AccountCircle className={classes.gris} />
          </IconButton>
        </Toolbar>
      </AppBar>
      {renderMenu}

      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <Typography className={classes.mainTitleH2} variant="h2" gutterBottom>
            B.N. UCLA
          </Typography>
          <IconButton onClick={handleDrawerClose} className={classes.gris}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {list.map((item, index) => (
            <NavLink to={item.route} key={index}>
              <ListItem button key={item.name}>
                <ListItemIcon className={(classes.botones, classes.gris)}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} className={classes.gris} />
              </ListItem>
            </NavLink>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbarC} />
        <AppRouter />
        <RedesSociales />
      </main>
    </div>
  );
}
