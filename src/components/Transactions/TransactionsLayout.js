import React, { useState, useEffect } from "react";
import Avatar from "boring-avatars";

import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Grid,
  Button,
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { getTransactions } from "../../helpers/auth";
import CreateTransactionForm from "./CreateTransactionForm";

const useStyles = makeStyles((theme) => ({
  mainBackground: {
    backgroundColor: `${theme.palette.primary.main}10`,
    borderRadius: 20,
  },
}));

export default function TransactionsLayout({ userData }) {
  if (!userData) {
    window.location = "/login";
  }

  const [userTransactions, setUserTransactions] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const classes = useStyles();

  useEffect(() => {
    async function getAllTransactions() {
      try {
        const trans = await getTransactions();
        setUserTransactions(trans);
      } catch (err) {}
    }
    getAllTransactions();
  }, []);

  const othersUser = userTransactions.map(({ user_from, user_to }) => {
    return user_from.id === userData.id ? user_to : user_from;
  });

  let uniqueUserId = [];
  const uniqueOthersUser = othersUser.filter((user) => {
    if (
      !uniqueUserId.includes(user.id) &&
      Object.keys(user).length !== 0 &&
      user.id !== userData.id
    ) {
      uniqueUserId.push(user.id);
      return true;
    }
    return false;
  });

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box mb={2} display="flex" justifyContent="space-around">
          <Button variant="outlined" color="primary">
            <Typography variant="caption">Ask Money</Typography>
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClickOpenDialog}
          >
            <Typography variant="caption">Send Money</Typography>
          </Button>
        </Box>
        <CreateTransactionForm
          openDialog={openDialog}
          uniqueOthersUser={uniqueOthersUser}
          userData={userData}
          handleCloseDialog={handleCloseDialog}
        />
      </Grid>
      <Grid item container justify="center" className={classes.mainBackground}>
        <Grid item xs={12}>
          <TableContainer>
            <Table aria-label="contacts table">
              <TableBody>
                {userTransactions.map(
                  ({ amount, description, user_from, user_to }, idx) => (
                    <TableRow key={idx}>
                      <TableCell component="th" scope="row">
                        <Avatar
                          size={40}
                          name="Maria Mitchell"
                          variant="marble"
                          colors={[
                            "#92A1C6",
                            "#146A7C",
                            "#F0AB3D",
                            "#C271B4",
                            "#C20D90",
                          ]}
                        />
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Typography variant="body2">
                          {user_from.id === userData.id
                            ? user_to.username
                            : user_from.username}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{description}</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          variant="h5"
                          color={
                            user_from.id === userData.id ? "error" : "secondary"
                          }
                        >
                          {user_from.id === userData.id ? "-" : "+"}
                          {amount}€
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Grid>
  );
}
