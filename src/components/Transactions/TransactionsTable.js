import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import { getUser } from "../../helpers/auth";
import Header from "../Layout/Header";
import SideMenu from "../Layout/NavBar";
import Main from "../Layout/Main";

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

export default function TransactionsTable() {
  const [userData] = useState(getUser());
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleToggleDrawer = () => {
    open ? setOpen(false) : setOpen(true);
  };

  useEffect(() => {
    if (!userData) {
      window.location = "/login";
    }
  });

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header handleToggleDrawer={handleToggleDrawer} />
      <SideMenu open={open} />
      <Main userData={userData} />
    </div>
  );
}
