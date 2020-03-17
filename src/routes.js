import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Cart from './Pages/Cart';
import Home from './Pages/Home';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/cart" component={Cart} />
    </Switch>
  );
}
