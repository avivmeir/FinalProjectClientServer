import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import jwt from 'jwt-decode' // import dependency
import Axios from "axios";
import PopupMessage from './PopupMessage';

const UpdatePassword = (props) => {
    const [password, setPassword] = useState('')
    const [repeatedPassword, setRepeated] = useState('')
    const [tokenMsg, setTokenMsg] = useState({ verified: false, msg: '' })

    const mounted = useRef();
    useEffect(() => {
        if (!mounted.current) {
            // do componentDidMount logic
            verifyToken()
            mounted.current = true;
        } else {
            // do componentDidUpdate logic
            //verifyToken()
        }
    });

    const verifyToken = () => {
        const tokenUrl = window.location.pathname.replace('/update-password/', '');
        console.log(`token ${tokenUrl}`)
        Axios.post(`/api/password/token`, { token: tokenUrl })
            .then((res) => {
                console.log(res)
                setTokenMsg({ verified: true, msg: res.data.msg })
            })
            .catch((AxiosError) => {
                console.log(AxiosError)
                setTokenMsg({ verified: false, msg: AxiosError.response.data.msg })
            });
    }

    const submitForm = (e) => {
        e.preventDefault();
        //send token for server verify
        verifyToken()
    }
    // 
    if (!tokenMsg.verified) {
        let divHeight = window.innerHeight - (window.innerHeight/5.5)
        return (

            <div className="h1 fw-bolder text-black font-bold d-flex align-items-center justify-content-center" style={{ height: divHeight + 'px' }}>
                {tokenMsg.msg}
            </div>

        )

    }
    else {
        return (
            <div className="wrapper">
                <div className="container">
                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
                                <div className="col-lg-7 py-5 my-5">
                                    <div className="p-5 my-5">
                                        <div className="text-center">
                                            <h1 className="h4 mb-4">
                                                Update Password !
                                            </h1>
                                        </div>
                                        <form className="user" onSubmit={submitForm}
                                        >
                                            <div className="form-group row">
                                                <div className="col-sm-6 mb-3 mb-sm-0">
                                                    <input
                                                        type="password"
                                                        className="form-control form-control-user"
                                                        id="exampleInputPassword"
                                                        placeholder="Password"
                                                        required
                                                        autoComplete="on"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                    />
                                                </div>
                                                <div className="col-sm-6">
                                                    <input
                                                        type="password"
                                                        required
                                                        className="form-control form-control-user"
                                                        id="exampleRepeatPassword"
                                                        placeholder="Repeat Password"
                                                        value={repeatedPassword}
                                                        autoComplete="on"
                                                        onChange={(e) => setRepeated(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group d-flex justify-content-center">
                                            </div>
                                            <input type="submit" value="Update Password"
                                                className="btn btn-primary btn-user btn-block"
                                            />
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }

};

export default UpdatePassword;