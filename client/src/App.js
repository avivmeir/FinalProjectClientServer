import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import CreateUser from "./pages/CreateUser";
import LoginForm from "./pages/LoginForm";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";
import HeaderSign from "./components/HeaderSign";
import NotFound404 from "./pages/NotFound404";
import UpdatePassword from "./pages/UpdatePassword";
import UpdateEmail from "./pages/UpdateEmail";
import NewUser from "./pages/NewUser";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: JSON.parse(window.localStorage.getItem("logged")) || false,
      email: window.localStorage.getItem("email") || "",
      firstName: window.localStorage.getItem("firstName") || "",
    };
  }
  setState(state) {
    window.localStorage.setItem("state", JSON.stringify(state));
    super.setState(state);
  }

  getNav = () => {
    if (this.state.logged === false) {
      return <HeaderSign />;
    } else return <div />;
  };
  handleLogin = (isRemember, emailAdress, firstName) => {
    this.setState({ logged: true, email: emailAdress, firstName: firstName });
    if (isRemember) {
      window.localStorage.setItem("logged", isRemember);
      window.localStorage.setItem("email", emailAdress);
      window.localStorage.setItem("firstName", firstName);

    }
  };
  handleLogout = () => {
    this.setState({ logged: false });
    localStorage.clear();
  };
  render() {
    return (
      <Router>
        <div className="App ">
          {this.getNav()}
          <Routes>
            <Route path="/update-password/*" element={<UpdatePassword />} />
            <Route path="/update-email/*" element={<UpdateEmail logoutCB = {this.handleLogout}/>}/>
            <Route path="/new-user/*" element={<NewUser logoutCB = {this.handleLogout}/>} />

            <Route
              exact path="/"
              element={
                this.state.logged === true ?
                  <Navigate to="/dashboard" />
                  :
                  <Navigate to="/sign-in" />

              }
            />
            <Route
              path="/sign-in"
              element={
                this.state.logged === false ?
                  <LoginForm handleLogin={this.handleLogin} />
                  :
                  <Navigate to="/dashboard" />

              }
            />
            <Route
              path="/sign-up"
              element={
                this.state.logged === false ?
                  <CreateUser />
                  :
                  <Navigate to="/dashboard" />

              }
            />

            <Route
              path="/forgot-password"
              element={
                this.state.logged === false ?
                  <ForgotPassword />
                  :
                  <Navigate to="/dashboard" />

              }
            />
            <Route
              path="dashboard/*"
              element={
                this.state.logged === true ?
                  <Dashboard
                    handleLogout={this.handleLogout}
                    emailAdress={this.state.email}
                    firstName={this.state.firstName}
                  />
                  :
                  <Navigate to="/sign-in" />

              }
            ></Route>
            {this.state.logged ?
              <Route path="*" exact={true} element={<Dashboard />} />
              :
              <Route path="*" exact={true} element={<NotFound404 />} />
            }
          </Routes>
          {this.state.logged === false ? <Footer /> : <div />}
        </div>
      </Router>
    );
  }
}
export default App;
