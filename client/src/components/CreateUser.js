import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import PopupMessage from './PopupMessage';


class CreateUser extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        repeatPassowrd: '',
        validation: {
            successfulLogin: false,
            tryValidate: false
        }
    }
    onChangeFirstName = (e) => {
        this.setState({ firstName: e.target.value })
    }
    onChangeLastName = (e) => {
        this.setState({ lastName: e.target.value })
    }
    onChangeEmail = (e) => {
        this.setState({ email: e.target.value })
    }
    onChangePassword = (e) => {
        this.setState({ password: e.target.value })
    }
    onChangeRepeatPassword = (e) => {
        this.setState({ repeatPassowrd: e.target.value })
    }
    onSubmit = (e) => {
        e.preventDefault()
        const userObject = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
        };

        // axios.post("/api/users/save", userObject)
        //     .then((res) => {
        //         console.log(res.data)
        //     }).catch((error) => {
        //         console.log(error)
        //     });
        if (this.state.firstName !== '') {
            this.setState({ validation: { successfulLogin: true, tryValidate: true } })
        }
        else {
            this.setState({
                validation: {
                    successfulLogin: false,
                    tryValidate: !this.state.validation.tryValidate
                }
            })
        }

    }

    componentDidUpdate() {
        if (!this.state.validation.tryValidate)
            this.setState({
                validation: {
                    successfulLogin: false,
                    tryValidate: true
                }
            })

    }
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
                                            <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                                        </div>
                                        <form className="user" onSubmit={this.onSubmit}>
                                            <div className="form-group row">
                                                <div className="col-sm-6 mb-3 mb-sm-0">
                                                    <input type="text" className="form-control form-control-user" id="exampleFirstName"
                                                        placeholder="First Name" value={this.state.firstName} onChange={this.onChangeFirstName} />
                                                </div>
                                                <div className="col-sm-6">
                                                    <input type="text" className="form-control form-control-user" id="exampleLastName"
                                                        placeholder="Last Name" value={this.state.lastName} onChange={this.onChangeLastName} />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <input type="email" className="form-control form-control-user" id="exampleInputEmail"
                                                    placeholder="Email Address" value={this.state.email} onChange={this.onChangeEmail} />
                                            </div>
                                            <div className="form-group row">
                                                <div className="col-sm-6 mb-3 mb-sm-0">
                                                    <input type="password" className="form-control form-control-user"
                                                        id="exampleInputPassword" placeholder="Password"
                                                        value={this.state.password} onChange={this.onChangePassword} />
                                                </div>
                                                <div className="col-sm-6">
                                                    <input type="password" className="form-control form-control-user"
                                                        id="exampleRepeatPassword" placeholder="Repeat Password"
                                                        value={this.state.repeatPassowrd} onChange={this.onChangeRepeatPassword} />
                                                </div>
                                            </div>
                                            <input type="submit" value="Register Account" className="btn btn-primary btn-user btn-block" />

                                        </form>
                                        <hr />
                                        <div className="text-center">
                                            <Link className="small" to={'/forgot-password'}>
                                                Forgot Password?
                                            </Link>
                                        </div>
                                        <div className="text-center">
                                            <Link className="small" to={'/sign-in'}>
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
                    this.state.validation.successfulLogin ?
                        <PopupMessage title={"Registration Succeed"} body={
                            <div>
                                <div>Hi {this.state.firstName}, Welcome to our shop !!</div>
                                <div>You are registered with the details:</div>
                                <div>First Name : {this.state.firstName}</div>
                                <div>Last Name :{this.state.lastName}</div>
                                <div>Email : {this.state.email}</div>
                            </div>
                        }
                            withOk={true}
                            okBtnText={"Continue to the shop"}
                            onOk={this.props.handleLogin}
                            withClose={false}
                        />
                        :
                        null
                }
                {
                    this.state.validation.tryValidate ?
                        <PopupMessage title={"Error"} body={
                            <div>
                                <div>Missing : name </div>
                            </div>
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

export default CreateUser;