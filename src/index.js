import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter, Switch, Route 
} from 'react-router-dom';
import App from './App';
import Login from './Login';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render((
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Login}/>
      <Route path='/' component={App}/>
    </Switch>
  </BrowserRouter>
), document.getElementById('root'))


registerServiceWorker();
