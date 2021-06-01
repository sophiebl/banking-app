import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import HomeLayout from "../Home/HomeLayout";
import TransactionsLayout from "../Transactions/TransactionsLayout";

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
}));

export default function Main({ userData, home, transactions }) {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container justify="center" spacing={3}>
        <Grid item sm={12}>
          <div className={classes.titleContainer}>
            {home ? (
              <>
                <Typography variant="h3">OVERVIEW</Typography>
                <Typography variant="h4">
                  Hi {userData.username}, welcome back!
                </Typography>
              </>
            ) : (
              <>
                <Typography variant="h3">TRANSACTIONS</Typography>
                <Typography variant="h4">All your transactions here</Typography>
              </>
            )}
          </div>
        </Grid>
        {home && <HomeLayout userData={userData} />}
        {transactions && <TransactionsLayout userData={userData} />}
      </Grid>
    </main>
  );
}

Main.propTypes = {
  userData: PropTypes.object.isRequired,
  home: PropTypes.bool,
  transactions: PropTypes.bool,
};
