import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class BuyPc extends Component {
    render() {
        return (
            <div >
                <div className="row text-black">
                    <h3>Buy PC:</h3>
                </div>
                <div className="m-2 float-left">
                    This page is under construction. Return to{" "}
                    <Link to="..">Dashboard</Link>
                </div>
            </div>
        );
    }
}

export default BuyPc;