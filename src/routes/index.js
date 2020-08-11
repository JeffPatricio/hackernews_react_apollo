import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import CreateLink from '../components/CreateLink'
import LinkList from '../components/LinkList'
import Login from '../components/Login'
import Search from '../components/Search'


import News from '../pages/News';

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
