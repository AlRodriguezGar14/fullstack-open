import { useContext } from "react";
import NotifContext from "../NotificationContext";
import { useNotifContent } from "../NotificationContext";

const Notification = () => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  const notification = useNotifContent();
  if (notification == null) return null;

  return <div style={style}>{notification}</div>;
};

export default Notification;
