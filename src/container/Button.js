import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function CustomButton(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button
        variant={props.variant}
        //color={props.color}
        componet={Link}
        to="/chatting"
      >
        {props.text}
      </Button>
    </div>
  );
}
