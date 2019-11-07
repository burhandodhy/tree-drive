import React, { Component } from "react";
import { userRegistration } from "../../actions/auth";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    repeat_password: "",
    first_name: "",
    last_name: "",
    address: "",
    city: "",
    country: "",
    zip_code: ""
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.userRegistration(this.state);
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              placeholder="Enter Username"
              value={this.state.username}
              onChange={this.onChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.onChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.onChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Repeat Password</label>
            <input
              type="password"
              className="form-control"
              name="repeat_password"
              placeholder="Repeat Password"
              value={this.state.repeat_password}
              onChange={this.onChange}
              required
            />
          </div>
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              className="form-control"
              name="first_name"
              placeholder="First Name"
              value={this.state.first_name}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              className="form-control"
              name="last_name"
              placeholder="Last Name"
              value={this.state.last_name}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              className="form-control"
              name="address"
              placeholder="Address"
              value={this.state.address}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              className="form-control"
              name="city"
              placeholder="city"
              value={this.state.city}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label>County</label>
            <input
              type="text"
              className="form-control"
              name="country"
              placeholder="Country"
              value={this.state.country}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label>Zip Code</label>
            <input
              type="text"
              className="form-control"
              name="zip_code"
              placeholder="Zip Code"
              value={this.state.zip_code}
              onChange={this.onChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(
  mapStateToProps,
  { userRegistration }
)(Register);
