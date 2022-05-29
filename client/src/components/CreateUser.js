import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "reactjs-popup/dist/index.css";
import PopupMessage from "./PopupMessage";
import RecaptchaWrapper from "./RecaptchaWrapper";
import { validPassword, validName } from "../Utils"

class CreateUser extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",

    validation: {
      captchaVerified: false,
      succeeded: false,
      // showErrors: false,
      validateChanger: false,
      msg: []
    }
  };
  onChangeFirstName = (e) => {
    this.setState({ firstName: e.target.value });
  };
  onChangeLastName = (e) => {
    this.setState({ lastName: e.target.value });
  };
  onChangeEmail = (e) => {
    this.setState({ email: e.target.value });
  };
  onChangePassword = (e) => {
    this.setState({ password: e.target.value });
  };
  onChangeRepeatPassword = (e) => {
    this.setState({ repeatPassword: e.target.value });
  };

  fieldsAreValid() {
    let validationResult = true
    let errMsg = []
    if (!this.state.validation.captchaVerified) {
      validationResult = false;
      errMsg.push("Recaptcha is necessary")
    }
    if (!validName(this.state.firstName) || !validName(this.state.lastName)) {
      validationResult = false;
      errMsg.push("Name is not valid")
    }
    if (!validPassword(this.state.password)) {
      validationResult = false;
      errMsg.push("Password must be at least 6 characters long and cotain at least 1 number")
    }

    if (this.state.password !== this.state.repeatPassword) {
      validationResult = false;
      errMsg.push("Password are not matches")
    }

    this.setState(prevState => ({
      validation: {
        ...prevState.validation,
        msg: [...errMsg]
      }
    }));

    return validationResult

  }

  onSubmit = (e) => {
    e.preventDefault();
    if (!this.fieldsAreValid()) {
      console.log("not valid")
      return
    }
    console.log("valid")

    const userObject = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      repeatPassword: this.state.repeatPassword,
    };
    axios
      .post("/api/sign-up", userObject)
      .then((res) => {
        console.log(res.data);
        this.setState(prevState => ({
          validation: {
            ...prevState.validation,
            msg: ['Succeed']
          }
        }));
      })
      .catch((AxiosError) => {
        console.log(AxiosError.response);
        this.setState(prevState => ({
          validation: {
            ...prevState.validation,
            msg: [...prevState.validation.msg, AxiosError.response.data.msg]
          }
        }));
      });

  };
  render() {
    return (
      <div className="wrapper">
        <div className="container">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              <div className="row">
                <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
                <div className="col-lg-7">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">
                        Create an Account!
                      </h1>
                    </div>
                    <form className="user" onSubmit={this.onSubmit}>
                      <div className="form-group row">
                        <div className="col-sm-6 mb-3 mb-sm-0">
                          <input
                            type="text"
                            className="form-control form-control-user"
                            id="exampleFirstName"
                            required
                            placeholder="First Name"
                            value={this.state.firstName}
                            onChange={this.onChangeFirstName}
                          />
                        </div>
                        <div className="col-sm-6">
                          <input
                            type="text"
                            className="form-control form-control-user"
                            id="exampleLastName"
                            required
                            placeholder="Last Name"
                            value={this.state.lastName}
                            onChange={this.onChangeLastName}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control form-control-user"
                          id="exampleInputEmail"
                          placeholder="Email Address"
                          required
                          value={this.state.email}
                          onChange={this.onChangeEmail}
                        />
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-6 mb-3 mb-sm-0">
                          <input
                            type="password"
                            className="form-control form-control-user"
                            id="exampleInputPassword"
                            placeholder="Password"
                            required
                            value={this.state.password}
                            onChange={this.onChangePassword}
                          />
                        </div>
                        <div className="col-sm-6">
                          <input
                            type="password"
                            required
                            className="form-control form-control-user"
                            id="exampleRepeatPassword"
                            placeholder="Repeat Password"
                            value={this.state.repeatPassword}
                            onChange={this.onChangeRepeatPassword}
                          />
                        </div>
                      </div>
                      <div className="form-group d-flex justify-content-center">
                        <RecaptchaWrapper
                          afterVerify={(isVerified, data) => this.setState(prevState => ({
                            validation: {
                              ...prevState.validation,
                              captchaVerified: isVerified
                            }
                          }))}
                        />
                      </div>
                      <input type="submit" value="Register Account" disabled={!this.state.validation.captchaVerified}
                        className="btn btn-primary btn-user btn-block"
                      />
                    </form>
                    <hr />
                    <div className="text-center">
                      <Link className="small" to={"/forgot-password"}>
                        Forgot Password?
                      </Link>
                    </div>
                    <div className="text-center">
                      <Link className="small" to={"/sign-in"}>
                        Already have an account? Login!
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {
          this.state.validation.msg.length > 0 && this.state.validation.msg[0] !== 'Succeed' ?
            <PopupMessage
              title="Error"
              body={
                <>
                  {
                    <ul>
                      {
                        this.state.validation.msg.map((item, key) => (
                          <li key={key} className="text-black mt-1">{item}</li>
                        ))
                      }
                    </ul>
                  }
                </>
              }
              onClose={() => {
                this.setState(prevState => ({
                  validation: {
                    ...prevState.validation,
                    msg: []
                  }
                }))
              }}
            />
            :
            this.state.validation.msg.length > 0 && this.state.validation.msg[0] === 'Succeed' ?
              <PopupMessage
                title="Registration Succeed"
                body={
                  <div >
                    <div className="text-black">Hi {this.state.firstName}, Welcome to our shop !!</div>
                    <div className="text-black font-weight-bold">We've sent you a verification email, You will be able to login only after approve </div>
                    <div className="text-black  mt-3">Your details:</div>
                    <div className="ml-2 mt-1">
                      <div >First Name : {this.state.firstName}</div>
                      <div>Last Name :{this.state.lastName}</div>
                      <div>Email : {this.state.email}</div>
                    </div>
                  </div>
                }
                withOk={true}
                navigateTo="/sign-in"
                okBtnText="Go to login page"
                closeOnlyWithBtn={true}
                onClose={() => {
                  this.setState(prevState => ({
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    repeatPassword: "",

                    validation: {
                      ...prevState.validation,
                      msg: []
                    }
                  }
                  ))
                }}

              />
              :
              null
        }
      </div >
    );
  }
}

export default CreateUser;
