import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class HeaderSign extends Component {
    render() {
        return (
                <header>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-gradient-primary">
                        <a className="navbar-brand mx-2">Webshop | </a>
                        <div
                            className="collapse navbar-collapse"
                            id="navbarSupportedContent"
                        >
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item active">
                                    <Link className="nav-link" to={'/sign-up'}>
                                        Create Account
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={'/sign-in'}>
                                        Login
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </header>
        );
    }
}

export default HeaderSign;