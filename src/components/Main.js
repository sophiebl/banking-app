import React from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

import ContactsTable from "./ContactsTable";
import OperationsTimeline from "./OperationsTimeline";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  titleContainer: {
    color: theme.palette.primary.dark,
    marginBottom: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  mainBackground: {
    backgroundColor: `${theme.palette.primary.main}10`,
    borderRadius: 20,
  },
}));

export default function Main() {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <div className={classes.titleContainer}>
        <Typography variant="h3"> OVERVIEW </Typography>
        <Typography variant="h4">Hi Simon, welcome back!</Typography>
      </div>
      <Grid container spacing={3} className={classes.mainBackground}>
        <Grid item sm={6} spacing={1}>
          <Paper elevation={3}>
            <Box p={2}>
              <Typography variant="h5"> Votre solde est de: </Typography>
              <Typography variant="h1" color="primary">
                {" "}
                1000 €{" "}
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item sm={6} spacing={3}>
          <Paper elevation={3}>
            <Box p={2}>
              <Typography variant="h5"> Quick transfer: </Typography>
              <ContactsTable />
            </Box>
          </Paper>
        </Grid>

        <Grid item sm={9} spacing={1}>
          <Paper elevation={3}>
            <Box p={2}>
              <Typography variant="h5"> Your last transactions </Typography>
              <OperationsTimeline />
            </Box>
          </Paper>
        </Grid>
        <Grid container item sm={3} spacing={3}>
          <Grid item sm={12} spacing={1}>
            <Paper elevation={3}>
              <Box p={2}>
                <Typography variant="h5"> Your cards </Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item sm={12} spacing={1}>
            <Paper elevation={3}>
              <Box p={2}>
                <Typography variant="h5"> Download your RIB </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </main>
  );
}
