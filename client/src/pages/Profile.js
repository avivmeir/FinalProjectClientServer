import React, { Component } from "react";
import axios from "axios";
import { stringIsNotBlank, stringIsBlank, validName, getPasswordErrors, allPasswordCorrect } from "../utility/Utils"
import PopupMessage from "../components/PopupMessage";
import { ShowPasswordMsg } from "../components/ShowPasswordMsg";

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editMode: false,

      details: {
        firstName: "",
        lastName: "",
        phone: "",
        country: "",
        email: this.props.emailAdress,
        city: "",
        street: "",
        zipCode: ""
      },
      newEmail: this.props.emailAdress,
      initialDetails: {},

      popTitle: '',
      popMsg: [],
      msgStatus: '',

      password: {
        old: "",
        new: "",
        repeat: "",
        errors: []
      }
    };
  }
  componentDidMount() {
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
  onChangeNewEmail = (e) => {
    this.setState({ newEmail: e.target.value });
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
  onChangeNewPassword = (e) => {
    const errs = getPasswordErrors(e.target.value, this.state.password.repeat)
    this.setState(prevState => ({
      password: {
        ...prevState.password,
        new: e.target.value,
        errors: errs
      }
    }))
  }
  onChangeRepeatPassword = (e) => {
    const errs = getPasswordErrors(this.state.password.new, e.target.value)
    this.setState(prevState => ({
      password: {
        ...prevState.password,
        repeat: e.target.value,
        errors: errs
      }
    }))
  }


  handleEditClick = () => {
    this.setState({ editMode: !this.state.editMode });
  };


  updateDetails = (e) => {
    e.preventDefault();
    //user cant erase fields , only update
    if (!this.fieldsAreValid()) {
      return
    }

    if (this.state.newEmail !== this.props.emailAdress) {
      //update with new email
      const user = { newEmail: this.state.newEmail, details: this.state.details }
      axios.put(`/api/profile/updatemail`, user)
        .then((res) => {
          this.setState(prevState => ({
            editMode: false,
            popTitle: 'Successful Update - Updating Email',
            popMsg: [res.data.msg],
            msgStatus: 'info'
          }));
          //this.getUserDetails()
        })
        .catch((AxiosError) => {
          console.log(AxiosError.response);
          this.setState(prevState => ({
            popTitle: 'Error',
            popMsg: [...prevState.popMsg, (AxiosError.response.data.error)],
            msgStatus: 'error'
          }))
        });

    } else {
      //update with no new email
      axios.put(`/api/profile`, this.state.details)
        .then((res) => {
          this.setState(prevState => ({
            editMode: false,
            popTitle: 'Successful Update',
            popMsg: ['The details have been updated successfully'],
            msgStatus: 'success'
          }));
          this.getUserDetails()
        })
        .catch((AxiosError) => {
          console.log(AxiosError.response);
          this.setState(prevState => ({
            popTitle: 'Error',
            popMsg: [(AxiosError.response.data.error)],
            msgStatus: 'error'
          }))
        });
    }

  };

  updatePassword = (e) => {
    e.preventDefault();
    const errorsArr = getPasswordErrors(this.state.password.new, this.state.password.repeat)
    if (!allPasswordCorrect(errorsArr)) {
      this.setState(prevState => ({ password: { ...prevState.password, errors: errorsArr } }))
      return
    }
    const password = {
      email: this.props.emailAdress,
      old: this.state.password.old,
      new: this.state.password.new
    }
    axios
      .put(`/api/profile/changepassword`, password)
      .then((res) => {
        console.log(res)
        this.setState(prevState => ({
          popTitle: 'Update Password',
          popMsg: [res.data.msg],
          password: { ...prevState.password, errors: errorsArr },
          msgStatus: 'success'
        }))
        this.getUserDetails()

      }).catch((AxiosError) => {
        console.log(AxiosError)
        this.setState(prevState => ({
          popTitle: 'Update Password Failed',
          popMsg: [AxiosError.response.data.error],
          password: { ...prevState.password, errors: errorsArr },
          msgStatus: 'error'
        }))
      })

  };

  getUserDetails = () => {
    const userObject = { email: this.props.emailAdress };
    axios.post(`/api/profile`, userObject).then((res) => {
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
        },

      });
      this.setState({ initialDetails: { ...res.data } })
    })
      .catch((AxiosError) => {
        console.log(AxiosError.response);
        this.setState(prevState => ({
          popTitle: 'Error',
          popMsg: [(AxiosError.response.data.error)],
          msgStatus: 'error'

        }))
      });
  };

  fieldsAreValid = () => {
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
      stringIsNotBlank(this.state.newEmail)
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

    this.setState({ popTitle: 'Error', popMsg: errMsg, msgStatus: 'error' })

    return validation
  }




  render() {
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
                      value={this.state.newEmail}
                      onChange={this.onChangeNewEmail}
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
                <form>
                  <div className="col-md-12 mt-4">
                    <label className="labels">Old Password</label>
                    <input
                      type="password"
                      className="form-control"
                      autoComplete="on"
                      value={this.state.password.old}
                      onChange={(e) => {
                        this.setState(prevState => ({
                          password: {
                            ...prevState.password,
                            old: e.target.value
                          }
                        }))
                      }
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
                      onChange={this.onChangeNewPassword}
                      autoComplete="on"
                    />
                  </div>{" "}
                  <br />
                  <div className="col-md-12">
                    <label className="labels">Reapeat Password</label>
                    <input
                      type="password"
                      className="form-control"
                      autoComplete="on"
                      value={this.state.password.repeat}
                      onChange={this.onChangeRepeatPassword}
                    />
                  </div>{" "}
                  <br />
                  <button
                    className="btn btn-primary profile-button"
                    type="button"
                    onClick={this.updatePassword}
                    disabled={!allPasswordCorrect(this.state.password.errors)}
                  >
                    Change Password
                  </button>
                </form>

              </div>

              <div className="col-md-5 mt-5 text-left">
                {
                  this.state.password.errors.length > 0 ?
                    <>
                      {this.state.password.errors.map((item, key) => (
                        <div key={key}>
                          < ShowPasswordMsg
                            match={item.valid}
                            text={item.msg}
                          />
                          <br />
                        </div>
                      ))}
                    </>
                    :
                    null
                }
              </div>
            </div>
          </div>
        </div>
        {
          this.state.popTitle && this.state.popMsg.length > 0 ?

            <PopupMessage
              title={this.state.popTitle}
              body={
                <>
                  {
                    <ul>
                      {this.state.popMsg.map((item, key) => (
                        <li key={key} className="text-black mt-1">{item}</li>
                      ))}
                    </ul>
                  }
                </>
              }
              onClose={() => {
                let emailAdd = this.state.popTitle === 'Error' ? this.state.details.email : this.state.newEmail
                this.setState({ popMsg: '', popTitle: '', msgStatus: '', newEmail: emailAdd })
                this.getUserDetails()
              }}
              closeOnlyWithBtn={this.state.popTitle === 'Successful Update - Updating Email' ?
                true : false}
              status={this.state.msgStatus}

            />
            :
            null
        }
      </div>
    );
  }
}

export default Profile;
