import React from "react";
import "./App.css";
import Routes from "./routes";
import Nav from "./Components/Nav/Nav";
import { withRouter } from "react-router-dom";

function App(props) {
  console.log(props);
  return (
    <div className="App">
      <Nav />
      {Routes}
    </div>
  );
}

export default withRouter(App);
