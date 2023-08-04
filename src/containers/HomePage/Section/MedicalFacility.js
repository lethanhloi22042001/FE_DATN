import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../HomeHeader";

import Slider from "react-slick";

class MedicalFacility extends Component {
  render() {
    return (
      <div className="section-share section-medical-facility">
      <div className="section-container">
          <div className="section-header">
            <div className="title-section"> Cơ Sở Y Tế Nỗi Bật </div>
            <button className="btn-section">Xem Thêm</button>
          </div>

          <div className="section-body">
            <Slider { ...this.props.settings}>
                        <div className="section-customize" >
                          <div className="bg-img section-medical-facility"></div>
                          <div className="pictureT">Việt Đức</div>
                        </div>
                        <div className="section-customize">
                          <div className="bg-img section-medical-facility"> </div>
                          <div className="pictureT">Thần kinh</div>
                        </div>
                        <div className="section-customize">
                          <div className="bg-img section-medical-facility"> </div>
                          <div className="pictureT">Thần kinh</div>
                        </div>
                        <div className="section-customize">
                          <div className="bg-img section-medical-facility"> </div>
                          <div className="pictureT">Tiêu Hoá</div>
                        </div>
                        <div className="section-customize">
                          <div className="bg-img section-medical-facility"> </div>
                          <div className="pictureT">Tim Mạch</div>
                        </div>
                        <div className="section-customize">
                          <div className="bg-img section-medical-facility"> </div>
                          <div className="pictureT">Tai Mũi Họng</div>
                        </div>
            </Slider>
          </div>

      </div>
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
