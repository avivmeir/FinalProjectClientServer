import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import CreateUser from './components/CreateUser';

class App extends Component {
 
  render() {
      return (
          <div className="App">
            <CreateUser/>
          </div>
      )
  }
}

export default App;