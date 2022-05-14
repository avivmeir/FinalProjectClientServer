import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
const userLogo = require('../app_photos/icons8-user-48.png');

class TopBar extends Component {
    render() {
        return (
            <div id="content-wrapper" >

                <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow" >
                    <ul className="navbar-nav ml-auto">

                        <div className="topbar-divider d-none d-sm-block"/>
                        <div className="mr-2 text-gray-600 small">
                            <Dropdown>
                                <Dropdown.Toggle variant="transparent">
                                    User Name
                                    <img className="img-profile rounded-circle" src={userLogo} />

                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item href="#">
                                        Home Page
                                    </Dropdown.Item>
                                    <Dropdown.Item href="#">
                                        Settings
                                    </Dropdown.Item>
                                    <Dropdown.Item href="#">
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