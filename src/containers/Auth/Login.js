import React, { Component } from 'react';  // thư viện lấy react ra
import { connect } from 'react-redux';      // kết nối react redux
import { push } from "connected-react-router"; // 

// import * as actions from "../store/actions";
import * as actions from "../../store/actions" ;
import './Login.scss';

import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserDoctor } from '@fortawesome/free-solid-svg-icons';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password :'',
            isShowHidePassword : false ,

        }
    } 
    handleOnChangeInput = (event)=>{
        this.setState({username : event.target.value});
        console.log(event.target.value);
    }

    handleOnChangepassword = (event)=>{
        this.setState({password : event.target.value});
        console.log(event.target.value);
    }
    handleLogin = ()=>{
        console.log('username ' + this.state.username);
        console.log('password ' + this.state.password);
        console.log('password ' , this.state);
    }
    isShowHidePassword= ()=>{
        this.setState( {isShowHidePassword : !this.state.isShowHidePassword});
    }
    render() { 
        return ( 
            <div className='login-background'>
            <div className='login-container'>
                <div className='login-content'>
                    <div className='left' >
                        <h2 className="logo"><i className='bx bxl-xing'></i>Hash Techie</h2>
                         
                        <div className="text-item">
                            <h2>Welcome!<span>To Our Channel</span> </h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, repellendus?</p>
                            <div className="social-icon">
                                <i className="fab fa-google-plus fa-beat-fade" style={{ color: "#d32b0d" }}> </i>
                                <i className="fab fa-facebook facebook"></i>
                                <i className="fab fa-google-plus fa-beat-fade" style={{ color: "#d32b0d" }}> </i>
                                <i className="fab fa-facebook facebook"></i>
                            </div>
                        </div>
                    </div>
                    
                    <div className="right">
                        <div className='form-group form-box'>
                            <div className='col-12 text-login'>Login</div>

                            <div className='col-12 form-group login-input'>
                                <label className =''> Username: </label>

                                <input
                                     placeholder='Enter your User Name...'  type='text' className='form-control '
                                     value={this.state.username} onChange={(event)=>{this.handleOnChangeInput(event)} }
                                />
                            </div>
                            <div className='col-12 form-group login-input'>
                                <label className= ''> Password:</label>
                                <input
                                    className='form-control'
                                    placeholder='Enter your password...' type={ this.state.isShowHidePassword ? 'text' : 'password' }
                                    value={this.state.password} onChange={(event)=>{this.handleOnChangepassword(event)}}
                                />
                                <span onClick={()=>{this.isShowHidePassword();}}>
                                    <i class= {this.state.isShowHidePassword ? "far fa-eye" : 'fas fa-eye-slash'}   ></i>
                                </span>
                            </div>
                            
                            <button  className='btn-login' onClick={()=>{
                                this.handleLogin()
                            }}>Login</button>
                            <span className='forgot-password'>Forgot your password?</span>
                            
                            <div className='col-12 text-center mt-3'>
                                <span>Or Login with:</span>
                            </div>
                            <div className=' social-login'>
                                <i className="fab fa-google-plus fa-beat-fade  " style={{ color: "#d32b0d" }}> </i>
                                <i className="fab fa-facebook facebook  "></i>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
