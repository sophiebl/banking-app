import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  IconButton,
  Typography,
  Toolbar,
  AppBar,
  Box,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    boxShadow: "none",
    borderBottom: `solid 1px ${theme.palette.divider}`,
    borderRadius: 0,
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
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleToggleDrawer}
          edge="start"
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Box display="flex" alignItems="center" justifyContent="center">
          <img src="/logo.svg" alt="" width="40" />
          <Typography variant="h2" noWrap>
            Just Send
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
