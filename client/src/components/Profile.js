import React, { Component } from "react";
import { ReactComponent as ErrorSvg } from "../app_photos/error-icon.svg";
import { ReactComponent as CorrectSvg } from "../app_photos/correct-icon.svg";
import axios from "axios";
import { stringIsNotBlank, stringIsBlank, validName } from "../Utils"
import PopupMessage from "./PopupMessage";

function ShowPasswordMsg(props) {
  return props.match ? (
    <div className="text-success">
      <CorrectSvg height="24" width="24" /> {props.text}
    </div>
  ) : (
    <div className="text-danger ">
      <ErrorSvg height="18" width="18" /> {props.text}
    </div>
  );
}
class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstRender: true,
      editMode: false,

      details: {
        firstName: "",
        lastName: "",
        phone: "",
        country: "",
        email: "",
        city: "",
        street: "",
        zipCode: ""
      },
      initialDetails: {},
      fieldsValid: {
        showPopup: false,
        validateChanger: false,
        msg: [],
      },
      password: {
        old: "",
        new: "",
        repeat: "",
      },
      passwordValid: {
        showErrors: false,
        match: true,
        withNumbers: false,
        withChars: false,
      },
    };
  }
  componentDidMount() {
    console.log("mounted")
    this.getUserDetails()
  }

  onChangeFirstName = (e) => {
    this.setState((prevState) => ({
      details: {
        ...prevState.details,
        firstName: e.target.value,
      },
    }));
  };
  onChangeLastName = (e) => {
    this.setState((prevState) => ({
      details: {
        ...prevState.details,
        lastName: e.target.value,
      },
    }));
  };
  onChangePhone = (e) => {
    this.setState((prevState) => ({
      details: {
        ...prevState.details,
        phone: e.target.value,
      },
    }));
  };
  onChangeCountry = (e) => {
    this.setState((prevState) => ({
      details: {
        ...prevState.details,
        country: e.target.value,
      },
    }));
  };
  onChangeEmail = (e) => {
    this.setState((prevState) => ({
      details: {
        ...prevState.details,
        email: e.target.value,
      },
    }));
  };
  onChangeCity = (e) => {
    this.setState((prevState) => ({
      details: {
        ...prevState.details,
        city: e.target.value,
      },
    }));
  };
  onChangeStreet = (e) => {
    this.setState((prevState) => ({
      details: {
        ...prevState.details,
        street: e.target.value,
      },
    }));
  };
  onChangeZipCode = (e) => {
    this.setState((prevState) => ({
      details: {
        ...prevState.details,
        zipCode: e.target.value,
      },
    }));
  };
  handleEditClick = () => {
    this.setState({ editMode: !this.state.editMode });
  };
  updateDetails = (e) => {
    e.preventDefault();
    //user cant erase fields , only update
    if (!this.fieldsAreValid()) {
      return
    }
    axios.put(`/api/dashboard/profile`, this.state.details)
      .then((res) => {
        this.setState(prevState => ({
          editMode: false,
          fieldsValid: {
            ...prevState.fieldsValid,
            showPopup: !this.state.fieldsValid.showPopup,
            validateChanger: true
          }
        }));
        this.getUserDetails()
      })
      .catch((AxiosError) => {
        console.log(AxiosError.response);
        this.setState(prevState => ({
          fieldsValid: {
            ...prevState.fieldsValid,
            showPopup: !this.state.fieldsValid.showPopup,
            msg: [...prevState.fieldsValid.msg, (AxiosError.response.data.error)],
            validateChanger: true
          }
        }))
      });
  };

  updatePassword = (e) => {
    e.preventDefault();
    console.log("update password clicked");
  };
  getUserDetails = () => {
    const userObject = { email: this.props.emailAdress };
    axios.post(`/api/dashboard/profile`, userObject).then((res) => {
      this.setState({
        details: {
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          phone: res.data.phone || "",
          country: res.data.country || "",
          email: this.props.emailAdress,
          city: res.data.city || "",
          street: res.data.street || "",
          zipCode: res.data.zipCode || "",
        }
      });
      this.setState({ initialDetails: { ...res.data } })
    })
      .catch((AxiosError) => {
        console.log(AxiosError.response);
        this.setState(prevState => ({
          fieldsValid: {
            ...prevState.fieldsValid,
            showPopup: !this.state.fieldsValid.showPopup,
            msg: [...prevState.fieldsValid.msg, (AxiosError.response.data.error)],
            validateChanger: true
          }
        }))
      });
  };
  fieldsAreValid() {
    let validFirstName = true
    let validLastName = true
    let errMsg = []
    if (!validName(this.state.details.firstName)) {
      validFirstName = false
      errMsg.push('First Name is not valid')
    }
    if (!validName(this.state.details.lastName)) {
      validLastName = false
      errMsg.push('Last Name is not valid')
    }
    let validUpdate = (
      stringIsNotBlank(this.state.details.email)
      && (stringIsNotBlank(this.state.details.phone) || stringIsBlank(this.state.initialDetails.phone))
      && (stringIsNotBlank(this.state.details.country) || stringIsBlank(this.state.initialDetails.country))
      && (stringIsNotBlank(this.state.details.city) || stringIsBlank(this.state.initialDetails.city))
      && (stringIsNotBlank(this.state.details.street) || stringIsBlank(this.state.initialDetails.street))
      && (stringIsNotBlank(this.state.details.zipCode) || stringIsBlank(this.state.initialDetails.zipCode))
    )
    if (!validUpdate) {
      errMsg.push('You cannot delete the existing data, you can only update it')

    }
    let validation = validFirstName && validLastName && validUpdate

    this.setState(prevState => ({
      fieldsValid: {
        ...prevState.fieldsValid,
        msg: errMsg,
        validateChanger: !validation,
        showPopup: !this.state.fieldsValid.showPopup
      }
    }))

    return validation
  }

  //this is for rerendering the errors popup if needed
  componentDidUpdate() {
    if ((this.state.fieldsValid.validateChanger && !this.state.fieldsValid.showPopup)
      || (!this.state.fieldsValid.validateChanger && this.state.fieldsValid.showPopup))
      this.setState(prevState => ({
        fieldsValid: {
          ...prevState.fieldsValid,
          showPopup: !prevState.fieldsValid.showPopup,
        }
      }))

  }

  render() {
    //  this.getUserDetails();
    return (
      <div className="wrapper">
        <div className="row">
          <div className="col-md-5 border-right">
            <div className="p-3 py-5">
              <span className="h4 text-black">Profile details</span>
              <span className="ml-2">
                <button
                  className="btn btn-secondary btn-sm d-flex "
                  onClick={this.handleEditClick}
                >
                  Edit ✏️
                </button>
              </span>
              <form onSubmit={this.updateDetails}>
                <div className="row mt-4">
                  <div className="col-md-6">
                    <label className="d-flex">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      disabled={!this.state.editMode}
                      value={this.state.details.firstName}
                      onChange={this.onChangeFirstName}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="d-flex">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      disabled={!this.state.editMode}
                      value={this.state.details.lastName}
                      onChange={this.onChangeLastName}
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <label className="d-flex">Phone Number</label>
                    <input
                      type="text"
                      className="form-control"
                      disabled={!this.state.editMode}
                      value={this.state.details.phone}
                      onChange={this.onChangePhone}
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="d-flex">Country</label>
                    <input
                      type="text"
                      className="form-control"
                      disabled={!this.state.editMode}
                      value={this.state.details.country}
                      onChange={this.onChangeCountry}
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="d-flex">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      disabled={!this.state.editMode}
                      value={this.state.details.email}
                      onChange={this.onChangeEmail}
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="d-flex">City</label>
                    <input
                      type="text"
                      className="form-control"
                      disabled={!this.state.editMode}
                      value={this.state.details.city}
                      onChange={this.onChangeCity}
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="d-flex">Street</label>
                    <input
                      type="text"
                      className="form-control"
                      disabled={!this.state.editMode}
                      value={this.state.details.street}
                      onChange={this.onChangeStreet}
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="d-flex">Zip Code</label>
                    <input
                      type="text"
                      className="form-control"
                      disabled={!this.state.editMode}
                      value={this.state.details.zipCode}
                      onChange={this.onChangeZipCode}
                    />
                  </div>
                </div>
                <div className="mt-3 text-center">
                  {
                    this.state.editMode ? (
                      <input
                        className="btn btn-primary profile-button"
                        type="submit"
                        value="Update"
                      />
                    ) : null
                  }
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-7 py-5">
            <h4 className="text-black">Change Password</h4>
            <div className="row">
              <div className="col-md-6">
                <div className="col-md-12 mt-4">
                  <label className="labels">Old Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={this.state.password.old}
                    onChange={(e) =>
                      this.setState({ password: { old: e.target.value } })
                    }
                  />
                </div>{" "}
                <br />
                <div className="col-md-12">
                  <label className="labels">New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={this.state.password.new}
                    onChange={(e) =>
                      this.setState({ password: { new: e.target.value } })
                    }
                  />
                </div>{" "}
                <br />
                <div className="col-md-12">
                  <label className="labels">Reapeat Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={this.state.password.repeat}
                    onChange={(e) =>
                      this.setState({ password: { repeat: e.target.value } })
                    }
                  />
                </div>{" "}
                <br />
                <button
                  className="btn btn-primary profile-button"
                  type="button"
                  onClick={this.updatePassword}
                >
                  Change Password
                </button>
              </div>
              {
                this.state.passwordValid.showErrors ? (
                  <div className="col-md-5 mt-5 text-left">
                    <ShowPasswordMsg
                      match={this.state.passwordValid.match}
                      text="Password must match"
                    />
                    <br />
                    <ShowPasswordMsg
                      match={this.state.passwordValid.withNumbers}
                      text="Password must contain at least one number"
                    />
                    <br />
                    <ShowPasswordMsg
                      match={this.state.passwordValid.withChars}
                      text=" Password must be at least 6 characters long"
                    />
                    <br />
                  </div>
                )
                  :
                  null
              }
            </div>
          </div>
        </div>
        {
          this.state.fieldsValid.showPopup && this.state.fieldsValid.msg.length > 0 ?
            <PopupMessage
              title="Error"
              body={
                <>
                  {
                    <ul>
                      {this.state.fieldsValid.msg.map((item, key) => (
                        <li key={key} className="text-black mt-1">{item}</li>
                      ))}
                    </ul>
                  }
                </>
              }
              onClose={() => {
                this.setState(prevState => ({
                  fieldsValid: {
                    ...prevState.fieldsValid,
                    msg: []
                  }
                }))
              }}
            />
            :
            this.state.fieldsValid.showPopup ?
              <PopupMessage
                title="Successful Update"
                body={
                  <div className="text-black">The details have been updated successfully</div>
                }
                onClose={() => {
                  this.setState(prevState => ({
                    fieldsValid: {
                      ...prevState.fieldsValid,
                      msg: []
                    }
                  }))
                }}
              />
              :
              null
        }
      </div>
    );
  }
}

export default Profile;
