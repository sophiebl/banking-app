import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  Button,
  Container,
  Typography,
  TextField,
  Link,
  Box,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { createTransaction } from "../../helpers/auth";

toast.configure();

const useStyles = makeStyles((theme) => ({
  formControl: {
    // margin: theme.spacing(1),
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function FormDialog({
  openDialog,
  uniqueOthersUser,
  userData,
  handleCloseDialog,
}) {
  const classes = useStyles();
  const [inputs, setInputs] = useState({
    user_from: userData.id,
    user_to: null,
    description: "",
    amount: "",
    username: "",
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
    <div>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" mt={10}>
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
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                SEND MONEY
              </Button>
            </form>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </div>
  );
}
