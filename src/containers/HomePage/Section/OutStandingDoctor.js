import React, { Component } from "react";
import { connect } from "react-redux";
// import HomeHeader from "../HomeHeader";
import Slider from "react-slick";

class OutStandingDoctor extends Component {
  render() {
    return (
      <div className="section-share section-outstanding-doctor">
      <div className="section-container">
          <div className="section-header">
            <div className="title-section"> Nỗi Bật </div>
            <button className="btn-section">Xem Thêm</button>
          </div>

          <div className="section-body">
            <Slider { ...this.props.settings}>
                        <div className="section-customize" >
                          <div className="customize-border">
                              <div className="outer-bg">
                                  <div className="bg-img section-outstanding-doctor"></div>
                              </div>
                              <div className="position text-center">
                                  <div className="pictureT">Giáo Sư 1</div>
                                  <div className="pictureT">Việt Đức</div>
                              </div>
                          </div>
                        </div>

                        <div className="section-customize" >
                          <div className="customize-border">
                              <div className="outer-bg">
                                  <div className="bg-img section-outstanding-doctor"></div>
                              </div>
                              <div className="position text-center">
                                  <div className="pictureT">Giáo Sư 1</div>
                                  <div className="pictureT">Việt Đức</div>
                              </div>
                          </div>
                        </div>

                        <div className="section-customize" >
                          <div className="customize-border">
                              <div className="outer-bg">
                                  <div className="bg-img section-outstanding-doctor"></div>
                              </div>
                              <div className="position text-center">
                                  <div className="pictureT">Giáo Sư 1</div>
                                  <div className="pictureT">Việt Đức</div>
                              </div>
                          </div>
                        </div>
                        <div className="section-customize" >
                          <div className="customize-border">
                              <div className="outer-bg">
                                  <div className="bg-img section-outstanding-doctor"></div>
                              </div>
                              <div className="position text-center">
                                  <div className="pictureT">Giáo Sư 1</div>
                                  <div className="pictureT">Việt Đức</div>
                              </div>
                          </div>
                        </div>
                        <div className="section-customize" >
                          <div className="customize-border">
                              <div className="outer-bg">
                                  <div className="bg-img section-outstanding-doctor"></div>
                              </div>
                              <div className="position text-center">
                                  <div className="pictureT">Giáo Sư 1</div>
                                  <div className="pictureT">Việt Đức</div>
                              </div>
                          </div>
                        </div>

                        <div className="section-customize" >
                          <div className="customize-border">
                              <div className="outer-bg">
                                  <div className="bg-img section-outstanding-doctor"></div>
                              </div>
                              <div className="position text-center">
                                  <div className="pictureT">Giáo Sư 1</div>
                                  <div className="pictureT">Việt Đức</div>
                              </div>
                          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
