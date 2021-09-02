import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Homepage from './pages/homepage.js';
import SignIn from './pages/sign_in.js';
import Register from './pages/register.js';
import Dashboard from './pages/dashboard.js';

class Router extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/' exact component={Homepage}></Route>
                    <Route path='/signin' exact component={SignIn}></Route>
                    <Route path='/register' exact component={Register}></Route>
                    <Route path='/dashboard' exact component={Dashboard}></Route>
                </Switch>
            </BrowserRouter>
        )
    }
}


export default Router;