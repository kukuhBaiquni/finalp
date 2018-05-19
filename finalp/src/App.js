import React, { Component } from 'react';
import Home from './Components/Home'
import './Header.css'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Profile from './Components/Profile'

class App extends Component {
  render() {
    return (
        <div>
          <BrowserRouter>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/profile' component={Profile} />
            </Switch>
          </BrowserRouter>
        </div>
    );
  }
}
export default App;
