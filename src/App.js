import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Main from './Main';
import './Stylesheets/App.css';

// this component will be rendered by our <___Router>
const App = () => (
  <div class="wrapper">
    <div class="header"><Header /></div>
    <div class="main"><Main /></div>
  </div>
)

export default App;
