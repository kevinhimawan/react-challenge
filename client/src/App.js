import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home.jsx'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import ErrorPage from './components/ErrorPage.jsx'


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Yuk Baca - Baca</h1>
          </header>
          <Switch>
            <Route exact path ="/" component = {Home}/>
            <Route exact path ="/search/:query" component = {Home}/>
            <Route exact path ="/category/:category" component = {Home}/>
            <Route component = {ErrorPage}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App
