import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  TextField,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { createTransaction, getTransactions } from "../../helpers/auth";

toast.configure();

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    borderRadius: "10px",
  },
}));

export default function CreateTransactionForm({ userData }) {
  const classes = useStyles();
  const [inputs, setInputs] = useState({
    user_from: userData.id,
    user_to: null,
    description: "",
    amount: "",
    username: "",
  });

  const [userTransactions, setUserTransactions] = useState([]);

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

  const handleCreateTransaction = async (event) => {
    const obj = {
      ...inputs,
      user_from: userData.id,
      image_resize_parameters: "", // This is compulsory but should be let empty
    };

    if (event) {
      event.preventDefault();
      try {
        await createTransaction(obj);
        toast("your transaction has been sent");
      } catch (err) {
        console.error(err);
        toast("An error occured");
      }
    }
  };

  const handleInputChange = (event) => {
    event.persist();
    const newInput = {
      ...inputs,
      [event.target.name]: event.target.value,
    };
    setInputs(newInput);
  };

  return (
    <Box display="flex" flexDirection="column" mt={2}>
      <form onSubmit={handleCreateTransaction}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="user_to">Choose a contacts</InputLabel>
          <Select
            labelId="user_to"
            id="user_to"
            name="user_to"
            onChange={handleInputChange}
            value={inputs.user_to ? inputs.user_to : ""}
          >
            {uniqueOthersUser.map(({ id, username }, index) => {
              return (
                <MenuItem value={id} key={index}>
                  {username}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          margin="normal"
          htmlFor="description"
          type="text"
          name="description"
          onChange={handleInputChange}
          value={inputs.description}
          id="description"
          variant="outlined"
          required
          autoFocus
          label="description"
          autoComplete="on"
        />
        <TextField
          fullWidth
          margin="normal"
          htmlFor="amount"
          type="amount"
          name="amount"
          onChange={handleInputChange}
          value={inputs.amount}
          variant="outlined"
          id="amount"
          required
          label="amount"
          autoComplete="on"
        />
        <Box mt={2}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className={classes.button}
          >
            SEND MONEY
          </Button>
        </Box>
      </form>
      <ToastContainer />
    </Box>
  );
}

CreateTransactionForm.propTypes = {
  uniqueOthersUser: PropTypes.object.isRequired,
  userData: PropTypes.object.isRequired,
};
