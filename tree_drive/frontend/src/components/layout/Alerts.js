import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Alerts extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired
  };
  componentDidUpdate(prevProps) {
    const { error, alert } = this.props;

    if (error != prevProps) {
      if (error.msg.username) {
        alert.error(`Username: ${error.msg.username.join()}`);
      } else if (error.msg.password) {
        alert.error(`Password: ${error.msg.password.join()}`);
      } else if (error.msg.non_field_errors) {
        alert.error(`Login: ${error.msg.non_field_errors.join()}`);
      } else {
        alert.error(`${error.msg}`);
      }
    }
  }

  render() {
    return <Fragment></Fragment>;
  }
}

const mapStateToProps = state => ({
  error: state.errors,
  message: state.messages
});

export default connect(mapStateToProps)(withAlert()(Alerts));
