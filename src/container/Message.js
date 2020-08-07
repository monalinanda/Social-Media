import React, { forwardRef } from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const Message = forwardRef(({ userName, message }, ref) => {
  const isUser = userName === message.userName;
  return (
    <div ref={ref} className={`message ${isUser && "messageUser"}`}>
      <Card
        className={`message ${isUser ? "messageUserCard" : "messageGuestCard"}`}
      >
        <CardContent>
          <Typography color="white" variant="h5" component="h2">
            {!isUser && `${message.userName}:`}
            {message.message}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
});

export default Message;
