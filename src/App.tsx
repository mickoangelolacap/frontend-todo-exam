import React from 'react';

import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Header from './components/Header';
import SignInPage from './components/SignInPage';
import ToDoPage from './components/ToDoComponents/ToDoPage';

import './App.scss';

function App() {
  return (
    <main className="App">
      <BrowserRouter>
          <Header />
          <Switch>
            <Route path="/" exact component={SignInPage}/>
            <Route path="/todo" component={ToDoPage}/>
          </Switch>
      </BrowserRouter>
    </main>
  );
}

export default App;
