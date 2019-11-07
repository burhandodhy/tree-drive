import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import {updateProfile} from "../../actions/auth"

class Profile extends Component {
  static propTypes = {
    user: PropTypes.object
  };

  state = {
    email: "",
    first_name: "",
    last_name: "",
    address: "",
    city: "",
    country: "",
    zip_code: "",
    id : ""
  };

  componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user) {
      const {
        email,
        first_name,
        last_name,
        address,
        city,
        country,
        zip_code,
        id
      } = this.props.user;

      this.setState({
        email: email,
        first_name: first_name,
        last_name: last_name,
        address: address,
        city: city,
        country: country,
        zip_code: zip_code,
        id:id,
      });
    }
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.updateProfile(this.state);
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <div>
        <h1>Update Profile</h1>
        <form onSubmit={this.onSubmit}>
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
            Update Profile
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps, {updateProfile})(Profile);
