import React, { useState, useRef, useEffect } from 'react';
import Axios from "axios";
import PopupMessage from '../components/PopupMessage';
import { validPassword, getPasswordErrors,allPasswordCorrect } from "../utility/Utils"
import { ShowPasswordMsg } from '../components/ShowPasswordMsg';

const UpdatePassword = (props) => {
    const [password, setPassword] = useState('')
    const [repeatedPassword, setRepeated] = useState('')
    const [tokenMsg, setTokenMsg] = useState({ verified: false, msg: '' })
    const [popupMsg, setPopupMsg] = useState({ title: '', text: '' })
    const [passwordErros, setPasswordErros] = useState([])
    const mounted = useRef();
    useEffect(() => {
        if (!mounted.current) {
            // do componentDidMount logic
            verifyToken()
            mounted.current = true;
        }
    });

    const verifyToken = () => {
        var regEx = new RegExp('/update-password/', "ig");
        const tokenUrl = window.location.pathname.replace(regEx, '');
        console.log(`token ${tokenUrl}`)
        Axios.post(`/api/forgot/token`, { token: tokenUrl })
            .then((res) => {
                console.log(JSON.stringify(res.data))
                setTokenMsg({ verified: true, msg: res.data.msg, email: res.data.email })
            })
            .catch((AxiosError) => {
                console.log(AxiosError)
                setTokenMsg({ verified: false, msg: AxiosError.response.data.error })
            });
    }

    const submitForm = (e) => {
        e.preventDefault();
        if (password !== repeatedPassword || !validPassword(password)) {
            setPopupMsg({ title: "Error", text: 'Password must be at least 6 characters long and cotain at least 1 number' })
            return
        }
        verifyToken()
        console.log(`email: ${tokenMsg.email}`)
        const emailPassword = { email: tokenMsg.email, password: password }

        Axios
            .put(`/api/forgot/changepassword`, emailPassword)
            .then((res) => {
                console.log(res)
                setPopupMsg({ title: 'Congratulation', text: res.data.msg })

            }).catch((AxiosError) => {
                console.log(AxiosError)
                setPopupMsg({ title: "Error", text: AxiosError.response.data.error })
            })

    }
    // 
    if (!tokenMsg.verified) {
        let divHeight = window.innerHeight - (window.innerHeight / 5.5)
        return (
            <div className="h1 m-2 fw-bolder text-black font-bold d-flex align-items-center justify-content-center" style={{ height: divHeight + 'px' }}>
                {tokenMsg.msg}
            </div>
        )

    }
    else {
        return (
            <div className="wrapper">
                <div className="container">
                    <div className="card o-hidden border-0 shadow-lg mt-5">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
                                <div className="col-lg-7 py-5 my-5">
                                    <div className="p-5 ">
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
                                                        onChange={(e) => {
                                                            setPassword(e.target.value)
                                                            const errs = getPasswordErrors(e.target.value, repeatedPassword)
                                                            setPasswordErros(errs)
                                                        }}
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
                                                        onChange={(e) => {
                                                            setRepeated(e.target.value)
                                                            const errs = getPasswordErrors(password, e.target.value)
                                                            setPasswordErros(errs)
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group d-flex justify-content-center">
                                            </div>
                                            <input type="submit" value="Update Password"
                                                className="btn btn-primary btn-user btn-block"
                                                disabled= {!allPasswordCorrect(passwordErros)}
                                            />
                                        </form>
                                        <div className="col-md-12 mt-5 text-left">
                                            {
                                                passwordErros.length > 0 ?
                                                    <>
                                                        {passwordErros.map((item, key) => (
                                                            <div key={key}>
                                                                < ShowPasswordMsg
                                                                    match={item.valid}
                                                                    text={item.msg}
                                                                />
                                                                <br />
                                                            </div>
                                                        ))}
                                                    </>
                                                    :
                                                    null
                                            }
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    popupMsg.title && popupMsg.text ?
                        <PopupMessage
                            title={popupMsg.title}
                            body={<div className="text-black my-5 ml-3">{popupMsg.text}</div>}
                            onClose={() => {
                                setPopupMsg({ title: '', text: '' })
                                setPassword('')
                                setRepeated('')
                            }}
                            withOk={popupMsg.title === 'Error' ? false : true}
                            okBtnText={popupMsg.title === 'Error' ? null : 'Go to login page'}
                            navigateTo={popupMsg.title === 'Error' ? null : '/sign-in'}
                            closeOnlyWithBtn={popupMsg.title === 'Error' ? false : true}
                        />
                        :
                        null
                }
            </div >
        );
    }

};

export default UpdatePassword;