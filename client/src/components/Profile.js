import React, { Component } from 'react';
import { ReactComponent as ErrorSvg } from '../app_photos/error-icon.svg';
import { ReactComponent as CorrectSvg } from '../app_photos/correct-icon.svg';

class Profile extends Component {
    state = {
        editMode: false,

        passwordValid: {
            match: true,
            withNumbers: false,
            withChars: false
        }
    }
    handleEditClick = () => {
        this.setState({ editMode: !this.state.editMode })
    }
    onSubmit = (e) => {
        e.preventDefault();
        console.log("submit clicked")
    }
    updateDetails = () => {
        console.log("update clicked")

    }
    render() {
        return (
            <div className="wrapper">
                    <h4 >Profile details</h4>
                <div class="row">
                    <div className="col-md-6 border-right">
                        <div className="p-3 py-5">
                            <div className="row mt-2">
                                <div className="col-md-6"><label className="labels">First Name</label><input type="text" className="form-control" placeholder="first name" value="" /></div>
                                <div className="col-md-6"><label className="labels">Last Name</label><input type="text" className="form-control" value="" placeholder="surname" /></div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-12"><label className="labels">Phone Number</label><input type="text" className="form-control" placeholder="enter phone number" value="" /></div>
                                <div className="col-md-12"><label className="labels">Country</label><input type="text" className="form-control" placeholder="enter address line 1" value="" /></div>
                                <div className="col-md-12"><label className="labels">Email</label><input type="text" className="form-control" placeholder="enter address line 2" value="" /></div>
                                <div className="col-md-12"><label className="labels">City</label><input type="text" className="form-control" placeholder="enter address line 2" value="" /></div>
                                <div className="col-md-12"><label className="labels">Street</label><input type="text" className="form-control" placeholder="enter address line 2" value="" /></div>
                                <div className="col-md-12"><label className="labels">Zip Code</label><input type="text" className="form-control" placeholder="enter address line 2" value="" /></div>
                            </div>
                            <div className="mt-5 text-center"><button className="btn btn-primary profile-button" type="button">Save Profile</button></div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="p-3 py-5">
                            <div class="d-flex justify-content-between align-items-center experience"><span>Edit Experience</span><span class="border px-3 p-1 add-experience"><i class="fa fa-plus"></i>&nbsp;Experience</span></div><br />
                            <div class="col-md-12"><label class="labels">Experience in Designing</label><input type="text" class="form-control" placeholder="experience" value="" /></div> <br />
                            <div class="col-md-12"><label class="labels">Additional Details</label><input type="text" class="form-control" placeholder="additional details" value="" /></div>
                        </div>
                    </div>
                </div>
            </div>

            // <div classNameName="wrapper">
            //     <h3 classNameName="text-black">Profile details</h3>
            //     <button classNameName="btn btn-secondary btn-sm d-flex mx-2" onClick={this.handleEditClick}>
            //         Edit ✏️
            //     </button>
            //     <div classNameName="row mt-3 ">
            //         <div classNameName="col-3">
            //             First Name
            //         </div>

            //         <div classNameName="col-3">
            //             Last Name
            //         </div>
            //         <div classNameName="col-3">
            //             Phone Number
            //         </div>
            //         <div classNameName="col-3">
            //             Country
            //         </div>
            //     </div>
            //     <div classNameName="row mt-2">

            //         <div classNameName="col-3">
            //             <input type="text" placeholder="Last Name" disabled={!this.state.editMode} />
            //         </div>
            //         <div classNameName="col-3">
            //             <input type="tel" placeholder="" disabled={!this.state.editMode} pattern="[0][5][0-9]{8}" />
            //         </div>
            //         <div classNameName="col-3">
            //             <input type="text" placeholder="Country" disabled={!this.state.editMode} />
            //         </div>
            //     </div>
            //     {
            //         this.state.editMode ?
            //             <button classNameName="btn btn-primary mt-4" onClick={this.updateDetails}>Update</button>
            //             :
            //             null
            //     }
            //     <hr />
            //     <div classNameName="row">
            //         <h5 classNameName="text-black">Change password</h5>
            //     </div>
            //     <div classNameName="row">
            //         <div classNameName="col-6 mt-5">
            //             <form classNameName="user" onSubmit={this.onSubmit}>
            //                 <div classNameName="form-group">
            //                     <div classNameName="row">
            //                         <input type="password" placeholder="Old Password" />
            //                     </div>
            //                 </div>
            //                 <div classNameName="form-group">
            //                     <div classNameName="row">
            //                         <input type="password" placeholder="New Password" />
            //                     </div>
            //                 </div>
            //                 <div classNameName="form-group">
            //                     <div classNameName="row">
            //                         <input type="password" placeholder="Repeat Password" />
            //                     </div>
            //                 </div>
            //                 <div classNameName="form-group">
            //                     <div classNameName="row">
            //                         <input type="submit" value="Change passowrd" classNameName="btn btn-primary " />
            //                     </div>
            //                 </div>
            //             </form>
            //         </div>
            //         <div classNameName="col-6 mt-5 text-left">
            //             <div classNameName="row  ">
            //                 {
            //                     this.state.passwordValid.match ?
            //                         <div classNameName="text-success">
            //                             <CorrectSvg height="24" width="24" text-success /> Password must match
            //                         </div>
            //                         :
            //                         <div classNameName="text-danger">
            //                             <ErrorSvg height="24" width="24" /> Password must match
            //                         </div>
            //                 }
            //             </div>
            //             <div classNameName="row mt-3">
            //                 {
            //                     this.state.passwordValid.withNumbers ?
            //                         <div classNameName="text-success">
            //                             <CorrectSvg height="24" width="24" text-success /> Password must contain at least one number
            //                         </div>
            //                         :
            //                         <div classNameName="text-danger">
            //                             <ErrorSvg height="24" width="24" /> Password must contain at least one number
            //                         </div>
            //                 }
            //             </div>
            //             <div classNameName="row mt-3">
            //                 {
            //                     this.state.passwordValid.withChars ?
            //                         <div classNameName="text-success">
            //                             <CorrectSvg height="24" width="24" text-success /> Password must contain at least one number
            //                         </div>
            //                         :
            //                         <div classNameName="text-danger">
            //                             <ErrorSvg height="24" width="24" /> Password must contain at least 6 characters long
            //                         </div>
            //                 }
            //             </div>

            //         </div>



            //     </div>




            // </div>
        );
    }
}

export default Profile;