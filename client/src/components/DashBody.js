import React, { Component } from 'react';
const phonePic = require('../app_photos/phones.jpg')
const pcPic = require('../app_photos/pc.jpg')

class DashBody extends Component {
    render() {
        return (
            <div >
                <div class="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 class="h3 mb-0 text-gray-800">Buy</h1>
                </div>
                <div className="row">
                    <div class="col-xl-5 col-lg-4">
                        <a href="#">
                            <div class="card shadow mb-4">
                                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                    <h6 class="m-0 font-weight-bold text-primary">Buy Cell Phone</h6>
                                </div>
                                <div class="card-body">
                                    <img src={phonePic} className="img-fluid" />
                                </div>
                            </div>
                        </a>

                    </div>
                    <div class="col-xl-5 col-lg-4">
                        <a href="#">
                            <div class="card shadow mb-4">
                                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                    <h6 class="m-0 font-weight-bold text-primary">Buy PC</h6>
                                </div>
                                <div class="card-body">
                                    <img src={pcPic} className="img-fluid" />
                                </div>
                            </div>
                        </a>
                    </div>
                </div>

            </div>

        );
    }
}

export default DashBody;