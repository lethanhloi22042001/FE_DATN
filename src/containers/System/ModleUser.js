import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import './UserManage.scss'
import { connect } from 'react-redux';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
  } from 'reactstrap';
  import {emitter} from '../../utils/emitter' ;




class ModleUser extends Component {
    constructor(props){
        super(props)
        this.state  = {
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

    }

    toggle = ()=>{
        this.props.toggleParentUserModle()
        console.log(  ' this.props.toggleParentUserModle()' ,this.props.toggleParentUserModle());
    }
 

    isFill = ()=>{
        let isValid = true ;
        let arr = ['email','password','firstName','lastName' ,'address'] ;

         for(let i= 0 ; i < arr.length ; i++){
            // nó khác cái trường state ở trên hay là lấy cái mảng ở trong này
            if( !this.state[arr[i]] ){
                isValid = false ;
                alert("vui long dien day du thong tin ");
                break ; 
            }
         }

        return isValid ;
    }
    //handleAddNewUser: khi nhấn Addnew thì chỉ kiểm tra xem có trống hay không
    //   this.props.createNewUser() : 
    // Bước 2: sau khi đã hoàn thành xong bước 1 setState rồi
    //          Gọi hàm this.props.createNewUser(this.state); để truyển dữ liệu xuống cho BE thông qua API
   // còn hàm   createNewUser = ()=>{ chỉ dùng để chheck đã điền đầy đủ hay chưa
    createNewUserModleUserThis =  ()=>{
        let check = this.isFill();
        if(check === true){
        this.props.createNewUserModleUser(this.state);
        }
    }


    // BƯỚC 1 : setState
    //Lấy dữ liệu ra (Bước 1 : Lấy toàn bộ dữ liệu từ form và để SetState)
    getDataFromForm = (event,name)=>{
        // copy ra
        let copyState = {...this.state} ;
        //
        // copyState[name] = event.target.value ;
        copyState[name] = event.target.value ;
        
        this.setState({...copyState} , ()=>{ console.log('check',this.state)})
    }
    // onChange={(event)=>{this.handleOnChangeInput(event)}

    render() {
        // console.log('check Child props',this.props );
        // console.log('check Child openmodl',this.props.test  );
        return (
            <Modal isOpen={this.props.isOpen} toggle={()=>{}} className={'modal-user-container'}>

            <ModalHeader toggle={ ()=>{this.toggle()}}>Add New User</ModalHeader>
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
            <Button color="primary" onClick={ ()=>{this.createNewUserModleUserThis()}}>
                Add New
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

export default connect(mapStateToProps, mapDispatchToProps)(ModleUser);
