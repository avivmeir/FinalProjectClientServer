import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

import RecaptchaWrapper from "../components/RecaptchaWrapper";
import PopupMessage from "../components/PopupMessage";
class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    isRememberMe: false,

    verified: false,
    errMsg:''

  };
  onChangeEmail = (e) => {
    this.setState({ email: e.target.value });
  };
  onChangePassword = (e) => {
    this.setState({ password: e.target.value });
  };
  onChangeRememberMe = (e) => {
    this.setState({ isRememberMe: e.target.checked });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (!this.state.verified) {
      this.setState({errMsg: 'Recaptcha is neccessary'})
      return
    }

    const userObject = {
      email: this.state.email,
      password: this.state.password,
    };

    Axios
      .post("/api/sign-in", userObject)
      .then((res) => {
        this.props.handleLogin(
          this.state.isRememberMe,
          this.state.email,
          res.data.firstName
        );
      })
      .catch((AxiosError) => {
        console.log(AxiosError.response);
        this.setState({errMsg: AxiosError.response.data.error})
      });
  };


  render() {
    return (
      <div className="wrapper">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-10 col-lg-12 col-md-9">
              <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                  <div className="row">
                    <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                    <div className="col-lg-6">
                      <div className="p-5">
                        <div className="text-center">
                          <h1 className="h4 text-gray-900 mb-4">
                            Welcome Back!
                          </h1>
                        </div>
                        <form className="user" onSubmit={this.onSubmit}>
                          <div className="form-group">
                            <input
                              type="email"
                              required
                              className="form-control form-control-user"
                              value={this.state.email}
                              onChange={this.onChangeEmail}
                              id="exampleInputEmail"
                              aria-describedby="emailHelp"
                              placeholder="Enter Email Address..."
                            />
                          </div>
                          <div className="form-group">
                            <input
                              type="password"
                              required
                              className="form-control form-control-user"
                              autoComplete="on"
                              value={this.state.password}
                              onChange={this.onChangePassword}
                              id="exampleInputPassword"
                              placeholder="Password"
                            />
                          </div>
                          <div className="form-group">
                            <div className="custom-control custom-checkbox small text-left ">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck"
                                value={this.state.isRememberMe}
                                onChange={this.onChangeRememberMe}
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="customCheck"
                              >
                                Remember Me
                              </label>
                            </div>
                          </div>
                          <div className="form-group d-flex justify-content-center">
                            <RecaptchaWrapper
                              afterVerify={(isVerified, data) => this.setState({ verified: isVerified })}
                            />
                          </div>
                          <div className="form-group">
                            <input type="submit" value="Login" disabled ={!this.state.verified}
                              className="btn btn-primary btn-user btn-block"
                            />
                          </div>
                        </form>
                        <hr />
                        <div className="text-center">
                          <Link className="small" to={"/forgot-password"}>
                            Forgot Password?
                          </Link>
                        </div>
                        <div className="text-center">
                          <Link className="small" to={"/sign-up"}>
                            Create an Account!
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {
          this.state.errMsg ?
            <PopupMessage
              title="Error"
              body={
                <div className="text-black">{this.state.errMsg}</div>
              }
              onClose={()=>{
                this.setState({errMsg:''})
              }}
              status='error'
            />
            :
            null
        }
      </div>
    );
  }
}

export default LoginForm;
