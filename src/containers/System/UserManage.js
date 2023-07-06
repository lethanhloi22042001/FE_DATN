import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import { getAllUsers } from '../../services/userService';
import ModleUser from './ModleUser'
class UserManage extends Component {
    constructor(props){
        super(props)
        this.state = {
            arrUsers : [],
            isOpenModalUser : false ,
        }
    }

    async componentDidMount() {
        let response = await getAllUsers('ALL'); 
        console.log('ths is response',response);
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

    createNewUser = (data)=>{
            // alert("Call me")
            console.log('check data from child'  ,data);
    }
    render() {
        let arrUsers = this.state.arrUsers  ;
        return (
                <div className="tables">
                    <ModleUser isOpen  = {this.state.isOpenModalUser}
                                test = {'Hello may cu'}
                                toggleParentUserModle ={this.toggleUserModle}
                                size='lg'
                                createNewUser  = {this.createNewUser}
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
                                        <button type="" className='status delivered asd1'>Deleted</button>
                                        <button type="" className='status delivered asd'>Add</button>
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
