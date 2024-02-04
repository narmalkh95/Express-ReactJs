import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages//Register';
import Home from './pages//Home';

const AppRouter = () => {
    return (
        <Router>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/login" exact component={Home} />
            </Switch>
        </Router>
    );
};

export default AppRouter;
