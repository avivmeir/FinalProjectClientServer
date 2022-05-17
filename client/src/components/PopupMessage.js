import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

class PopupMessage extends Component {


    render() {
        return (
            <Popup
                trigger={<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Launch demo modal popup
                </button>}
                modal
            >

                {close => (
                    <div class="p-0" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-lg m-0 p-0">
                            <div className="modal-content  m-0 p-0">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">{this.props.title}</h5>
                                    <button className="btn-close" onClick={close} data-bs-dismiss="modal" aria-label="Close"/>
                                </div>
                                <div className="modal-body">
                                    {this.props.body}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary">Save changes</button>
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