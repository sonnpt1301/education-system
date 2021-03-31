import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom';
import { PrivateRoute } from './components/HOC/PrivateRoute';
import Home from './containers/Home';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        {/* <PrivateRoute path="/faculty" component={Faculty} />
        <PrivateRoute path="/user" component={User} />  
        <PrivateRoute path="/term" component={Term} />  

        <Route path="/login" component={Login} /> */}
        <Route path="*" component={() => "404 NOT FOUND"} />
      </Switch>
    </Router>
  );
}

export default App;
