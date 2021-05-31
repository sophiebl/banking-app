import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  ListItemText,
  ListItemIcon,
  ListItem,
  Divider,
  List,
  Drawer,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import TransferIcon from "@material-ui/icons/SwapHoriz";
import CbIcon from "@material-ui/icons/Payment";
import PhoneIcon from "@material-ui/icons/Phone";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  verticalSpacer: {
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
}));

const menuItems = [
  {
    text: "Overview",
    icon: <HomeIcon />,
  },
  {
    text: "Transactions",
    icon: <AccountBalanceWalletIcon />,
  },
  {
    text: "Transfers",
    icon: <TransferIcon />,
  },
  {
    text: "Credit Cards",
    icon: <CbIcon />,
  },
  {
    text: "Support",
    icon: <PhoneIcon />,
  },
];

export default function SideMenu({ open }) {
  const classes = useStyles();
  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <div className={classes.verticalSpacer}></div>
      <Divider />
      <List>
        {menuItems.map(({ text, icon }, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
