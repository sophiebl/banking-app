import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "#FFF",
    boxShadow: "none",
  },
  menuButton: {
    marginRight: 36,
  },
}));

export default function Header({ handleToggleDrawer }) {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <svg
          width="36"
          height="33"
          viewBox="0 0 36 33"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="17.6423" cy="22.3003" r="10.0195" fill="#4558DD" />
          <circle cx="25.2646" cy="10.0195" r="10.0195" fill="#CE00B9" />
          <circle cx="10.0195" cy="10.0195" r="10.0195" fill="#00CEA7" />
        </svg>
        <Typography variant="h2" noWrap>
          Just Bank
        </Typography>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleToggleDrawer}
          edge="start"
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
