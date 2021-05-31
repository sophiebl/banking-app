import React from "react";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@material-ui/core";

function createData(name, btn) {
  return { name, btn };
}

const rows = [
  createData("Justine Perrier", 4.0),
  createData("Justine Perrier", 4.0),
];

export default function BasicTable() {
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
