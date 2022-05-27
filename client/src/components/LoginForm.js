import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

import RecaptchaWrapper from "./RecaptchaWrapper";
import PopupMessage from "./PopupMessage";
class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    isRememberMe: false,

    verified: false,

    errors: {
      showErrPopup: false,
      msg: '',
      validateChanger: false
    }
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
      this.setState({
        errors: {
          showErrPopup: !this.state.errors.showErrPopup,
          msg: 'Recaptcha is neccessary',
          validateChanger: true
        }
      })
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
        console.log(`login remember ${this.state.isRememberMe}`);
        console.log(res);
      })
      .catch((AxiosError) => {
        console.log(AxiosError.response);
        this.setState({
          errors: {
            showErrPopup: !this.state.errors.showErrPopup,
            msg: AxiosError.response.data.error,
            validateChanger: true
          }
        })
      });
  };
  //this is for rerendering the errors popup if needed
  componentDidUpdate() {
    if (this.state.errors.validateChanger && !this.state.errors.showErrPopup)
      this.setState({
        errors: {
          ...this.state.errors,
          showErrPopup: !this.state.errors.showErrPopup,
        }
      })
  }

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
                              className="form-control form-control-user"
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
                            <input
                              type="submit"
                              value="Login"
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
          this.state.errors.showErrPopup ?
            <PopupMessage
              title="Error"
              body={
                <div className="text-black">{this.state.errors.msg}</div>
              }
              withOk={false}
              withClose={false}
            />
            :
            null
        }
      </div>
    );
  }
}

export default LoginForm;
