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


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/reset-password" exact component={ResetPassword} />

        <PrivateRoute exact path="/" role="student" component={Home} />
        <PrivateRoute exact path="/course" component={Course} />
        <PrivateRoute exact path="/course-detail/:id" component={CourseDetail} />
        <Route path="*" component={() => "404 NOT FOUND"} />
      </Switch>
    </Router>
  );
}

export default App;