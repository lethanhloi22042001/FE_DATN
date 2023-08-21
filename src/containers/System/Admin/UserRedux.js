import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES ,CRUD_ACTIONS,CommonUtils} from "../../../utils";
// import * as actions from '../../../store/actions'
import * as actions from "../../../store/actions";
import "./UserRedux.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { every } from "lodash";
import TableManageUser from "./TableManageUser";

class UserRedux extends Component {
  constructor(props) {
    super(props);

    this.state = {
      genderArr: [],
      genderArrPosition: [],
      genderArrRole: [],
      previewImgURL: "", // dùng với Lightbox để hiển thị ra xem ảnh trước 
      isOpen: false,

      email: "",
      password: "",
      lastName: "",
      firstName: "",
      phonenumber: "",
      address: "",
      gender: "",
      roleId: "",
      position: "",
      avatar: "", // ảnh khi post

      action : '',
      userEditId : '',
    };
  }

  async componentDidMount() {
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
        roleId: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : "",
      });
    }
    if (prevProps.genderReduxarrLoad !== this.props.genderReduxarrLoad) {
      let arrGenders = this.props.genderReduxGender;
      let arrRole = this.props.genderArrRole ;
      let arrPosition = this.props.genderArrPosition;
      this.setState({
        email: "",
        password: "",
        lastName: "",
        firstName: "",
        phonenumber: "",
        address: "",
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
        roleId:  arrRole && arrRole.length > 0 ? arrRole[0].keyMap : "",
        position: arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : "",
        avatar: "",


        action: CRUD_ACTIONS.CREATE,
        previewImgURL : '',

      });
    }
  }

  handleOnchangeIMG = async(event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectURL = URL.createObjectURL(file); // objectURL để chuyển ảnh thành đường link ==> giúp thấy hình ảnh hiện lên trên màn hình
      this.setState({
        previewImgURL: objectURL, 
        avatar: base64, //Chuyển dữ liệu ảnh(tập tin) sang dạng base64 mới đẩy xuống BE được (và dưới BE đang kiểu BLOB nên kiểu avatar tiếp tục bị đổi thành dạng BUFFER)
      });
    }
  };
  // ở thẻ div=> khi click thì dùng thư viện 
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

  isFill = ()=>{
    let isValid = true ;
    let arr = ['email','password','firstName','lastName' ,'address','phonenumber'] ;

     for(let i= 0 ; i < arr.length ; i++){
        if( !this.state[arr[i]] ){
            isValid = false ;
            console.log(arr[i]);
            alert("vui long dien day du thong tin của " + arr[i]);
            break ; 
        }
     }

    return isValid ;
}
  //Hàm này dùng để kéo dữ liệu từ BE => setState để 
  handleEditUserFromParent = (data)=>{
      let imageBase64 = '';
      if(data.image){
        //                     data.image(đang là kiểu BLOB) - mã hoá sang base64 -> sau đó toString sang binary
        imageBase64 = new Buffer(data.image ,"base64").toString('binary');
      }
      this.setState({
            email: data.email,
            password: "HardCode", 
            firstName: data.firstName,
            lastName: data.lastName,
            phonenumber: data.phonenumber,
            address: data.address,
            gender: data.gender,
            roleId: data.roleId,
            position: data.positionId,
            avatar: data.avatar,
            previewImgURL : imageBase64,
            action : CRUD_ACTIONS.EDIT,
            userEditId : data.id ,
          }); 
  }
  

  handleSaveUser = ()=>{
    let check = this.isFill();
    let {action} = this.state ;
    if(action === CRUD_ACTIONS.CREATE){
      //FIRE REDUX CREATE
      if(check === true){
        this.props.dispatchAdminReducerCreateUser({
          email: this.state.email,
          password: this.state.password,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          address: this.state.address,
          phonenumber: this.state.phonenumber,
          gender: this.state.gender,
          roleId: this.state.roleId,
          positionId: this.state.position,
          avatar: this.state.avatar
        });
      }
    }
    //FIRE REDUX UPDATE
    if(action === CRUD_ACTIONS.EDIT){
      this.props.dispatchAdminReducerUpdateUser({
        id : this.state.userEditId,
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phonenumber: this.state.phonenumber,
        gender: this.state.gender,
        roleId: this.state.roleId,
        positionId: this.state.position,
        avatar: this.state.avatar
      })
      
    }
  }
  
  render() {
    let genderArrnew = this.state.genderArr;
    let genderArrnewPosition = this.state.genderArrPosition;
    let genderArrnewRole = this.state.genderArrRole;
    let language = this.props.language;

    //Thay vì let email = this.state.email thì gom cả cục lại khai báo theo cú pháp ES7
    let { email, password, lastName, firstName, phonenumber, address,gender,roleId,position } =
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
                          disabled={this.state.action===CRUD_ACTIONS.EDIT?true:false}
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
                          disabled={this.state.action===CRUD_ACTIONS.EDIT?true:false}
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
                          value={gender}
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
                            
                          />
                        </label>
                        <select className="form-control" onChange={(event) => {
                              this.onChangeInput(event, "position");
                            }} value={position}>
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
                          
                          />
                        </label>
                        <select className="form-control"  onChange={(event) => {
                              this.onChangeInput(event, "roleId");
                            }} value={roleId}   >
                          {genderArrnewRole &&
                            genderArrnewRole.length > 0 &&
                            genderArrnewRole.map((item, i) => {
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
                              {/* Cái này Là NÚT BẤM  SAVE or UPDATE */}
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
                                  {/* Cái này htmlFor="previewImgURL" - Hiển thị hình ảnh lên: Liên kết label với phần tử <input> thông qua cùng một ID, khi người dùng nhấp vào label thì sẽ kích hoạt sự kiện chọn tập tin. */}
                            <label className="label-upload" htmlFor="previewImgURL">
                              <FormattedMessage id="manage-user.postImg" />
                              <i className="fas fa-upload"></i>
                            </label>

                                  {/* Cái này backgroundImage `url(${this.state.previewImgURL}): Dùng để hiển thị ảnh */}
                                  {/* Cái này onClick={() => {this.openPreviewImgURL();}}: Dùng kèm với thư viện LightBox để click ảnh lên */}
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
                                  {/* Cái này Là NÚT BẤM  SAVE or UPDATE */}
                      <div className="col-12 my-3">
                        <button className={this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning" : "btn btn-primary"} onClick={ ()=>{ this.handleSaveUser()}}>
                          {this.state.action === CRUD_ACTIONS.EDIT ? <FormattedMessage id="manage-user.edit" /> : <FormattedMessage id="manage-user.save" />} 
                        </button>
                      </div>
                      <div className="col-12 mb-5"></div>

                    </div>
                  </div>
                </div>
              </div>
              <TableManageUser
                handleEditUserFromParentKey = {this.handleEditUserFromParent}
                action  = {this.state.action}
              />
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
    dispatchAdminReducerCreateUser: (data) => {
      dispatch(actions.createUserRedux(data));
    },
    dispatchAdminReducerUpdateUser: (data) => {
      dispatch(actions.updateUserRedux(data));
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
    genderReduxarrLoad: state.adminReducerRoot.arrLoadData,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
