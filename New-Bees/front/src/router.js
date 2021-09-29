import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Homepage from './pages/homepage.js';
import SignIn from './pages/signin.js';
import Register from './pages/register.js';
import Dashboard from './pages/dashboard.js';
import Contact from './pages/contact.js';
import Search from './pages/search.js';
import EditInfo from './pages/editinfo.js';
import EditAvatar from './pages/editAvatar.js';


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
                    <Route path='/dashboard/:_id/contact' exact component={Contact}></Route>
                    <Route path='/dashboard/:_id/search' exact component={Search}></Route>
                    <Route path='/dashboard/:_id/editinfo' exact component={EditInfo}></Route>
                    <Route path='/dashboard/:_id/EditAvatar' exact component={EditAvatar}></Route>
                </Switch>
            </BrowserRouter>
        )
    }
}


export default Router;