import React, { Component } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import Reaptcha from 'reaptcha';
import AppConfig from "../App.config";
import Axios from "axios";

const grecaptchaObject = window.grecaptcha // You must provide access to the google grecaptcha object.

class RecaptchaWrapper extends Component {
    captcha = null
    state = {
        captchaReady: false
    }
    onLoad = () => {
        if (!this.state.captchaReady) {
            this.captcha.renderExplicitly()

            this.setState({
                captchaReady: true
            });
        }
    };

    onVerify = recaptchaResponse => {
        let token = { token: recaptchaResponse }
        // send value token to server for verigying
        Axios.post("/api/recaptcha", token)
            .then((res) => {
                console.log(res.data);
                this.props.afterVerify(true, res.data)
            })
            .catch((error) => {
                console.log(error);
                this.props.afterVerify(false, error)
            });
    };
    render() {
        return (
            <Reaptcha
                ref={r => (this.captcha = r)}
                sitekey={AppConfig.GOOGLE.SiteKey}
                onLoad={this.onLoad}
                onVerify={this.onVerify}
                onExpire={()=>this.props.afterVerify(false, "expired")}
                explicit
            />

            // <ReCAPTCHA
            //     ref={r => (this.captcha = r)}
            //     sitekey={AppConfig.GOOGLE.SiteKey}
            //     grecaptcha={grecaptchaObject}
            //     onChange={this.onVerify}
            // />
        );
    }
}

export default RecaptchaWrapper;
