import React from 'react';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import NewsListPage from './pages/NewsListPage';
import NewsItemPage from './pages/NewsItemPage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/news/:id' component={NewsItemPage} />
        <Route path='/news' component={NewsListPage} />
        <Redirect to='/news' />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
