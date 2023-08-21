import React, { Component } from "react";
import { connect } from "react-redux";
// import HomeHeader from "../HomeHeader";
import Slider from "react-slick";
import * as actions from "../../../store/actions" ;
import { LANGUAGES} from "../../../utils";
import { FormattedMessage } from "react-intl";

class OutStandingDoctor extends Component {
  constructor(props){  
      super(props); // dùng để kế thừa những cái props nó truyền xuống
      this.state = {
        doctor : [],
        language :'',
        // previewImgURL : '',
      }
  }
  componentDidMount(){
    this.props.dispatchGetDoctorRedux();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.ReduxDoctorArr !== this.props.ReduxDoctorArr) {
      let DoctorArr = this.props.ReduxDoctorArr;
      this.setState({
        doctor: this.props.ReduxDoctorArr,
        // gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
      },()=>{
        console.log('this is dotor Arr',this.state.doctor);
      });
    }

  }


  render() {
    let doctor  = this.state.doctor ;
    let language  = this.state.language ;
      // doctor  = doctor.concat(doctor);
    return (
      <div className="section-share section-outstanding-doctor">
      <div className="section-container"> 
          <div className="section-header">
            <div className="title-section"><FormattedMessage id ="homepage.out-standing-doctor"/></div>
            <button className="btn-section"><FormattedMessage id ="homepage.more-infomation"/></button>
          </div>

          <div className="section-body">
            <Slider { ...this.props.settings}>
            { doctor && doctor.length> 0 && doctor.map((item,index)=>{
             
            let nameVi = `${item.positionData.valueVi} ${item.firstName} ${item.lastName}`
            let nameEn = `${item.positionData.valueEn} ${item.firstName} ${item.lastName}`
            // lấy dữ liệu ở DB dạng Buffer để convert sang Base64
              let imageBase64 = '';
              if(item.image){
              imageBase64 = new Buffer(item.image ,"base64").toString('binary');
              }
              return(
                      <div className="section-customize" key ={index}>
                          <div className="customize-border">
                              <div className="outer-bg">
                                  <div className="bg-img section-outstanding-doctor" style={{ backgroundImage: `url(${imageBase64})` }}></div>
                              </div>
                              <div className="position text-center">
                                  <div className="pictureT">{language  === LANGUAGES.VI ? nameVi: nameEn}</div>
                                  <div className="pictureT">Việt Đức</div>
                              </div>
                          </div>
                        </div> 
              )
            })}
            </Slider>

            
          </div>

      </div>
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language : state.app.language,
    isLoggedIn: state.user.isLoggedIn,
    ReduxDoctorArr: state.adminReducerRoot.doctorArr,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

    // action bắn getDoctorRedux chạy thì action ni sẽ đưa cái getDoctorRedux sang Reducer
    dispatchGetDoctorRedux: () => {
      dispatch(actions.getDoctorRedux());
    },

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
