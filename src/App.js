import React from 'react';
import './App.css';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import NewsList from './pages/NewsList';
import NewsItem from './pages/NewsItem';
// import NewsItem2 from './pages/NewsItem2';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/news/:id' component={NewsItem} />
        <Route path='/news' component={NewsList} />
        <Redirect to='/news' />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
