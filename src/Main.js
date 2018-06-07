import React from 'react';
import Chat from './Chat';
import Profile from './Profile';
import Leaderboards from './Leaderboards';
import Matchmaking from './Matchmaking';
import Teams from './Teams/Teams';
import {Switch, Route} from 'react-router-dom'

const Main = () => (
    <Switch>
        <Route exact path='/' component={Profile}/>
        <Route path='/chat' component={Chat}/>
        <Route path='/profile' component={Profile}/>
        <Route path='/leaderboards' component={Leaderboards}/>
        <Route path='/matchmaking' component={Matchmaking}/>
        <Route path='/Teams' component={Teams}/>
    </Switch>
)

export default Main;
