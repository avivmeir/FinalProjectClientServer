import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import CreateUser from './components/CreateUser'
import LoginForm from './components/LoginForm'
import ForgotPassword from './components/ForgotPassword'
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';

class App extends Component {
  state = {
    loged: false
  }
  getNav = () => {
    console.log(`getNav : ${this.state.loged}`)
    if (this.state.loged === false) {
      return (
        <header>
          <nav className="navbar navbar-expand-lg navbar-dark bg-gradient-primary">
            <a className="navbar-brand mx-2">Webshop | </a>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                  <Link className="nav-link" to={'/sign-up'}>
                    Create Account
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-in'}>
                    Login
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </header>
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
          <Footer/>
        </div>
      </Router>
    );
  }
}
export default App