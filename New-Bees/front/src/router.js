import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Homepage from './pages/homepage.js';
import SignIn from './pages/sign_in.js';
import Register from './pages/register.js';
import Dashboard from './pages/dashboard.js';
import AddFriend from './pages/addfriend.js';
import EditInfo from './pages/editinfo.js';

// router switch 
class Router extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/' exact component={Homepage}></Route>
                    <Route path='/signin' exact component={SignIn}></Route>
                    <Route path='/register' exact component={Register}></Route>
                    <Route path='/dashboard/:_id' exact component={Dashboard}></Route>
                    <Route path='/dashboard/:_id/addfriend' exact component={AddFriend}></Route>
                    <Route path='/dashboard/:_id/editinfo' exact component={EditInfo}></Route>
                </Switch>
            </BrowserRouter>
        )
    }
}


export default Router;