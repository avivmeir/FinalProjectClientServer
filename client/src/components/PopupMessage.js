import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Link } from "react-router-dom";
import { ReactComponent as ErrorSvg } from "../app_photos/pop-error.svg";
import { ReactComponent as SuccessSvg } from "../app_photos/pop-success.svg";
import { ReactComponent as InfoSvg } from "../app_photos/pop-info.svg";

class PopupMessage extends Component {

    state = {
        navigate: false
    }
    getIcon = () => {
        if (!this.props.status) {
            return null
        }
        switch (this.props.status) {
            case 'success':
                return (
                    <div className="col-lg-1 mx-auto d-none d-lg-block  float-right ">
                        <SuccessSvg width="48" height="48" />
                    </div>
                )
                break;
            case 'error':
                return (
                    <div className="col-lg-1 mx-auto d-none d-lg-block  float-right ">
                        <ErrorSvg width="48" height="48" />
                    </div>
                )
            case 'info':
                return (
                    <div className="col-lg-1 mx-auto d-none d-lg-block  float-right ">
                        <InfoSvg width="48" height="48" />
                    </div>
                )
            default:
                return null;
        }
    }

    render() {
        return (
            <Popup
                trigger={<div />}
                modal
                open={true}
                closeOnDocumentClick={!this.props.closeOnlyWithBtn}
                onClose={() => {
                    if (this.props.onClose)
                        this.props.onClose()
                }}
            >

                {close => (
                    <div className="p-0 m-0" id="exampleModal" tableindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-lg m-0 p-0">
                            <div className="modal-content  m-0 p-0">
                                <div className="modal-header">
                                    <h5 className="modal-title text-black" id="exampleModalLabel">{this.props.title}</h5>
                                    <button className="btn-close" onClick={close} data-bs-dismiss="modal" aria-label="Close" />
                                </div>
                                <div className="modal-body">
                                    <div className="row align-items-center">
                                        <div className="col-lg-10 ">
                                            {this.props.body}
                                        </div>
                                        {
                                            this.getIcon()
                                        }

                                    </div>
                                </div>
                                <div className="modal-footer">
                                    {
                                        this.props.withOk ?
                                            <Link to={this.props.navigateTo} className="btn btn-primary">{this.props.okBtnText}</Link>
                                            :
                                            null
                                    }
                                    {
                                        this.props.withClose ?
                                            <Link to={this.props.navigateTo} className="btn btn-primary">{this.props.closeBtnText}</Link>
                                            :
                                            null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                )}
            </Popup>
        )
    }
}

export default PopupMessage;