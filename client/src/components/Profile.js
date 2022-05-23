import React, { Component } from 'react';
import { ReactComponent as ErrorSvg } from '../app_photos/error-icon.svg';
import { ReactComponent as CorrectSvg } from '../app_photos/correct-icon.svg';

class Profile extends Component {
    state = {
        editMode: false,
        details: {
            firstName: 'first',
            lastName: 'last',
            phone: '0524453933',
            country: 'IL',
            email: this.props.emailAdress,
            city: 'ka',
            street: 'aw',
            zipCode: '11'
        },
        password: {
            old: '', new: '', repeat: ''
        },
        passwordValid: {
            match: true,
            withNumbers: false,
            withChars: false
        }
    }
    onChangeFirstName = (e) => {
        this.setState({
            details: {
                firstName: e.target.value,
                lastName: this.state.details.lastName,
                phone: this.state.details.phone,
                country: this.state.details.country,
                email: this.state.details.email,
                city: this.state.details.city,
                street: this.state.details.street,
                zipCode: this.state.details.zipCode
            }
        })
    }
    onChangeLastName = (e) => {
        this.setState({
            details: {
                firstName: this.state.details.firstName,
                lastName: e.target.value,
                phone: this.state.details.phone,
                country: this.state.details.country,
                email: this.state.details.email,
                city: this.state.details.city,
                street: this.state.details.street,
                zipCode: this.state.details.zipCode
            }
        })
    }
    onChangePhone = (e) => {
        this.setState({
            details: {
                firstName: this.state.details.firstName,
                lastName: this.state.details.lastName,
                phone: e.target.value,
                country: this.state.details.country,
                email: this.state.details.email,
                city: this.state.details.city,
                street: this.state.details.street,
                zipCode: this.state.details.zipCode
            }
        })
    }
    onChangeCountry = (e) => {
        this.setState({
            details: {
                firstName: this.state.details.firstName,
                lastName: this.state.details.lastName,
                phone: this.state.details.phone,
                country: e.target.value,
                email: this.state.details.email,
                city: this.state.details.city,
                street: this.state.details.street,
                zipCode: this.state.details.zipCode
            }
        })
    }
    onChangeEmail = (e) => {
        this.setState({
            details: {
                firstName: this.state.details.firstName,
                lastName: this.state.details.lastName,
                phone: this.state.details.phone,
                country: this.state.details.country,
                email: e.target.value,
                city: this.state.details.city,
                street: this.state.details.street,
                zipCode: this.state.details.zipCode
            }
        })
    }
    onChangeCity = (e) => {
        this.setState({
            details: {
                firstName: this.state.details.firstName,
                lastName: this.state.details.lastName,
                phone: this.state.details.phone,
                country: this.state.details.country,
                email: this.state.details.email,
                city: e.target.value,
                street: this.state.details.street,
                zipCode: this.state.details.zipCode
            }
        })
    }
    onChangeStreet = (e) => {
        this.setState({
            details: {
                firstName: this.state.details.firstName,
                lastName: this.state.details.lastName,
                phone: this.state.details.phone,
                country: this.state.details.country,
                email: this.state.details.email,
                city: this.state.details.city,
                street: e.target.value,
                zipCode: this.state.details.zipCode
            }
        })
    }
    onChangeZipCode = (e) => {
        this.setState({
            details: {
                firstName: this.state.details.firstName,
                lastName: this.state.details.lastName,
                phone: this.state.details.phone,
                country: this.state.details.country,
                email: this.state.details.email,
                city: this.state.details.city,
                street: this.state.details.street,
                zipCode: e.target.value
            }
        })
    }
    handleEditClick = () => {
        this.setState({ editMode: !this.state.editMode })
    }
    onSubmit = (e) => {
        e.preventDefault();
        console.log("submit clicked")
    }
    updateDetails = (e) => {
        e.preventDefault();
        console.log("update details clicked")
    }
    updatePassword = (e) => {
        e.preventDefault();
        console.log("update password clicked")
    }
    getUserDetails = () => {
        //get details by email
        console.log("get user details")
    }
    render() {
        this.getUserDetails()
        return (
            <div className="wrapper">
                <div className="row">
                    <div className="col-md-6 border-right">
                        <div className="p-3 py-5">
                            <span className="h4 text-black">Profile details</span>
                            <span className="ml-2">
                                <button className="btn btn-secondary btn-sm d-flex " onClick={this.handleEditClick}>
                                    Edit ✏️
                                </button>
                            </span>
                            <form onSubmit={this.updateDetails}>

                                <div className="row mt-4">
                                    <div className="col-md-6">
                                        <label className="d-flex">First Name</label>
                                        <input type="text" className="form-control" disabled={!this.state.editMode} value={this.state.details.firstName} onChange={this.onChangeFirstName} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="d-flex">Last Name</label>
                                        <input type="text" className="form-control" disabled={!this.state.editMode} value={this.state.details.lastName} onChange={this.onChangeLastName} />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-12"><label className="d-flex">Phone Number</label>
                                        <input type="text" className="form-control" disabled={!this.state.editMode} value={this.state.details.phone} onChange={this.onChangePhone} />
                                    </div>
                                    <div className="col-md-12"><label className="d-flex">Country</label>
                                        <input type="text" className="form-control" disabled={!this.state.editMode} value={this.state.details.country} onChange={this.onChangeCountry} />
                                    </div>
                                    <div className="col-md-12"><label className="d-flex">Email</label>
                                        <input type="text" className="form-control" disabled={!this.state.editMode} value={this.state.details.email} onChange={this.onChangeEmail} />
                                    </div>
                                    <div className="col-md-12"><label className="d-flex">City</label>
                                        <input type="text" className="form-control" disabled={!this.state.editMode} value={this.state.details.city} onChange={this.onChangeCity} />
                                    </div>
                                    <div className="col-md-12"><label className="d-flex">Street</label>
                                        <input type="text" className="form-control" disabled={!this.state.editMode} value={this.state.details.street} onChange={this.onChangeStreet} />
                                    </div>
                                    <div className="col-md-12"><label className="d-flex">Zip Code</label>
                                        <input type="text" className="form-control" disabled={!this.state.editMode} value={this.state.details.zipCode} onChange={this.onChangeZipCode} />
                                    </div>
                                </div>
                                <div className="mt-3 text-center">
                                    {
                                        this.state.editMode ?
                                            <input className="btn btn-primary profile-button" type="submit" value="Update" />
                                            :
                                            null
                                    }
                                </div>
                            </form>

                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="p-3 py-5">
                            <h4 className="text-black">Change Password</h4>
                            <div className="col-md-12 mt-4">
                                <label className="labels">Old Password</label>
                                <input type="password" className="form-control" value={this.state.password.old} onChange={(e) => this.setState({ password: { old: e.target.value } })} />
                            </div> <br />
                            <div className="col-md-12">
                                <label className="labels" >New Password</label>
                                <input type="password" className="form-control" value={this.state.password.new} onChange={(e) => this.setState({ password: { new: e.target.value } })} />
                            </div> <br />
                            <div className="col-md-12">
                                <label className="labels">Reapeat Password</label>
                                <input type="password" className="form-control" value={this.state.password.repeat} onChange={(e) => this.setState({ password: { repeat: e.target.value } })} />
                            </div> <br />
                            <button className="btn btn-secondary profile-button" type="button" onClick={this.updatePassword}>Change Password</button>
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