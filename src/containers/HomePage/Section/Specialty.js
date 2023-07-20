import React, { Component } from "react";
import { connect } from "react-redux";
import "./Specialty.scss";
import { FormattedMessage } from "react-intl"; // Thư viện : international language (react-intl)

class Specialty extends Component {
  render() {
    return (
      <div className="section-speacialty">
        <div className="specialty-content"></div>
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
