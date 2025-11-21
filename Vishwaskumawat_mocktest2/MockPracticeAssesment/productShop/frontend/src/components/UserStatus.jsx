// question 3

//React Class Component, Lifecycle, PropTypes, Styling 


import React, { Component } from "react";
import PropTypes from "prop-types";
import "../styles/userStatus.css";

class UserStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "Fetching user status.",
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ status: "Active User" });
    }, 2000);
  }

  render() {
    return (
      <div className="userBox">
        <p>User ID: {this.props.userId}</p>
        <h3>Status: {this.state.status}</h3>
      </div>
    );
  }
}

UserStatus.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default UserStatus;
