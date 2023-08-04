import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import '../HomePage.scss'

class Specialty extends Component { 
  render() {
    // let settings = this.props.settings ;
    return (
      <div className="section-share section-specialty">
        <div className="section-container">
            <div className="section-header">
              <div className="title-section"> Chuyên Khoa Phổ Biến</div>
              <button className="btn-section">Xem Thêm</button>
            </div>

            <div className="section-body">
              <Slider { ...this.props.settings}>
                          <div className="section-customize" >
                            <div className="bg-img section-specialty"></div>
                            <div className="pictureT">Cơ Xương Khớp</div>
                          </div>
                          <div className="section-customize">
                            <div className="bg-img section-specialty"> </div>
                            <div className="pictureT">Thần kinh</div>
                          </div>
                          <div className="section-customize">
                            <div className="bg-img section-specialty"> </div>
                            <div className="pictureT">Thần kinh</div>
                          </div>
                          <div className="section-customize">
                            <div className="bg-img section-specialty"> </div>
                            <div className="pictureT">Tiêu Hoá</div>
                          </div>
                          <div className="section-customize">
                            <div className="bg-img section-specialty"> </div>
                            <div className="pictureT">Tim Mạch</div>
                          </div>
                          <div className="section-customize">
                            <div className="bg-img section-specialty"> </div>
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
  // hàm này dùng để ánh xạ actioncreator changeLanguageApp vào prop
  return {
    // nhờ dispatch để gữi action có tên changeLanguageApp đến ReduxStore
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
//Trong Redux, dispatch là một hàm được cung cấp bởi Redux store để gửi các action đến các reducers.
// Hàm dispatch nhận vào một action là một đối tượng JavaScript có thuộc tính type (loại hành động) và các thuộc tính khác chứa thông tin cần thiết cho hành động.
// Khi một action được gửi thông qua hàm dispatch, Redux sẽ xác định reducers nào sẽ được gọi dựa trên type của action. Mỗi reducer sẽ xử lý các hành động tương ứng và thay đổi trạng thái của ứng dụng dựa trên hành động đó.
