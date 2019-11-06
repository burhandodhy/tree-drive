import React, { Component } from 'react'
import axios from 'axios'
import { getCookie } from '../../helper/utils'

class Login extends Component {

  state = {
    username: '',
    password: '',
    error_message: '',
    userdata: {},
  }


  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();

    const request = axios.create({
      headers: { 'X-CSRFToken': getCookie('csrftoken') }
    });

    request.post('/api/login/', {
      username: this.state.username,
      password: this.state.password
    })
      .then((response) => {
        localStorage.setItem("userdata", JSON.stringify(response.data.user));
        this.setState({ userdata: response.data.user})
      })
      .catch((error) => {
        this.setState({ error_message: 'Invalid Username or Password' })
      });

  };

  render() {
    
  
    
    if (Object.entries(this.state.userdata).length === 0  ) {
      return (
        <div>
          <h1>Login</h1>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input type="text" className="form-control" name="username" placeholder="Enter Username" value={this.state.username} onChange={this.onChange} />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" name="password" placeholder="Password" value={this.state.password} onChange={this.onChange} />
            </div>
            <div>{this.state.error_message}</div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      )
    } else {
      return (
        <div>
          Welcome {this.state.userdata.username}
        </div>
      )
    }
    


  }
}
export default Login
