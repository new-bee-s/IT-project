import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Homepage from './pages/homepage.js';
import SignIn from'./pages/login.js';

class Router extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path = '/' exact component={Homepage}></Route>
                    <Route path = '/login' exact component={SignIn}></Route>
                </Switch>
            </BrowserRouter>
        )
    }
}


export default Router;