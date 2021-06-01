import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TimelineDot,
  TimelineOppositeContent,
  TimelineContent,
  TimelineConnector,
  TimelineSeparator,
  TimelineItem,
  Timeline,
} from "@material-ui/lab";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import { Typography, Paper } from "@material-ui/core";

import { formatDate } from "../../helpers/DateFormater";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "6px 16px",
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function OperationsTimeline({ transactions }) {
  const classes = useStyles();

  const transactionsPreview = transactions
    .map(({ amount, created_at, description }, idx) => {
      return (
        <TimelineItem key={idx}>
          <TimelineOppositeContent>
            <Typography variant="body2" color="textSecondary">
              {formatDate(created_at)}
            </Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="primary" variant="outlined">
              <AccountBalanceIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} className={classes.paper}>
              <Typography variant="h3">{amount}€</Typography>
              <Typography variant="body2">{description}</Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
      );
    })
    .slice(0, 3);

  return <Timeline align="alternate">{transactionsPreview}</Timeline>;
}
