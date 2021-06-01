import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import Header from "./components/Layout/Header";
import NavBar from "./components/Layout/NavBar";
import theme from "./helpers/theme";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Transactions from "./pages/Transactions";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
}));

function App() {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleToggleDrawer = () => {
    open ? setOpen(false) : setOpen(true);
  };

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route path="/login" exact component={Login} />
          <div className={classes.root}>
            <CssBaseline />
            <Header handleToggleDrawer={handleToggleDrawer} />
            <NavBar open={open} />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/transactions" component={Transactions} />
            </Switch>
          </div>
        </Switch>
      </ThemeProvider>
    </Router>
  );
}

export default App;
