import React, { Component } from 'react';
import DashBody from './DashBody';
import Footer from './Footer';
import SideNavbar from './SideNavbar';
import TopBar from './TopBar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import BuyPc from './BuyPc';
import BuyPhone from './BuyPhone';
import About from './About';
import NotFound404 from './NotFound404';
import Profile from './Profile';

class Dashboard extends Component {
    render() {
        return (
            <div id="wrapper">
                <SideNavbar />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content" >
                        <TopBar handleLogout={this.props.handleLogout} />
                        <div className="container-fluid mt-0 mb-4" >
                            <Routes>
                                <Route exact path="/" element={<DashBody />} />
                                <Route path="/pc" element={<BuyPc />} />
                                <Route path="/phone" element={<BuyPhone />} />
                                <Route path="/about" element={<About />} />
                                <Route path="/profile" element={<Profile emailAdress={this.props.emailAdress}/>} />
                                <Route path="/*" exact={true} element={<NotFound404 />} />
                            </Routes>
                        </div>
                    </div>
                    <Footer />
                </div>

            </div>
        );
    }
}

export default Dashboard;