import React, { useState, useEffect } from "react";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@material-ui/core";

import { getTransactions } from "../../helpers/auth";

function createData(name, btn) {
  return { name, btn };
}

const rows = [
  createData("Justine Perrier", 4.0),
  createData("Justine Perrier", 4.0),
];

export default function BasicTable() {
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

  const othersUsers = userTransactions.filter(({ user_from, user_to }) => {
    return user_from.id !== 21 || user_to.id !== 21;
  });

  console.log(othersUsers);
  return (
    <TableContainer>
      <Table aria-label="contacts table">
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.btn}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
