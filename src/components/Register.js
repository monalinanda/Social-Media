import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Input, Button } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Firebase from "../firebase";
import InputLabel from "@material-ui/core/InputLabel";
import { Link, withRouter } from "react-router-dom";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     "& > *": {
//       margin: theme.spacing(1),
//     },
//   },
// }));

const Register = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="login-warpper">
      <form className="login-form" onSubmit={(e) => e.preventDefault()}>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="name">Name</InputLabel>
          <Input
            id="name"
            value={name}
            type="text"
            autoComplete="off"
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
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
        <div className="signup-button">
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            onClick={onRegister}
          >
            Register
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            component={Link}
            to="/login"
            className="margin-top-10"
          >
            Back To Login
          </Button>
        </div>
      </form>
    </div>
  );

  async function onRegister() {
    try {
      await Firebase.register(name, email, password);
      //await firebase.addQuote(quote);
      props.history.replace("/chatting");
    } catch (error) {
      alert(error.message);
    }
  }
};
export default withRouter(Register);
