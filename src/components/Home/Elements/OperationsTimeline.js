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
import HotelIcon from "@material-ui/icons/Hotel";
import { Typography, Paper } from "@material-ui/core";

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
        <TimelineItem>
          <TimelineOppositeContent>
            <Typography variant="body2" color="textSecondary">
              {created_at}
            </Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="primary" variant="outlined">
              <HotelIcon />
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
    .slice(0, 4);

  return <Timeline align="alternate">{transactionsPreview}</Timeline>;
}
