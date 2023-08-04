import React, { Component } from "react";
import { connect } from "react-redux";
import './HomePage.scss'

class HomeFooter extends Component { 
  render() {
    return (
      <div className="home-footer" style={{  height: '150px' }}>
                <p>&copy; 2023 Lê Thanh Lợi <a href="">Xem Thêm Thông Tin</a></p>
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
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
