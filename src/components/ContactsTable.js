import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import { TableFooter } from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    // minWidth: 650,
  },
});

function createData(name, protein) {
  return { name, protein };
}

const rows = [
  createData("Justine Perrier", 4.0),
  createData("Justine Perrier", 4.0),
];

export default function BasicTable() {
  const classes = useStyles();
  const preventDefault = (event) => event.preventDefault();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
          <TableFooter>
            <TableCell>
              <Link href="#" onClick={preventDefault} variant="body2">
                Ajouter un nouveau bénéficiaire
              </Link>
            </TableCell>
            <TableCell>
              <Link href="#" onClick={preventDefault} variant="body2">
                Voir tous vos contacts
              </Link>
            </TableCell>
          </TableFooter>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
