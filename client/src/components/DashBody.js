import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const phonePic = require('../app_photos/phones.jpg')
const pcPic = require('../app_photos/pc.jpg')

class DashBody extends Component {
    render() {
        return (
            <div >
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Buy</h1>
                </div>
                <div className="row">
                    <div className="col-xl-5 col-lg-4">
                        <Link to={"/#"}>
                            <div className="card shadow mb-4">
                                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                    <h6 className="m-0 font-weight-bold text-primary">Buy Cell Phone</h6>
                                </div>
                                <div className="card-body">
                                    <img src={phonePic} className="img-fluid" alt="buy phone" />
                                </div>
                            </div>
                        </Link>

                    </div>
                    <div className="col-xl-5 col-lg-4">
                        <Link to={"/#"}>
                            <div className="card shadow mb-4">
                                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                    <h6 className="m-0 font-weight-bold text-primary">Buy PC</h6>
                                </div>
                                <div className="card-body">
                                    <img src={pcPic} className="img-fluid" alt="buy pc"/>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>

            </div>

        );
    }
}

export default DashBody;