import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getAllCode } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
// import * as actions from '../../../store/actions'
import * as actions from "../../../store/actions";
import "./UserRedux.scss";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; 

class UserRedux extends Component {
  constructor(props) {
    super(props);

    this.state = {
      genderArr: [],
      genderArrPosition: [],
      genderArrRole: [],
      previewImgURL:'',
      isOpen: false,
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
    console.log('state',this.state);
    if (prevProps.genderRedux !== this.props.genderRedux) {
      this.setState({ genderArr: this.props.genderRedux });
    }
    if (prevProps.genderReduxPosition !== this.props.genderReduxPosition) {
      this.setState({ genderArrPosition: this.props.genderReduxPosition });
    }
    if (prevProps.genderReduxRole !== this.props.genderReduxRole) {
      this.setState({ genderArrRole: this.props.genderReduxRole });
    }
  }

  handleOnchangeIMG = (event) => {
    let data = event.target.files;
    let file = data[0];
    if(file){
      let objectURL = URL.createObjectURL(file);
      this.setState({
        previewImgURL :objectURL 
      })
    }
    
  };

  openPreviewImgURL = ()=>{
    if(!this.state.previewImgURL) return; // Nếu bằng rỗng thì return
    this.setState({
      isOpen : true,
    });
  }
  render() {
    let genderArrnew = this.state.genderArr;
    let genderArrnewPosition = this.state.genderArrPosition;
    let genderArrnewRole = this.state.genderArrRole;
    let language = this.props.language;
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
                  <input className="form-control" type="email" />
                </div>
                <div className="col-3">
                  <label>
                    <FormattedMessage id="manage-user.password" />
                  </label>
                  <input className="form-control" type="password" />
                </div>
                <div className="col-3">
                  <label>
                    <FormattedMessage id="manage-user.first-name" />
                  </label>
                  <input className="form-control" type="text" />
                </div>
                <div className="col-3">
                  <label>
                    <FormattedMessage id="manage-user.last-name" />
                  </label>
                  <input className="form-control" type="text" />
                </div>
                <div className="col-3">
                  <label>
                    <FormattedMessage id="manage-user.phone" />
                  </label>
                  <input className="form-control" type="text" />
                </div>
                <div className="col-9">
                  <label>
                    <FormattedMessage id="manage-user.address" />
                  </label>
                  <input className="form-control" type="text" />
                </div>

                <div className="col-3">
                  <label>
                    <FormattedMessage id="manage-user.gender" />
                  </label>
                  <select className="form-control">
                    {genderArrnew &&
                      genderArrnew.length > 0 &&
                      genderArrnew.map((item, i) => {
                        return (
                          <option key={i}>
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
                    <FormattedMessage id="manage-user.position" />
                  </label>
                  <select className="form-control">
                    {genderArrnewPosition &&
                      genderArrnewPosition.length > 0 &&
                      genderArrnewPosition.map((item, i) => {
                        return (
                          <option key={i}>
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
                    <FormattedMessage id="manage-user.role" />
                  </label>
                  <select className="form-control">
                    {genderArrnewRole &&
                      genderArrnewRole.length > 0 &&
                      genderArrnewRole.map((item, i) => {
                        return (
                          <option key={i}>
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
                          setTimeout(()=>{console.log(this.state);},1000);
                        }}
                      />
                      <label className="label-upload" htmlFor="previewImgURL">
                        <FormattedMessage id="manage-user.postImg" />
                        <i className="fas fa-upload"></i>
                      </label>
                      <div className="preview-img"  style={{ backgroundImage: `url(${this.state.previewImgURL})` }} 
                              onClick={ ()=>{this.openPreviewImgURL()} }
                      >
                      </div>
                      
                    </div>
                  </div>
                </div>

                <div className="col-12 my-3">
                  <button className={"btn btn-warning"}>
                    <FormattedMessage id="manage-user.save" />
                  </button>
                </div>

                <div className="col-12 mb-5"></div>
                
              </div>
            </div>
          </div>
        </div>
        {this.state.isOpen ===true && (
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
    genderRedux: state.adminReducerRoot.arr,
    genderReduxPosition: state.adminReducerRoot.position,
    genderReduxRole: state.adminReducerRoot.role,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
