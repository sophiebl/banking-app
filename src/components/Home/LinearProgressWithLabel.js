import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Typography, Box, LinearProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  expensesColor: {
    backgroundColor: theme.palette.error.main,
    "& > *": {
      backgroundColor: theme.palette.error.dark,
    },
  },
}));

export default function LinearProgressWithLabel(props) {
  const classes = useStyles();
  return (
    <Box display="flex" alignItems="center" justifyContent="left">
      <Box width="80%" mr={1}>
        <LinearProgress
          variant="determinate"
          className={clsx({
            [classes.expensesColor]: props.expenses,
          })}
          {...props}
        />
      </Box>
      <Box minWidth={35}>
        <Typography
          variant="h5"
          color={props.incomes ? "secondary" : "error"}
        >{`${props.incomes ? "+" : "-"} ${props.label}€`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};
