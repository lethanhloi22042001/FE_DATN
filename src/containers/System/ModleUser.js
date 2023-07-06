import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import './UserManage.scss'
import { connect } from 'react-redux';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
  } from 'reactstrap';

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
    }
    componentDidMount() {

    }

    toggle = ()=>{
        this.props.toggleParentUserModle()
        console.log(  ' this.props.toggleParentUserModle()' ,this.props.toggleParentUserModle());
    }

    handleOnChangeInput = (event, name)=>{
            // Lấy ra (event.target.value) bằng các copy
            //  + Lấy dữ liệu ra ra các state
           
            let copysate =  {...this.state} ;
            copysate[name] = event.target.value ;
            this.setState({...copysate});
            // cập nhật lại các state

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

        // const stateValues = Object.values(this.state);
        // console.log(stateValues,'this is stateValues');
    

        // const isValid = stateValues.every(value => value !== '');
        // if (!isValid) {
        //     alert('Vui lòng điền đầy đủ thông tin');
        //   }
        return isValid ;
    }

    handleAddNewUser = ()=>{
        let check = this.isFill();
        if(check ===true){
            this.props.createNewUser(this.state);
        }


    }
    
    
    render() {
        console.log('check Child props',this.props );
        console.log('check Child openmodl',this.props.test  );
        return (
            <Modal isOpen={this.props.isOpen} toggle={()=>{}} className={'modal-user-container'}>

            <ModalHeader toggle={ ()=>{this.toggle()}}>Modal title</ModalHeader>
            <ModalBody>
            <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input   type='text' onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                value={this.state.email}
                            ></input>
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input
                                 
                                value={this.state.password}
                                type='password' onChange={(event) => this.handleOnChangeInput(event, 'password')}></input>
                        </div>
                    </div>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>First name</label>
                            <input
                                value={this.state.firstName}
                                type='text' onChange={(event) => this.handleOnChangeInput(event, 'firstName')}></input>
                        </div>
                        <div className='input-container'>
                            <label>Last name</label>
                            <input
                                value={this.state.lastName}
                                type='text' onChange={(event) => this.handleOnChangeInput(event, 'lastName')}></input>
                        </div>
                    </div>
                    <div className='modal-user-body1'>
                        <div className='input-container1'>
                            <label>Address</label>
                            <input
                                value={this.state.address}
                                type='text' onChange={(event) => this.handleOnChangeInput(event, 'address')}></input>
                        </div>
                    </div>

            </ModalBody>
            <ModalFooter>
            <Button color="primary" onClick={ ()=>{this.handleAddNewUser()}}>
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
