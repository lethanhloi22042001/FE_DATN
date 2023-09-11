import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl"; // Thư viện : international language (react-intl)
import { LANGUAGES } from "../../utils/constant";
import { changeLanguageApp } from "../../store/actions";
import { withRouter } from "react-router";

class HomeHeader extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  handleReturnHome = ()=>{
    this.props.history.push(`/home`);
  }
  render() {
    return (
      <React.Fragment>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i className="fas fa-bars"></i>
              <img onClick={ ()=>{this.handleReturnHome()}}
                className="left-content_img"
                src="https://bookingcare.vn/assets/icon/bookingcare-2020.svg"
                alt="example"
              />
            </div>

            <div className="center-content">
              <div className="child-content">
                <div>
                  <b>
                    {" "}
                    <FormattedMessage id="homeheader.speciality" />{" "}
                  </b>
                </div>
                <div>Tìm bác sĩ theo chuyên khoa</div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    {" "}
                    <FormattedMessage id="homeheader.health-facility" />{" "}
                  </b>
                </div>
                <div> Chọn bệnh viện phòng khám</div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.doctor1" />
                  </b>
                </div>
                <div> Chọn bác sĩ giỏi</div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.medical-package" />
                  </b>
                </div>
                <div>Khám sức khỏe tổng quát</div>
              </div>
            </div>
            <div className="right-content">
              <div className="asd">
                <div className="btn-right-content">
                  <i className="fas fa-question"></i>
                </div>
                <div className="">Hỗ trợ</div>
              </div>
              <div className="language-vi">
                <span
                  onClick={(event) => {
                    this.changeLanguage(LANGUAGES.VI);
                  }}
                >
                  VN
                </span>
              </div>
              <div className="language-en">
                <span
                  onClick={(event) => {
                    this.changeLanguage(LANGUAGES.EN);
                  }}
                >
                  EN
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* {Space Fragment} */}
                  
        {this.props.isShowBanner === true &&
          <div className="home-header-banner">
            <div className="content-up">
              <div className="title">
                <div className="title-text">
                  <b>
                    <FormattedMessage id="banner.title1" />
                  </b>
                </div>
                <div className="title-text">
                  <b>
                    <FormattedMessage id="banner.title2" />
                  </b>
                </div>
              </div>

              <div className="search">
                <div className="search-content">
                  <i className="fas fa-search"></i>
                  <input type="text" placeholder="Tìm chuyên khoa khám bệnh" />
                </div>
              </div>
            </div>
            {/* Line */}

            <div className="content-down">
              <div className="options">
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-hospital"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.bannerp1" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-procedures"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.bannerp2" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-hospital"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.bannerp3" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-microscope"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.bannerp4" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-user-md"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.bannerp5" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-tooth"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.bannerp6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  // hàm này dùng để ánh xạ actioncreator changeLanguageApp vào prop
  return {
    // nhờ dispatch để gữi action có tên changeLanguageApp đến ReduxStore
    changeLanguageAppRedux: (language) => {
      dispatch(changeLanguageApp(language));
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
//Trong Redux, dispatch là một hàm được cung cấp bởi Redux store để gửi các action đến các reducers.
// Hàm dispatch nhận vào một action là một đối tượng JavaScript có thuộc tính type (loại hành động) và các thuộc tính khác chứa thông tin cần thiết cho hành động.
// Khi một action được gửi thông qua hàm dispatch, Redux sẽ xác định reducers nào sẽ được gọi dựa trên type của action. Mỗi reducer sẽ xử lý các hành động tương ứng và thay đổi trạng thái của ứng dụng dựa trên hành động đó.
