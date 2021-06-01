import React, { useState, useEffect } from "react";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@material-ui/core";

import { getTransactions } from "../helpers/auth";
import { getUser } from "../helpers/auth";

export default function Transactions() {
  const [userData] = useState(getUser());
  if (!userData) {
    window.location = "/login";
  }

  const [userTransactions, setUserTransactions] = useState([]);

  useEffect(() => {
    async function getAllTransactions() {
      try {
        const trans = await getTransactions();
        console.log(trans);
        setUserTransactions(trans);
      } catch (err) {}
    }
    getAllTransactions();
  }, []);

  return (
    <TableContainer>
      <Table aria-label="contacts table">
        <TableBody>
          {userTransactions.map(({ id, amount, created_at, description }) => (
            <TableRow key={id}>
              <TableCell component="th" scope="row">
                <Typography variant="body2">{created_at}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">{description}</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body2">{amount}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
