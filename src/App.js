import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { Navbar } from './components/layout/Navbar';
import { Users } from './components/users/Users';
import { User } from './components/users/User';
import { Search } from './components/users/Search';
import { Alert } from './components/layout/Alert';
import { About } from './components/pages/About';

import { store } from './store/store';
 
import './App.css';


export const App = () => {

  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <Navbar />
          <div className="container">
            <Alert />
            <Switch>
              <Route exact path='/' render={(props) => (
                <Fragment>
                  <Search />
                  <Users />
                </Fragment>
              )} />
            </Switch>
            <Route exact path="/about" component={About} />
            <Route exact path="/user/:login" render={(props) => (
                <User {...props} />
              )} 
            />
          </div>
        </div>
      </Router>
    </Provider>
  )
}