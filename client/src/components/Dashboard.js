import React, { Component } from 'react';
import DashBody from './DashBody';
import Footer from './Footer';
import SideNavbar from './SideNavbar';
import TopBar from './TopBar';

class Dashboard extends Component {
    render() {
        return (
            <div id="wrapper">
                <SideNavbar/>
                <div id="content-wrapper" className="d-flex flex-column">
                    <TopBar  handleLogout = {this.props.handleLogout} />
                    <div className="container-fluid mt-0 mb-4" >
                        <DashBody />
                    </div>
                    <Footer/>
                </div>

            </div>
        );
    }
}

export default Dashboard;