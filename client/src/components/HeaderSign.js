import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class HeaderSign extends Component {
    render() {
        return (
            <header>
                <nav className="navbar navbar-fixed-top navbar-dark bg-gradient-primary">
                    <div className="container">
                        <div className="navbar-header ">
                            <span className="navbar-brand ">Webshop | </span>
                        </div>
                        <div className="nav navbar-header navbar-profile  pull-right">
                            <span className="navbar-nav ml-auto nav-item mx-4">
                                <Link className="nav-link" to={'/sign-up'}>
                                    Create Account
                                </Link>
                            </span>
                            <span className="navbar-nav ml-auto nav-item ">
                                <Link className="nav-link" to={'/sign-in'}>
                                    Login
                                </Link>
                            </span>
                        </div>
                    </div>
                </nav>
            </header>
        );
    }
}

export default HeaderSign;