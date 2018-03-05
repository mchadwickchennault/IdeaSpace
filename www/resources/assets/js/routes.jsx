import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from './containers/Main';
import Add from './containers/Add';

export default () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/add" component={Add} />
    </Switch>
  </BrowserRouter>
);
