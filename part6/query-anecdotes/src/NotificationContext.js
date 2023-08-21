import { createContext, useContext, useReducer } from "react";

const notifReducer = (state, action) => {
  switch (action.type) {
    case "POST":
      return action.payload;
    case "UPVOTE":
      console.log(action.payload);
      return action.payload;
    case "CLEAN":
      return null;
    default:
      return state;
  }
};

const NotifContext = createContext();

export const NotifContextProvider = (props) => {
  const [notif, notifDispatch] = useReducer(notifReducer, null);

  return (
    <NotifContext.Provider value={[notif, notifDispatch]}>
      {props.children}
    </NotifContext.Provider>
  );
};

export const useNotifContent = () => {
  const notifAndDispatch = useContext(NotifContext);
  return notifAndDispatch[0];
};

export const useNotifDispatch = () => {
  const counterAndDispatch = useContext(NotifContext);
  return counterAndDispatch[1];
};

export default NotifContext;
