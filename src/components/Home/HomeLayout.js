import React, { useState, useEffect } from "react";
import { Box, Link, Grid, Paper, Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import ContactsTable from "./ContactsTable";
import OperationsTimeline from "./OperationsTimeline";
import LinearProgressWithLabel from "./LinearProgressWithLabel";

import { getUser, getTransactions } from "../../helpers/auth";

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
  linkContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

export default function HomeLayout() {
  const [userData] = useState(getUser());

  if (!userData) {
    window.location = "/login";
  }

  const [userTransactions, setUserTransactions] = useState([]);

  useEffect(() => {
    async function getAllTransactions() {
      try {
        const trans = await getTransactions();
        setUserTransactions(trans);
      } catch (err) {}
    }
    getAllTransactions();
  }, []);

  const classes = useStyles();
  const preventDefault = (event) => event.preventDefault();

  const { username, transactions_emitted, transactions_received } = userData;

  const users = userTransactions.map((t) => {
    return t.user_to;
  });

  return (
    <Grid
      container
      justify="center"
      spacing={2}
      className={classes.mainBackground}
    >
      <Grid item sm={6} xs={12} spacing={1}>
        <Box p={2}>
          <Typography variant="h1" align="center" color="primary">
            1000 €
          </Typography>
          <Box
            p={2}
            width="80%"
            margin="0 auto"
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <LinearProgressWithLabel
              value={60}
              color="secondary"
              label={1300}
              incomes
            />
            <LinearProgressWithLabel value={30} label={300} expenses />
            <Box
              color="primary"
              style={{ height: 8, width: "25%", borderRadius: 2 }}
            ></Box>
          </Box>
        </Box>
      </Grid>
      <Grid item sm={6} xs={12} spacing={1}>
        <Paper elevation={3}>
          <Box p={2}>
            <Typography variant="h5"> Quick transfer </Typography>
            <ContactsTable userData={userData} />
            <Box className={classes.linkContainer} p={2}>
              <Link onClick={preventDefault} color="primary">
                Add new contact
              </Link>
              <Link to="/transactions" onClick={preventDefault} color="primary">
                See more contacts
              </Link>
            </Box>
          </Box>
        </Paper>
      </Grid>

      <Grid item sm={9} xs={12} spacing={1}>
        <Paper elevation={3}>
          <Box p={2}>
            <Typography variant="h5"> Your last transactions </Typography>
            <OperationsTimeline transactions={transactions_emitted} />
          </Box>
        </Paper>
      </Grid>
      <Grid container item sm={3} xs={12} spacing={1}>
        <Grid item sm={12} xs={12}>
          <Paper elevation={3} borderRadius={16}>
            <Box p={2} borderRadius={16}>
              <Typography variant="h5"> Your credit card </Typography>
            </Box>
            <Box
              display="flex"
              py={2}
              flexDirection="column"
              justifyContent="center"
            >
              <Box width="100%" textAlign="center">
                <img src="/CB-blue.png" alt="your credit card" />
              </Box>
              <Box>
                <ul>
                  <li>Ceiling: 300€</li>
                  <li>Overdraft authorized: 500€</li>
                </ul>
              </Box>
              <Box width="90%" textAlign="right">
                <Link onClick={preventDefault} color="primary">
                  more
                </Link>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item sm={12} xs={12}>
          <Paper elevation={3}>
            <Box p={2} bgcolor="#00CEA7" borderRadius={16} textAlign="center">
              <Typography variant="h6">
                <Link onClick={preventDefault} color="#FFFFFF">
                  Download your RIB
                </Link>
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
}
