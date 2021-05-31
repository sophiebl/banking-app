import { useState, useEffect } from "react";
import {
  Button,
  Container,
  Typography,
  TextField,
  Link,
  Box,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { login, getUser } from "../../helpers/auth";

const useLoginForm = () => {
  const [inputs, setInputs] = useState({
    identifier: "",
    password: "",
  });
  const { identifier, password } = inputs;

  console.log(inputs);

  const handleSubmit = async (event) => {
    if (event) {
      event.preventDefault();
      try {
        await login(identifier, password);
        window.location = "/";
      } catch (err) {
        console.log(err);
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
  return {
    handleSubmit,
    handleInputChange,
    inputs,
  };
};

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = ({ location }) => {
  useEffect(() => {
    const user = getUser();
    console.log(user);
    if (user) {
      window.location = "/";
    }
  });
  console.log(location);
  const login = (success) => {
    if (success) {
      window.location = "/?message=login_success";
    }
  };
  const { inputs, handleInputChange, handleSubmit } = useLoginForm(login);
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <Box display="flex" flexDirection="column" mt={16}>
        <Box display="flex" alignItems="center" justifyContent="center">
          <img src="/logo.svg" alt="" width="100" />
          <Typography variant="h1">Just Bank</Typography>
        </Box>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            htmlFor="identifier"
            type="text"
            name="identifier"
            onChange={handleInputChange}
            value={inputs.identifier}
            id="identifier"
            variant="outlined"
            required
            autoFocus
            label="identifier"
            autoComplete="on"
          />

          <TextField
            fullWidth
            margin="normal"
            htmlFor="password"
            type="password"
            name="password"
            onChange={handleInputChange}
            value={inputs.password}
            variant="outlined"
            id="password"
            required
            label="Password"
            autoComplete="on"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className={classes.submit}
          >
            Log In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default Login;