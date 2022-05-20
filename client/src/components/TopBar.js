import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { ReactComponent as UserSvg } from '../app_photos/user-icon.svg';
import { ReactComponent as ProfileSvg } from '../app_photos/profile-icon.svg';
import { ReactComponent as AboutSvg } from '../app_photos/about-icon.svg';
import { ReactComponent as LogoutSvg } from '../app_photos/logout-icon.svg';

import { Link } from 'react-router-dom';

class TopBar extends Component {
    onLogout = ()=>{
        console.log("logout")
        this.props.handleLogout()
    }
    render() {
        return (
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
                                       <ProfileSvg width ="12" height="12"/>&nbsp; Profile
                                    </Dropdown.Item>
                                    <Dropdown.Item as={Link} to="/dashboard/about">
                                       <AboutSvg width ="12" height="12"  />&nbsp; About
                                    </Dropdown.Item >
                                    <Dropdown.Item onClick={this.onLogout}>
                                      <LogoutSvg width ="12" height="12" />&nbsp; Logout
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>

                    </ul>

                </nav>
        );
    }
}

export default TopBar;