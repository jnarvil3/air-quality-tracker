import React from "react";
import { render } from "react-dom";
import { HashRouter } from "react-router-dom";
import App from './App.jsx';

// React router set up 

render(
  <HashRouter >
    <App />
  </HashRouter>,
  document.getElementById('root'),
);