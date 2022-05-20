import React, { Component } from 'react';
import Card from './Card';

const phonePic = require('../app_photos/phones.jpg')
const pcPic = require('../app_photos/pc.png')
const tvPic = require('../app_photos/tv.png')
const laptopPic = require('../app_photos/laptop.png')

class DashBody extends Component {
    render() {
        return (
            <div >

                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Buy:</h1>
                </div>

                <div className="row">
                    <Card header="Buy Cell Phone" image={phonePic} linkTo="/dashboard/phone" />
                    <Card header="Buy PC" image={pcPic} linkTo="/dashboard/pc" />
                </div>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h5 mb-0 text-gray-800">Coming Soon:</h1>
                </div>
                <div className="row">
                    <Card image={tvPic} />
                    <Card image={laptopPic} />
                </div>
            </div>

        );
    }
}

export default DashBody;