import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import CreateUser from './components/CreateUser'
import LoginForm from './components/LoginForm'
import ForgotPassword from './components/ForgotPassword'
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import HeaderSign from './components/HeaderSign';

class App extends Component {
  state = {
    loged: false
  }
  getNav = () => {
    console.log(`getNav : ${this.state.loged}`)
    if (this.state.loged === false) {
      return (
        <HeaderSign/>
      )
    }
    else return (<div />)

  }
  getHomePage = () => {
    if (this.state.loged)
      return <Dashboard />
    else
      return <LoginForm />

  }
  render() {
    return (
      <Router>
        <div className="App ">
          {this.getNav()}
          <Routes>
            <Route exact path="/" element={this.getHomePage()} />
            <Route path="/sign-in" element={<LoginForm />} />
            <Route path="/sign-up" element={<CreateUser />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/dashboard" element={this.getHomePage()} />
          </Routes>
          {
            this.state.loged === false ?
              <Footer/>
            :
              <div/>
          }
        </div>
      </Router>
    );
  }
}
export default App