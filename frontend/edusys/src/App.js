import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom';
import Login from './containers/Login';
import ResetPassword from './containers/ResetPassword';
import { PrivateRoute } from './components/HOC/PrivateRoute';
import Home from './containers/Home';
import Course from './containers/Course';
import CourseDetail from './containers/Course/CourseDetail';
import { logoutAction } from './actions';
import About from './containers/About';
import Chat from './containers/Chat';
import Profile from './containers/Profile';




function App() {


  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/reset-password" component={ResetPassword} />

        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/course" component={Course} />
        <PrivateRoute exact path="/course-detail" component={CourseDetail} />
        <PrivateRoute exact path="/message" component={Chat} />
        <PrivateRoute exact path="/about" component={About} />
        <Route path="*" component={() => "404 NOT FOUND"} />
      </Switch>
    </Router>
  );
}

export default App