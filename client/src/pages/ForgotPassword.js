import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RecaptchaWrapper from '../components/RecaptchaWrapper';
import Axios from "axios";
import PopupMessage from '../components/PopupMessage';

class ForgotPassword extends Component {
    state = {
        email: '',
        verified: false,
        msgHeader: '',
        msg: ''
    }
    onChangeEmail = (e) => this.setState({ email: e.target.value })

    onSubmit = (e) => {
        e.preventDefault();
        //send email for server treatment
        const emailObject = { email: this.state.email };
        Axios.post(`/api/forgot`, emailObject)
            .then((res) => {
                this.setState({ msgHeader: 'Verify Email', msg: res.data.msg })
            })
            .catch((AxiosError) => {
                this.setState({ msgHeader: 'Error', msg: AxiosError.response.data.error })
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
                                        <div className="col-lg-6 d-none d-lg-block bg-password-image"></div>
                                        <div className="col-lg-6">
                                            <div className="p-5">
                                                <div className="text-center">
                                                    <h1 className="h4 text-gray-900 mb-2">Forgot Your Password?</h1>
                                                    <p className="mb-4">We get it, stuff happens. Just enter your email address below
                                                        and we'll send you a link to reset your password!</p>
                                                </div>
                                                <form className="user" onSubmit={this.onSubmit}>
                                                    <div className="form-group">
                                                        <input type="email" className="form-control form-control-user"
                                                            required
                                                            onChange={this.onChangeEmail} value={this.state.email}
                                                            id="exampleInputEmail" aria-describedby="emailHelp"
                                                            placeholder="Enter Email Address..." />
                                                    </div>
                                                    <div className="form-group d-flex justify-content-center">
                                                        <RecaptchaWrapper
                                                            afterVerify={(isVerified, data) => this.setState({ verified: isVerified })}
                                                        />
                                                    </div>
                                                    <input type="submit" value="Reset Password" className="btn btn-primary btn-user btn-block"
                                                        disabled={!this.state.verified} />
                                                </form>
                                                <hr />
                                                <div className="text-center">
                                                    <Link className="small" to={"/sign-up"}>
                                                        Create an Account!
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

                    </div>
                </div>
                {
                    this.state.msgHeader && this.state.msg ?
                        <PopupMessage
                            title={this.state.msgHeader}
                            body={
                                <div className="text-black">{this.state.msg}</div>
                            }
                            onClose={() => {
                                this.setState({ msg: '', msgHeader: '' })
                            }}
                            closeOnlyWithBtn={this.state.msgHeader === 'Error' ? false : true}

                            status={this.state.msgHeader === 'Error' ? 'error' : 'info'}
                        />
                        :
                        null
                }
            </div>
        );
    }
}

export default ForgotPassword;