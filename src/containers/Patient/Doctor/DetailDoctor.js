import React, { Component } from "react";
import { Fragment } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import "./DetailDoctor.scss";
import { getDetailInfoDoctor } from "../../../services/userService";
import { LANGUAGES ,CRUD_ACTIONS,CommonUtils} from "../../../utils";

// import DoctorSchedule from "./DoctorSchedule";
// import DoctorExtraInfo from "./DoctorExtraInfo";
// import LikeAndShare from "../SocialPlugin/LikeAndShare";
// import Comment from "../SocialPlugin/Comment";
// require("dotenv").config();

class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor : {},
      language :'',
    }
  }

  async componentDidMount() {
    //Thế props của cái detailDoctor là cái gì
    console.log('Thế props của cái detailDoctor là cái gì',this.props);
    if(this.props.match && this.props.match.params && this.props.match.params.id){
      let id = this.props.match.params.id ;
      let res =  await getDetailInfoDoctor(id);
      if(res.users && res.errCode === 0){
        let user = res.users;
        console.log('user',user);
        this.setState({
          detailDoctor : user,
        })
      } 
    }
  }
 
  componentDidUpdate(prevProps, prevState, snapshot) {
 
  }

  render() {
    console.log('asd',this.state.detailDoctor);
    let {detailDoctor} = this.state ;
    let {language} = this.props ;
    let nameVi = '',nameEn = '';
    if(detailDoctor && detailDoctor.positionData){
       nameVi = `${detailDoctor.positionData.valueVi} ${detailDoctor.firstName} ${detailDoctor.lastName}`
       nameEn = `${detailDoctor.positionData.valueEn} ${detailDoctor.firstName} ${detailDoctor.lastName}`
    }
    // if(detailDoctor && detailDoctor.positio)
    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="doctor-detail-container">
          <div className="intro-doctor">
            <div className="content-left"  style={{ backgroundImage: `url(${this.state.detailDoctor.image})` }} ></div>
            <div className="content-right">
              <div className="up">{language  === LANGUAGES.VI ? nameVi: nameEn}</div>
              <div className="down">
                {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.description 
                && 
                <div >{detailDoctor.Markdown.description}
                </div>
                }
                
                <div className="like-share-plugin"></div>
              </div>
            </div>
          </div>
          <div className="schedule-doctor">
            <div className="content-left"></div>
            <div className="content-right"></div>
          </div>
          <div className="detail-info-doctor"> 
          {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML 
          && <div dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.contentHTML}}></div>}
          </div>
          <div className="comment-doctor"></div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
