import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu } from "./menuApp";
import "./Header.scss";
import {changeLanguageApp} from '../../store/actions'  ;
import { LANGUAGES } from "../../utils/constant";
import { FormattedMessage } from 'react-intl';

// import _ from 'lodash';

class Header extends Component {

  changeLanguage = (language)=>{
    this.props.changeLanguageAppRedux(language);
}
  render() {
    const { userInfo,processLogout ,language } = this.props;
    return (
      <div className="header-container">
        {/* thanh navigator */}
        <div className="header-tabs-container">
          <Navigator menus={adminMenu} />
        </div>

        {/* nút logout */}
        <div className="languages">
          <span className="welcome"> <FormattedMessage id = 'homeheader.welcome' />{userInfo && userInfo.firstName ? userInfo.firstName + userInfo.lastName : '' } </span>
          <span className= { language === LANGUAGES.VI ? "language-vi active" : "language-vi" }  onClick={ (event)=>{this.changeLanguage(LANGUAGES.VI)}  }>VN</span>
          <span className= { language === LANGUAGES.EN ? "language-en active" : "language-en" }  onClick={ (event)=>{this.changeLanguage(LANGUAGES.EN)}  }>EN</span>
          <div className="btn btn-logout" onClick={processLogout}>
            <i className="fas fa-sign-out-alt"></i>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language : state.app.language,
    userInfo : state.user.userInfo,

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageAppRedux : (language)=>{ dispatch(changeLanguageApp(language))}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
