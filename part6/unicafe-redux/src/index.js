import React from "react";
import ReactDOM from "react-dom/client";

import counterReducer from "./reducer";

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({ reducer: counterReducer });

const App = () => {
  // const good = () => {
  //   store.dispatch({
  //     type: "GOOD",
  //   });
  // };

  // Here I can have only the type and the payload to simplify the component
  const plusGood = () => {
    return { type: "GOOD" };
  };
  // Here I can write the whole logic
  const good = () => {
    store.dispatch(plusGood());
  };

  const bad = () => {
    store.dispatch({
      type: "BAD",
    });
  };
  const ok = () => {
    store.dispatch({
      type: "OK",
    });
  };
  const zero = () => {
    store.dispatch({
      type: "ZERO",
    });
  };

  return (
    <div>
      <button onClick={good}>good</button>
      <button onClick={ok}>ok</button>
      <button onClick={bad}>bad</button>
      <button onClick={zero}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

const renderApp = () => {
  root.render(<App />);
};

renderApp();
store.subscribe(renderApp);
