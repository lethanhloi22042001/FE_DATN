import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import './UserManage.scss'
import { connect } from 'react-redux';
import _ from 'lodash'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
  } from 'reactstrap';
  import {emitter} from '../../utils/emitter' ;

class ModleEditUser extends Component {
    constructor(props){
        super(props)
        this.state  = {
            id : '',
            email :'',
            password : '',
            firstName : '',
            lastName : '',
            address : '',
        }
        this.listenToEmitter()
    }
    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
            })
        })
    } 
    componentDidMount() {
          let user =  this.props.currentUser  
          if(user && !_.isEmpty(user) ){
                // !_.isEmpty(user) dùng thư viện lodash để check xem Object user có trống hay không
              this.setState( {
                id : user.id,
                email : user.email ,
                password : 'user.email' ,
                firstName : user.firstName, 
                lastName : user.lastName ,
                address : user.address 
              } );
          }
          

    }

    toggle = ()=>{
        this.props.toggleParentUserModle()
    }
 

    isFill = ()=>{
        let isValid = true ;
        let arr = ['email','password','firstName','lastName' ,'address'] ;
         for(let i= 0 ; i < arr.length ; i++){
            if( !this.state[arr[i]] ){
                isValid = false ;
                alert("vui long dien day du thong tin ");
                break ; 
            }
         }

        return isValid ;
    }
    
    currentUser = ()=>{
        let check = this.isFill();
        if(check === true){
        this.props.currentUser(this.state);
        }
    }
 
    getDataFromForm = (event,name)=>{
        let copyState = {...this.state} ;
        copyState[name] = event.target.value ;
        
        this.setState({...copyState} , ()=>{ console.log('check',this.state)})
    }

    updateNewUser = ()=>{
        this.props.updateNewUser(this.state)
    }


    
    render() {
        console.log('check props form Parents', this.props.currentUser);
        return (
            <Modal isOpen={this.props.isOpen} toggle={()=>{}} className={'modal-user-container'}>

            <ModalHeader toggle={ ()=>{this.toggle()}}>Edit User</ModalHeader>
            <ModalBody>
            <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input   type='text'  
                              onChange={ (event)=>{this.getDataFromForm(event,'email')}}   value={this.state.email}
                            ></input>
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input
                                 onChange={ (event)=>{
                                    this.getDataFromForm(event,'password')
                                 }}
                                value={this.state.password}
                                type='password'  ></input>
                        </div>
                    </div>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>First name</label>
                            <input
                                value={this.state.firstName}
                                 onChange={ (event)=>{
                                    this.getDataFromForm(event,'firstName')
                                 } }
                                type='text'  ></input>
                        </div>
                        <div className='input-container'>
                            <label>Last name</label>
                            <input
                                    value={this.state.lastName}
                                onChange={(event)=>{
                                    this.getDataFromForm(event,'lastName')
                                }}  
                                type='text'  ></input>
                        </div>
                    </div>
                    <div className='modal-user-body1'>
                        <div className='input-container1'>
                            <label>Address</label>
                            <input
                                onChange={ (event)=>{
                                   this.getDataFromForm(event,'address') 
                                } }
                                value={this.state.address}
                                type='text'  ></input>
                        </div>
                    </div>

            </ModalBody>
            <ModalFooter>
            <Button color="primary" onClick={ ()=>{this.updateNewUser()}}>
                UpDate
            </Button>{' '}
            <Button color="secondary" onClick={ ()=>{this.toggle()}}>
                Cancel
            </Button>
            </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {  
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModleEditUser);
