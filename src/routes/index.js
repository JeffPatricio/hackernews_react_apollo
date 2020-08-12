import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import News from '../pages/News';
import Search from '../pages/Search';
import Login from '../pages/Login';
import CreateLink from '../pages/CreateLink';

const Routes = () => {
  return (
    <Switch>
      <Route exact path='/' render={() => <Redirect to='/news/1' />} />
      <Route exact path='/news/:page' component={News} />
      <Route exact path='/top' component={News} />
      <Route exact path="/create" component={CreateLink} />
      <Route exact path="/login" component={Login} />
      <Route exact path='/search' component={Search} />
    </Switch>
  );
}

export default Routes;
