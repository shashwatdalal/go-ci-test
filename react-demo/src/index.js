import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Menu from './Menu';
import FixtureList from './FixtureList';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<FixtureList />, document.getElementById('fixtures'));
ReactDOM.render(<Menu />, document.getElementById('menu'));
registerServiceWorker();
