import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter, Switch, Route
} from 'react-router-dom';
import App from './App';
import LoginForm from './Login/LoginForm';
import NewUserForm from './Login/NewUserForm';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import store from "./store";


ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={LoginForm}/>
                <Route exact path='/newUser' component={NewUserForm}/>
                <Route path='/' component={App}/>
            </Switch>
        </BrowserRouter>
    </Provider>
), document.getElementById('root'))


registerServiceWorker();
