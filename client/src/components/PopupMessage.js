import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Link } from "react-router-dom";


class PopupMessage extends Component {

    state = {
        navigate: false
    }

    render() {
        return (
            <Popup
                trigger={<div />}
                modal
                open={true}
                closeOnDocumentClick={!this.props.closeOnlyWithBtn}
                onClose={() => {
                    if(this.props.onClose )
                        this.props.onClose()
                }}
            >

                {close => (
                    <div className="p-0" id="exampleModal" tableindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-lg m-0 p-0">
                            <div className="modal-content  m-0 p-0">
                                <div className="modal-header">
                                    <h5 className="modal-title text-black" id="exampleModalLabel">{this.props.title}</h5>
                                    <button className="btn-close" onClick={close} data-bs-dismiss="modal" aria-label="Close" />
                                </div>
                                <div className="modal-body">
                                    {this.props.body}
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