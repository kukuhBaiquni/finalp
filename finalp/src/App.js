import React, { Component } from 'react';
import RegisterLoginPage from './Components/RegisterLoginPage'
import './Header.css'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Profile from './Components/Profile'
import HomePage from './Components/HomePage'
import TulisResepPage from './Components/TulisResepPage'

class App extends Component {
  render() {
    return (
        <div>
          <BrowserRouter>
            <Switch>
              <Route exact path='/' component={HomePage} />
              <Route path='/profile' component={Profile} />
                <Route path='/register&login' component={RegisterLoginPage} />
                <Route path='/tulisresep' component={TulisResepPage} />
            </Switch>
          </BrowserRouter>
        </div>
    );
  }
}
export default App;
