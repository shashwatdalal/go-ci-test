import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'
import registerServiceWorker from './registerServiceWorker';
import Demo from './demo';


ReactDOM.render(<Demo />, document.getElementById('root'));
ReactDOM.render(<Demo />, document.getElementById('card2'));
ReactDOM.render(<App />, document.getElementById('app'));

registerServiceWorker();
