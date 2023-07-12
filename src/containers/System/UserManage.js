import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import { getAllUsers ,createNewUserService ,deleteNewUserService, handleLoginApi} from '../../services/userService';
import {emitter} from '../../utils/emitter' ;
import ModleUser from './ModleUser'
import ModleEditUser from './ModleEditUser';


class UserManage extends Component {
    constructor(props){
        super(props)
        this.state = {
            arrUsers : [],
            isOpenModalUser : false ,
            isOpenEditUser  : false ,
        }
    }

    async componentDidMount() {
        await this.getAllUsersFromReact();
    }
    
    getAllUsersFromReact = async()=>{
        let response = await getAllUsers('ALL'); 
        // response {errCode: 0, errMessage: 'OK', users: Array(8)} 
        if(response && response.errCode === 0){
            this.setState({
                arrUsers : response.users
            },()=>{
                // console.log('Check Status' , this.state.users);
            });
            // console.log('Check Status 1' , this.state.users);
        }
    }

    state = {

    }
    // bấm bên ADD cú thì isOpenModalUser thành "true" xong toggleUserModle hiện lên
    // xét toggleUserModle 
    handleAddUser = ()=>{
            this.setState({isOpenModalUser : true}) 
        }

    toggleUserModle = ()=>{
        this.setState({
            isOpenModalUser : !this.state.isOpenModalUser 
        });
    }

    createNewUser = async (data)=>{
        // data là những gì mình nạp vào

        let response = await createNewUserService(data);
        // response {errCode: 0, message: 'OK'}

        if(response && response.errCode !== 0){
            alert(response.errMessage) ;
        }else{
            await this.getAllUsersFromReact();
            this.setState({
                isOpenModalusers: false
            })
            emitter.emit('EVENT_CLEAR_MODAL_DATA', { 'id': 'your id' })
        }
    }
    handledelete = async (data)=>{
            console.log(data,'this is delet Data');
            let response = await deleteNewUserService(data.id);

            if(response && response.errCode !== 0){
                alert("xoa chua thanh cong")
            }else{
                await this.getAllUsersFromReact();
            }
    }

    handdleEditUser = async(data)=>{
        console.log('this is data of handdleEditUser',data);
        this.setState({isOpenEditUser : true});
    }

    render() {
        let arrUsers = this.state.arrUsers  ;
        return (
                <div className="tables">
                    <ModleUser isOpen  = {this.state.isOpenModalUser}
                                test = {'Hello may cu'}
                                toggleParentUserModle ={this.toggleUserModle} // khi click ra ngoài thì form biến mất
                                size='lg'
                                createNewUser = {this.createNewUser}
                    />

                    <ModleEditUser
                        
                        isOpen  = {this.state.isOpenEditUser}
                    
                    
                    />

                <h1 className='text-center'>Manage users</h1>
                    <img src="images/search.png" alt="" />
                <div className='addNewUser' onClick={ ()=>{this.handleAddUser()}}>
                <a href="#" class="btn btn-primary btn-lg active btnAddUser" role="button" aria-pressed="true">Add New User</a>
                </div>
                <section className="table__body">
                <table>
                    <thead>
                    <tr>
                        <th> Id <span className="icon-arrow"><i class="fas fa-arrow-up"></i></span></th>
                        <th> Email <span className="icon-arrow"><i class="fas fa-arrow-up"></i></span></th>
                        <th> Firs tName <span className="icon-arrow"><i class="fas fa-arrow-up"></i></span></th>
                        <th> Last Name <span className="icon-arrow"><i class="fas fa-arrow-up"></i></span></th>
                        <th> Address <span className="icon-arrow"><i class="fas fa-arrow-up"></i></span></th>
                        <th> Phone Number <span className="icon-arrow"><i class="fas fa-arrow-up"></i></span></th>
                        <th> Actions <span className="icon-arrow"></span></th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* <tr> */}
                        { arrUsers && arrUsers.map((item,index)=>{
                            console.log('check map',item,index);
                            return(
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.email}</td>
                                    <td> {item.firstName}</td>
                                    <td> {item.lastName} </td>
                                    <td> {item.address} </td>
                                    <td> <strong> {item.phonenumber} </strong></td>
                                    <td className='btn-addDelete'>
                                        {/* <p className="status delivered">Delivered</p> */}
                                        <button type="" className='status delivered asd1' onClick={()=>{
                                            this.handledelete(item) 
                                        }}>Deleted</button>
                                        <button type="" className='status delivered asd' onClick={()=>{
                                            this.handdleEditUser(item);
                                        }}>Edit User</button>
                                    </td>
                                </tr>
                            ) 
                        })
                        }
                    {/* </tr> */}
                    </tbody>
                </table>
                </section>
          </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
