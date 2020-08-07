import React, { useState, useEffect } from "react";
import Firebase from "../firebase";
import { Button } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Message from "../container/Message";
import firebase from "firebase";
import FlipMove from "react-flip-move";

export default function (props) {
  if (!Firebase.getCurrentUserName()) {
    alert("plase login");
    return null;
  }
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [userName, setUserName] = useState("");
  console.log(input);
  console.log(messages, "print");

  useEffect(() => {
    Firebase.getData()
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        console.log(snapshot, "snap");
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);

  useEffect(() => {
    const name = Firebase.getCurrentUserName();
    console.log(Firebase.getCurrentUserName());
    setUserName(name);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    Firebase.getData().add({
      message: input,
      userName: userName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };
  return (
    <div className="chattingWrapper">
      <h2>{userName}</h2>
      <form onSubmit={handleSubmit} className="messageInput">
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="input">Type message</InputLabel>
          <Input
            value={input}
            variant="outlined"
            onChange={(e) => setInput(e.target.value)}
          />
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          endIcon={<Icon>send</Icon>}
          disabled={!input}
          type="submit"
        >
          Send
        </Button>
      </form>
      <FlipMove>
        {messages.map(({ id, message }) => (
          <Message key={id} userName={userName} message={message} />
        ))}
      </FlipMove>
    </div>
  );
}
