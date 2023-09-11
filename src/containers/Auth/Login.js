import React, { Component } from 'react';  // thư viện lấy react ra
import { connect } from 'react-redux';      // kết nối react redux
import { push } from "connected-react-router"; // 

// import * as actions from "../store/actions";
// Hàm actions là hàm hành động
import * as actions from "../../store/actions" ;
import './Login.scss';


import { handleLoginApi } from '../../services/userService';



class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password :'',
            isShowHidePassWord : false,
            errMessage : '',

        }
    } 
    handleOnChangeInput = (event)=>{
        this.setState({username : event.target.value});
    }

    handleOnChangepassword = (event)=>{
        this.setState({password : event.target.value});
    }
    
    handleHideShowPassword = ()=>{
        this.setState({isShowHidePassWord : !this.state.isShowHidePassWord});
    }
    
    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        try {
            let data = await handleLoginApi(this.state.username, this.state.password)
            if(data && data.errCode !==0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if(data && data.errCode === 0) {
                // this.props.userLoginSuccess(data.user);
                this.props.userLoginSuccess(data.user);
                console.log('Khong hieu doan nay nen log data',data);
                // this.props.navigate("/header");
            }
        } catch (error) {
            if (error.response) {  
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            }

        }
    }
  
    handleKeyDown = (e)=>{
        console.log('this is event',e);
        if (e.key === 'Enter' || e.keyCode === 13) {
            this.handleLogin();
          }
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
                                     onKeyDown={ (event)=>{this.handleKeyDown(event)}}  
                                     placeholder='Enter your User Name...'  type= 'text' className='form-control '
                                     value={this.state.username} onChange={(event)=>{this.handleOnChangeInput(event)} }
                                />
                                
                            </div>
                            <div className='col-12 form-group login-input'>
                                <label className= ''> Password:</label>
                                <input
                                    onKeyDown={ (event)=>{this.handleKeyDown(event)}}  
                                    className='form-control'
                                    placeholder='Enter your password...' type={ this.state.isShowHidePassWord ? 'text' : 'password'}
                                    value={this.state.password} onChange={(event)=>{this.handleOnChangepassword(event)}}
                                />
                                <span onClick={()=>{
                                    this.handleHideShowPassword();}}>
                                     <i className = { this.state.isShowHidePassWord ? 'fab fa-google-plus fa-beat-fade' : 'fab fa-facebook facebook'} ></i>
                                </span>
                            </div>
                            <div className='col-12' style={{color :'red'}}>
                               { this.state.errMessage}
                            </div>
                            <button className='btn-login' onClick={ ()=>{
                                this.handleLogin();
                            }} >Login
                            </button>
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
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
        // adminLoginFail: () => dispatch(actions.adminLoginFail()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
