import React from "react";
import ReactDom from "react-dom";
import App from "./components/App";
import "./styles/main.scss"

// const template = React.createElement('h1', null, "hello world");
// const template = <h1>helo world</h1>;

ReactDom.render(<App />, document.getElementById('root'))