import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom';
import { isUserLoggedIn } from './actions';
import { PrivateRoute } from './components/HOC/PrivateRoute';
import Category from './containers/Category';
import Course from './containers/Course';
import Home from './containers/Home';
import Login from './containers/Login';
import ResetPassword from './containers/ResetPassword';
import User from './containers/User';


function App() {


  return (
    <Router>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/reset-password" exact component={ResetPassword} />

        <PrivateRoute exact path="/" role="admin" component={Home} />
        <PrivateRoute exact path="/user" role="admin" component={User} />
        <PrivateRoute exact path="/category" role="admin" component={Category} />
        <PrivateRoute exact path="/course" role="admin" component={Course} />

        <Route path="*" component={() => "404 NOT FOUND"} />
      </Switch>
    </Router>
  );
}

export default App;
