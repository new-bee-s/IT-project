import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Homepage from './pages/homepage.js';
import LogIn from './pages/login.js';
import Dashboard from './pages/dashboard.js';
import ChangeInfo from './pages/changeinfo.js';

// router switch 
class Router extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/' exact component={Homepage}></Route>
                    <Route path='/login' exact component={LogIn}></Route>
                    <Route path='/dashboard' exact component={Dashboard}></Route>
                    <Route path='/dashboard/changeinfo' exact component={ChangeInfo}></Route>
                </Switch>
            </BrowserRouter>
        )
    }
}


export default Router;