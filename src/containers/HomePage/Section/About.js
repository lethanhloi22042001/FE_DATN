import React, { Component } from "react";
import { connect } from "react-redux";
import "../HomePage.scss";

class About extends Component {
  render() {
    return (
      <div className="section-share section-about">
        <div className="section-about-header">
          Truyền Thông Nói Về BookingCare
        </div>
        <div className="section-about-content">
          <div className="content-left">
            <iframe
              width="100%"
              height="400px"
              src="https://www.youtube.com/embed/FyDQljKtWnI"
              title="CÀ PHÊ KHỞI NGHIỆP VTV1 - BOOKINGCARE - HỆ THỐNG ĐẶT LỊCH KHÁM TRỰC TUYẾN"
              FrameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
          <div className="content-right">
                <p>
                //Trong Redux, dispatch là một hàm được cung cấp bởi Redux store để gửi các action đến các reducers.
                // Hàm dispatch nhận vào một action là một đối tượng JavaScript có thuộc tính type (loại hành động) và các thuộc tính khác chứa thông tin cần thiết cho hành động.
                // Khi một action được gửi thông qua hàm dispatch, Redux sẽ xác định reducers nào sẽ được gọi dựa trên type của action. Mỗi reducer sẽ xử lý các hành động tương ứng và thay đổi trạng thái của ứng dụng dựa trên hành động đó.
                </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
//Trong Redux, dispatch là một hàm được cung cấp bởi Redux store để gửi các action đến các reducers.
// Hàm dispatch nhận vào một action là một đối tượng JavaScript có thuộc tính type (loại hành động) và các thuộc tính khác chứa thông tin cần thiết cho hành động.
// Khi một action được gửi thông qua hàm dispatch, Redux sẽ xác định reducers nào sẽ được gọi dựa trên type của action. Mỗi reducer sẽ xử lý các hành động tương ứng và thay đổi trạng thái của ứng dụng dựa trên hành động đó.
