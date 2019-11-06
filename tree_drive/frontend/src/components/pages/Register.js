import React, { Component } from 'react'
import axios from 'axios'
import { getCookie } from '../../helper/utils'


class Register extends Component {

  state = {
    username : '',
    email : '',
    password : '',
    repeat_password : '',
    first_name : '',
    last_name : '',
    address : '',
    city : '',
    country : '',
    zip_code : '',
    error_message: [],
    userdata : {},
  }

  onSubmit = e => {
    e.preventDefault();

    if( this.state.password != this.state.repeat_password ){
      
      let error_message = [];
      error_message.push({ 'invalid_password': "Password didn't match" })
      this.setState({ 'error_message': error_message })
      return
    }

    const request = axios.create({
      headers: { 'X-CSRFToken': getCookie('csrftoken') }
    });

    request.post('/api/user/', {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      address: this.state.address,
      city: this.state.city,
      country: this.state.country,
      zip_code: this.state.zip_code,
    })
      .then((response) => {
        this.setState({ userdata: response.data })
      })
      .catch((error) => {
        error = Object.keys(error.response.data).map( (key, index) => {     
          return { [key] : error.response.data[key][0] } 
        });

        this.setState({ error_message: error})
        
      });

  };


  onChange = e => this.setState({ [e.target.name]: e.target.value });


  render() {

    if (Object.entries(this.state.userdata).length === 0) {
      var error = this.state.error_message.map((value, index) => {
        return <div className="alert alert-danger" key={index} >{Object.values(value)[0]}</div>
      });

      return (
        <div>
          <h1>Register</h1>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input type="text" className="form-control" name="username" placeholder="Enter Username" value={this.state.username} onChange={this.onChange} required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" className="form-control" name="email" placeholder="Email" value={this.state.email} onChange={this.onChange} required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" name="password" placeholder="Password" value={this.state.password} onChange={this.onChange} required />
            </div>
            <div className="form-group">
              <label>Repeat Password</label>
              <input type="password" className="form-control" name="repeat_password" placeholder="Repeat Password" value={this.state.repeat_password} onChange={this.onChange} required />
            </div>
            <div className="form-group">
              <label>First Name</label>
              <input type="text" className="form-control" name="first_name" placeholder="First Name" value={this.state.first_name} onChange={this.onChange} />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input type="text" className="form-control" name="last_name" placeholder="Last Name" value={this.state.last_name} onChange={this.onChange} />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input type="text" className="form-control" name="address" placeholder="Address" value={this.state.address} onChange={this.onChange} />
            </div>
            <div className="form-group">
              <label>City</label>
              <input type="text" className="form-control" name="city" placeholder="city" value={this.state.city} onChange={this.onChange} />
            </div>
            <div className="form-group">
              <label>County</label>
              <input type="text" className="form-control" name="country" placeholder="Country" value={this.state.country} onChange={this.onChange} />
            </div>
            <div className="form-group">
              <label>Zip Code</label>
              <input type="text" className="form-control" name="zip_code" placeholder="Zip Code" value={this.state.zip_code} onChange={this.onChange} />
            </div>
            {error}
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      )
    } else {
      return(
        <div>
          <h1>Registration Successfully.</h1>
        </div>
      )

    }

  }
}

export default Register
