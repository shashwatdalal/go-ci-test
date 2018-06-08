import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter, Switch, Route
} from 'react-router-dom';
import App from './App';
import Login from './Login';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import store from "./store";


ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Login}/>
                <Route path='/' component={App}/>
            </Switch>
        </BrowserRouter>
    </Provider>
), document.getElementById('root'))


registerServiceWorker();
