import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios'
const img = require('../app_photos/email-dog.jpg')

const divHeight = window.innerHeight - (window.innerHeight / 3)

const UpdateEmail = (props) => {
    const [tokenMsg, setTokenMsg] = useState({ verified: false, msg: '' })

    const mounted = useRef();
    useEffect(() => {
        if (!mounted.current) {
            // do componentDidMount logic
            props.logoutCB()
            verifyToken();
            mounted.current = true;
        }
    });

    const verifyToken = () => {
        var regEx = new RegExp('/update-email/', "ig");
        const tokenUrl = window.location.pathname.replace(regEx, '');
        Axios.put(`/api/email/token`, { token: tokenUrl })
            .then((res) => {
                setTokenMsg({ verified: true, msg: res.data.msg, oldEmail: res.data.oldEmail, newEmail: res.data.newEmail })
            })
            .catch((AxiosError) => {
                console.log(AxiosError.response)
                setTokenMsg({ verified: false, msg: AxiosError.response.data.error })
            });
    };

    return (
        <div className="d-flex justify-content-center mt-4">
            <div className="card shadow mt-4">
                <div className="card-body">
                    <div className="row d-flex align-items-center justify-content-center" style={{ height: divHeight + 'px' }}>
                        <div className=" col-md-6 col-sm-12 ">
                            <img src={img} className="img-fluid" alt="dog email" />
                        </div>
                        <div className=" col-md-6 col-sm-12 " >
                            <Link to="/sign-in" color="black" style={{ color: 'black' }}>

                                <h3 className="font-weight-bold text-black">{tokenMsg.msg}</h3>
                                {
                                    tokenMsg.oldEmail ?
                                        <h4 className="mt-4 font-weight-bold text-black">From: {tokenMsg.oldEmail}</h4>
                                        :
                                        null
                                }
                                {
                                    tokenMsg.newEmail ?
                                        <h4 className="mt-4 font-weight-bold text-black">To: {tokenMsg.newEmail} </h4>
                                        :
                                        null
                                }
                                <h4 className="mt-4 font-weight-bold text-black">Click to go to sign-in page</h4>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateEmail;