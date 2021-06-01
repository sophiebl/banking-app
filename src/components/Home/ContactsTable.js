import React, { useState, useEffect } from "react";
import Avatar from "boring-avatars";

import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Button,
} from "@material-ui/core";

import { getTransactions } from "../../helpers/auth";
import CreateTransactionForm from "../Transactions/CreateTransactionForm";

export default function ContactsTable({ userData }) {
  const [userTransactions, setUserTransactions] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

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

  const uniqueOthersUserPreview = uniqueOthersUser.slice(0, 3);

  return (
    <TableContainer>
      <Table aria-label="contacts table">
        <TableBody>
          {uniqueOthersUserPreview.map(({ id, username }) => (
            <TableRow key={id}>
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
                {username}
              </TableCell>
              <TableCell align="right">
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleClickOpenDialog}
                >
                  <Typography variant="caption" color="#FFF">
                    Send Money
                  </Typography>
                </Button>
                <CreateTransactionForm
                  openDialog={openDialog}
                  uniqueOthersUser={uniqueOthersUser}
                  userData={userData}
                  handleCloseDialog={handleCloseDialog}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
