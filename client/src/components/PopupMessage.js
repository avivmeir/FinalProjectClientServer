import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

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
            >

                {close => (
                    <div className="p-0" id="exampleModal" tableindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-lg m-0 p-0">
                            <div className="modal-content  m-0 p-0">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">{this.props.title}</h5>
                                    <button className="btn-close" onClick={close} data-bs-dismiss="modal" aria-label="Close" />
                                </div>
                                <div className="modal-body">
                                    {this.props.body}
                                </div>
                                <div className="modal-footer">
                                    {
                                        this.props.withOk ?
                                            <button type="button" onClick={() => { this.setState({ navigate: true }) }} className="btn btn-primary">{this.props.okBtnText}</button>
                                            :
                                            null
                                    }
                                    {
                                        this.props.withClose ?
                                            <button type="button" onClick={() => { this.props.onClose() }} className="btn btn-secondary" data-bs-dismiss="modal">{this.props.closeBtnText}</button>
                                            :
                                            null
                                    }
                                    {
                                        this.state.navigate ? 
                                        <Navigate to ={this.props.navigateTo}/> : null
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