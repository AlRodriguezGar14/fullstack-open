import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: null,
  display: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    printNotification(state, action) {
      if (action.payload.display) {
        const message =
          action.payload.action + JSON.stringify(action.payload.content);
        console.log(message);
        return { message: message, display: true };
      } else {
        return { message: "empty", display: false };
      }
    },
  },
});

export const { printNotification } = notificationSlice.actions;

export const displayNotification = (notification, time) => {
  return (dispatch) => {
    dispatch(printNotification(notification));
    setTimeout(() => {
      dispatch(printNotification({ display: false }));
    }, time * 1000);
  };
};

export default notificationSlice.reducer;
