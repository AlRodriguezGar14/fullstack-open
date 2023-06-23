import { useState, useEffect } from "react";

const Message = ({ message, setMessage }) => {
  const [visible, setVisible] = useState(false);
  const blockStyle = {
    color: "green",
    fontStyle: "italic",
    fontSize: 16,
    border: "2px solid green",
    margin: 6,
    padding: 6,
    borderRadius: 10,
    backgroundColor: "AliceBlue",
  };
  if (message.action === "error") {
    blockStyle.color = "red";
    blockStyle.border = "2px solid red";
  }
  useEffect(() => {
    if (message.text != null) {
      setVisible(true);
      setTimeout(() => {
        console.log("timeout");
        setVisible(false);
        setMessage({ action: null, text: null });
      }, 4000);
    }
  }, [message]);

  if (visible) {
    return (
      <div>
        <p style={blockStyle}>
          {message.action} {message.text}
        </p>
      </div>
    );
  } else {
    return;
  }
};

export default Message;
