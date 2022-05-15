import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { ReactComponent as UserSvg } from '../app_photos/user-icon.svg';

const userLogo = require('../app_photos/icons8-user-48.png');

class TopBar extends Component {
    onLogout = ()=>{
        console.log("logout")
        this.props.handleLogout()
    }
    render() {
        return (
            <div id="content" >
                <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow" >
                    <ul className="navbar-nav ml-auto">
                    <div className="topbar-divider d-none d-sm-block"/>
                        <div className="mr-20 text-gray-600 small">
                            <Dropdown>
                                <Dropdown.Toggle variant="transparent">
                                    User Name 	&nbsp;	&nbsp;
                                    <UserSvg width ="48" height="48" />
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item href="#">
                                        Profile
                                    </Dropdown.Item>
                                    <Dropdown.Item href="#">
                                        About
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={this.onLogout}>
                                        Logout
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>

                    </ul>

                </nav>
            </div>
        );
    }
}

export default TopBar;