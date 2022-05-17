import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import CreateUser from './components/CreateUser'
import LoginForm from './components/LoginForm'
import ForgotPassword from './components/ForgotPassword'
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import HeaderSign from './components/HeaderSign';
import RouteParam from './components/RouteParam'
class App extends Component {
  constructor(props) {
    super(props)
    this.state =  {
      logged: JSON.parse(window.localStorage.getItem('user')) || false
    }
  }
  setState(state) {
    window.localStorage.setItem('state', JSON.stringify(state));
    super.setState(state);
  }


  getNav = () => {
    if (this.state.logged === false) {
      return (
        <HeaderSign />
      )
    }
    else return (<div />)
  }
  handleLogin = (isRemember) => {
    this.setState({ logged: true })
    if (isRemember){
      window.localStorage.setItem('user',isRemember);
    }
  }
  handleLogout = ()=>{
    this.setState({logged:false})
    localStorage.clear();
  }

  render() {
    return (
      <Router>
        <div className="App ">
          {this.getNav()}
          <Routes>
            <Route
              exact path="/"
              element={this.state.logged === true ?
                <Navigate to="/dashboard" />
                :
                <Navigate to="/sign-in" />
              }
            />
            <Route
              path="/sign-in"
              element={this.state.logged === false ?
                <LoginForm handleLogin={this.handleLogin} />
                :
                <Navigate to="/dashboard" />
              }
            />
            <Route
              path="/sign-up"
              element={this.state.logged === false ? 
              <CreateUser handleLogin={this.handleLogin}/>
               : 
              <Navigate to="/dashboard" />}
            />
            
            <Route
              path="/forgot-password"
              element={this.state.logged === false ? <ForgotPassword /> : <Navigate to="/dashboard" />}
            />
            <Route
              path="/dashboard"
              element={this.state.logged === true ?  <Dashboard handleLogout={this.handleLogout}/> : <Navigate to="/sign-in" />}
            />
            <Route path = "/param/*" element = {<RouteParam />}></Route>
          </Routes>
          {
            this.state.logged === false ?
              <Footer />
              :
              <div />
          }
        </div>
      </Router>
    );
  }
}
export default App