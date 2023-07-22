import React, { Component } from "react";
import { connect } from "react-redux";
import "./Specialty.scss";
import { FormattedMessage } from "react-intl"; // Thư viện : international language (react-intl)

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import specialityImg from '../../../assets/speciality/vg1.jpeg'

class Specialty extends Component { 
    SampleNextArrow = (props)=> {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "red" }}
        onClick={onClick}
      />
    );
  }
  
    SamplePrevArrow = (props)=> {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "green" }}
        onClick={onClick}
      />
    );
  }
  
  
  render() {
    let settings = {
      // dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1, 
    }
    return (
      <div className="section-speacialty">
        <div className="specialty-content">
            <div className="top-text">
              <div className="ck-text"> Chuyên Khoa Phổ Biến</div>
              <div className="ck-text-right">Xem Thêm</div>
            </div>
            <Slider {...settings}>
                        <div className="specialty-body" >
                          <div className="bg-img"></div>
                          <div className="pictureT">Cơ Xương Khớp</div>
                        </div>

                        <div className="specialty-body">
                          <div className="bg-img"> </div>
                          <div className="pictureT">Thần kinh</div>
                        </div>

                        <div className="specialty-body">
                          <div className="bg-img"> </div>
                          <div className="pictureT">Thần kinh</div>
                        </div>

                        <div className="specialty-body">
                          <div className="bg-img"> </div>
                          <div className="pictureT">Tiêu Hoá</div>
                        </div>

                        <div className="specialty-body">
                          <div className="bg-img"> </div>
                          <div className="pictureT">Tim Mạch</div>
                        </div>

                        <div className="specialty-body">
                          <div className="bg-img"> </div>
                          <div className="pictureT">Tai Mũi Họng</div>
                        </div>
            </Slider>
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
  // hàm này dùng để ánh xạ actioncreator changeLanguageApp vào prop
  return {
    // nhờ dispatch để gữi action có tên changeLanguageApp đến ReduxStore
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
//Trong Redux, dispatch là một hàm được cung cấp bởi Redux store để gửi các action đến các reducers.
// Hàm dispatch nhận vào một action là một đối tượng JavaScript có thuộc tính type (loại hành động) và các thuộc tính khác chứa thông tin cần thiết cho hành động.
// Khi một action được gửi thông qua hàm dispatch, Redux sẽ xác định reducers nào sẽ được gọi dựa trên type của action. Mỗi reducer sẽ xử lý các hành động tương ứng và thay đổi trạng thái của ứng dụng dựa trên hành động đó.
