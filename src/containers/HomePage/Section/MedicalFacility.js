import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../HomeHeader";
import "./MedicalFacility.scss";

class MedicalFacility extends Component {
  render() {
    return (
      <div style={{ height: "300px", background: "yellow" }}>
        MedicalFacility
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
