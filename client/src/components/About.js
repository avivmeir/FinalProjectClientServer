import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as FacebookIcon } from '../app_photos/facebook-icon.svg';
import { ReactComponent as TwitterIcon } from '../app_photos/twitter-icon.svg';
import { ReactComponent as TelegramIcon } from '../app_photos/telegram-icon.svg';

const details = {
    address: "308 Negra Arroyo Lane, Albuquerque, New Mexico. 87104.",
    email: "webshopclientserver@gmail.com",
    website: "https://webshop-client-server.herokuapp.com"
}


class About extends Component {
    render() {
        return (
            <div className="container-fluid float-left ">
                <div className="row">
                    <div className="col text-black float-left ml-2">
                        <h2 className="text-black float-left">About</h2>
                    </div>
                </div>
                <div className="row text-left m-2 mt-4">
                    <div className="col col-lg-3 col-md-4 col-sm-5 "><h5>HQ  Office Adress:</h5></div>
                    <div className="col-9 text-secondary">{details.address}</div>
                </div>
                <div className="row text-left m-2">
                    <div className="col col-lg-3 col-md-4 col-sm-5 "><h5>Email:</h5></div>
                    <Link className="col-9 text-primary" to='#' onClick={(e) => {
                        window.location.href = `mailto:${details.email}`
                        e.preventDefault();
                    }}>
                        {details.email}
                    </Link>

                </div>
                <div className="row text-left m-2">
                    <div className="col col-lg-3 col-md-4 col-sm-5"><h5>Website:</h5></div>
                    <a className="col-9 text-primary" href={details.website}>{details.website}</a>
                </div>
                <div className="row my-5 py-3">
                    <a className="col col-4" href='https://facebook.com' target="_blank" rel="noopener noreferrer">
                        <FacebookIcon />
                    </a>
                    <a className="col col-4" href='https://twitter.com' target="_blank" rel="noopener noreferrer">
                        <TwitterIcon />
                    </a>
                    <a className="col col-4" href='https://web.telegram.org' target="_blank" rel="noopener noreferrer">
                        <TelegramIcon />
                    </a>
                </div>
                <div className="row text-left mt-5">
                    <a href='https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' target="_blank" rel="noopener noreferrer" >
                        {fileLinkSvg()}
                        &nbsp;Privacy Policy
                    </a>
                </div>
                <div className="row text-left float-left mt-2">
                    <a href='https://www.soundczech.cz/temp/lorem-ipsum.pdf' target="_blank" rel="noopener noreferrer">
                        {fileLinkSvg()}
                        &nbsp;Terms of use
                    </a>
                </div>
            </div>
        );
    }
}

export default About;

function fileLinkSvg() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z" />
        <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z" />
    </svg>;
}
