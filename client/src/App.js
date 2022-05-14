import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import CreateUser from './components/CreateUser'
import LoginForm from './components/LoginForm'
import ForgotPassword from './components/ForgotPassword'



function App() {
  return (
    <Router>
      <div className="App ">
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
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Routes>
                <Route exact path="/" element={<LoginForm />} />
                <Route path="/sign-in" element={<LoginForm />} />
                <Route path="/sign-up" element={<CreateUser />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />

              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>
  )
}
export default App