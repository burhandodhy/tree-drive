import React from 'react';
import ReactDOM from 'react-dom';
import Header from './layout/Header'
import { HashRouter as Router, Route } from "react-router-dom";

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'


class App extends React.Component {

  state = {
    userdata: {}
  }
  
  
  render() {
    return (
      <Router>
        <Header/>
        
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/Register" component={Register} />


      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
