import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getAllCode } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
// import * as actions from '../../../store/actions'
import * as actions from "../../../store/actions";
import "./UserRedux.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { every } from "lodash";

class UserRedux extends Component {
  constructor(props) {
    super(props);

    this.state = {
      genderArr: [],
      genderArrPosition: [],
      genderArrRole: [],
      previewImgURL: "",
      isOpen: false,

      email: "",
      password: "",
      lastName: "",
      firstName: "",
      phonenumber: "",
      address: "",
      gender: "",
    };
  }

  async componentDidMount() {
    // this.props.reduxTest();
    // try {
    //   let getDBBE = await getAllCode('GENDER') ;
    //     if(getDBBE && getDBBE.errCode === 0){
    //       this.setState({
    //         genderArr : getDBBE.data
    //       });
    //     }

    // } catch (error) {
    //     console.log(error);
    // }
    this.props.dispatchAdminReducer();
    this.props.dispatchAdminReducerPosition();
    this.props.dispatchAdminReducerRole();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderReduxGender !== this.props.genderReduxGender) {
      let arrGenders = this.props.genderReduxGender;

      this.setState({
        genderArr: this.props.genderReduxGender,
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
      });
    }
    if (prevProps.genderReduxPosition !== this.props.genderReduxPosition) {
      let arrPosition = this.props.genderReduxGender;
      this.setState({
        genderArrPosition: this.props.genderReduxPosition,
        position: arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : "",
      });
    }
    if (prevProps.genderReduxRole !== this.props.genderReduxRole) {
      let arrRole = this.props.genderReduxRole;
      this.setState({
        genderArrRole: this.props.genderReduxRole,
        role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : "",
      });
    }
  }

  handleOnchangeIMG = (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let objectURL = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objectURL,
        avatar: file,
      });
    }
  };

  openPreviewImgURL = () => {
    if (!this.state.previewImgURL) return; // Nếu bằng rỗng thì return
    this.setState({
      isOpen: true,
    });
  };

  onChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState(
      {
        ...copyState,
      },
      () => {
        console.log(this.state);
      }
    );
  };

  handleSaveUser = ()=>{
    console.log('Check SubMit', this.state);
  }
  render() {
    let genderArrnew = this.state.genderArr;
    let genderArrnewPosition = this.state.genderArrPosition;
    let genderArrnewRole = this.state.genderArrRole;
    let language = this.props.language;

    //Thay vì let email = this.state.email thì gom cả cục lại khai báo theo cú pháp ES7
    let { email, password, lastName, firstName, phonenumber, address } =
      this.state;

    return (
      <div className="user-redux-container">
        <div className="title">Manage User using Redux</div>
        <div className="user-redux-body">
          <div>
            <div className="container">
              <div className="row">
                <div className="col-12 my-3"> </div>
                <div className="col-12"> </div>
                <div className="col-3">
                  <label>
                    {" "}
                    <FormattedMessage id="manage-user.email" />
                  </label>
                  <input
                    className="form-control"
                    type="email"
                    value={email}
                    onChange={(event) => {
                      this.onChangeInput(event, "email");
                    }}
                  />
                </div>
                <div className="col-3">
                  <label>
                    <FormattedMessage id="manage-user.password" />
                  </label>
                  <input
                    className="form-control"
                    type="password"
                    value={password}
                    onChange={(event) => {
                      this.onChangeInput(event, "password");
                    }}
                  />
                </div>
                <div className="col-3">
                  <label>
                    <FormattedMessage id="manage-user.first-name" />
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    value={firstName}
                    onChange={(event) => {
                      this.onChangeInput(event, "firstName");
                    }}
                  />
                </div>
                <div className="col-3">
                  <label>
                    <FormattedMessage id="manage-user.last-name" />
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    value={lastName}
                    onChange={(event) => {
                      this.onChangeInput(event, "lastName");
                    }}
                  />
                </div>
                <div className="col-3">
                  <label>
                    <FormattedMessage id="manage-user.phone" />
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    value={phonenumber}
                    onChange={(event) => {
                      this.onChangeInput(event, "phonenumber");
                    }}
                  />
                </div>
                <div className="col-9">
                  <label>
                    <FormattedMessage id="manage-user.address" />
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    value={address}
                    onChange={(event) => {
                      this.onChangeInput(event, "address");
                    }}
                  />
                </div>

                <div className="col-3">
                  <label>
                    <FormattedMessage id="manage-user.gender" />
                  </label>
                  <select
                    className="form-control "
                    onChange={(event) => {
                      this.onChangeInput(event, "gender");
                    }}
                  >
                    {genderArrnew &&
                      genderArrnew.length > 0 &&
                      genderArrnew.map((item, i) => {
                        return (
                          <option key={i} value={item.keyMap}>
                            {language === LANGUAGES.VI
                              ? item.valueVi
                              : item.valueEn}
                          </option>
                        );
                      })}
                    <option>Choose</option>
                  </select>
                </div>
                <div className="col-3">
                  <label>
                    <FormattedMessage
                      id="manage-user.position"
                      onChange={(event) => {
                        this.onChangeInput(event, "position");
                      }}
                    />
                  </label>
                  <select className="form-control">
                    {genderArrnewPosition &&
                      genderArrnewPosition.length > 0 &&
                      genderArrnewPosition.map((item, i) => {
                       
                        return (
                          <option key={i} value={item.keyMap}>
                            {" "}
                            {language === LANGUAGES.VI
                              ? item.valueVi
                              : item.valueEn}
                          </option>
                        );
                      })}
                    <option>...</option>
                  </select>
                </div>
                <div className="col-3">
                  <label>
                    <FormattedMessage
                      id="manage-user.role"
                      onChange={(event) => {
                        this.onChangeInput(event, "role");
                      }}
                    />
                  </label>
                  <select className="form-control">
                    {genderArrnewRole &&
                      genderArrnewRole.length > 0 &&
                      genderArrnewRole.map((item, i) => {
                        console.log('this is item',item);
                        return (
                          <option key={i} value={item.keyMap}>
                            {" "}
                            {language === LANGUAGES.VI
                              ? item.valueVi
                              : item.valueEn}
                          </option>
                        );
                      })}

                    <option>...</option>
                  </select>
                </div>

                <div className="col-3">
                  <label>
                    <FormattedMessage id="manage-user.image" />
                  </label>
                  <div className="preview-img-container">
                    <div className="upload-btn-wrapper">
                      <input
                        type="file"
                        id="previewImgURL"
                        hidden
                        onChange={(event) => {
                          this.handleOnchangeIMG(event);
                        }}
                      />
                      <label className="label-upload" htmlFor="previewImgURL">
                        <FormattedMessage id="manage-user.postImg" />
                        <i className="fas fa-upload"></i>
                      </label>
                      <div
                        className="preview-img"
                        style={{
                          backgroundImage: `url(${this.state.previewImgURL})`,
                        }}
                        onClick={() => {
                          this.openPreviewImgURL();
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="col-12 my-3">
                  <button className={"btn btn-warning"} onClick={ ()=>{ this.handleSaveUser()}}>
                    <FormattedMessage id="manage-user.save" />
                  </button>
                </div>
                <div className="col-12 mb-5"></div>
              </div>
            </div>
          </div>
        </div>
        {this.state.isOpen === true && (
          <Lightbox
            mainSrc={this.state.previewImgURL}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
      </div>
    );
  }
}
// Chạy dispatch từ Action qua Reducer(Hàm xử lý trạng thái)
const mapDispatchToProps = (dispatch) => {
  return {
    dispatchAdminReducer: () => {
      dispatch(actions.startDoing());
    },
    dispatchAdminReducerPosition: () => {
      dispatch(actions.startDoingPosition());
    },
    dispatchAdminReducerRole: () => {
      dispatch(actions.startDoingRole());
    },
  };
};

//Đã lưu dữ liệu vào redux và gán dữ liệu qua cho React
const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderReduxGender: state.adminReducerRoot.gender,
    genderReduxPosition: state.adminReducerRoot.position,
    genderReduxRole: state.adminReducerRoot.role,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
