import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Input, Button } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Firebase from "../../firebase";
import InputLabel from "@material-ui/core/InputLabel";
import { Link, withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const Login = (props) => {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="login-warpper">
      <form
        className="login-form"
        onSubmit={(e) => e.preventDefault() && false}
      >
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input
            id="email"
            name="email"
            value={email}
            type="email"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="password">password</InputLabel>
          <Input
            id="password"
            value={password}
            type="password"
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <div className="login-button">
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            onClick={onLogin}
          >
            Login
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            component={Link}
            to="/signup"
            className="margin-top-10"
          >
            Resister
          </Button>
        </div>
      </form>
    </div>
  );

  async function onLogin() {
    try {
      await Firebase.login(email, password);
      props.history.replace("/chatting");
    } catch (error) {
      alert(error.message);
    }
  }
};
export default withRouter(Login);
