import React from 'react';
import ReactDOM from 'react-dom';
import {
  StaticRouter
} from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render((
  <StaticRouter>
    <App />
  </StaticRouter>
), document.getElementById('root'))


registerServiceWorker();
