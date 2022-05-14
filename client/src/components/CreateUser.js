import React, { Component } from 'react';
import axios from 'axios';

class CreateUser extends Component {
    state = {
        name: '',
        email: ''
      }
      onChangeUserName = (e) => {
          this.setState({ name: e.target.value })
      }
      onChangeUserEmail = (e)=> {
          this.setState({ email: e.target.value })
      }
      onSubmit = (e) => {
          e.preventDefault()
          const userObject = {
              name: this.state.name,
              email: this.state.email
          };
        
          axios.post("/api/users/save", userObject)
              .then((res) => {
                  console.log(res.data)
              }).catch((error) => {
                  console.log(error)
              });
          this.setState({ name: '', email: '' })
      }
    
    render() {
        return (
            <div className="wrapper">
                <div className="container col-4">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Add User Name</label>
                            <input type="text" value={this.state.name} onChange={this.onChangeUserName} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Add User Email</label>
                            <input type="text" value={this.state.email} onChange={this.onChangeUserEmail} className="form-control" />
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Create User" className="btn btn-success btn-block" />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default CreateUser;