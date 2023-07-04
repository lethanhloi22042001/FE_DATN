import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import { getAllUsers } from '../../services/userService';
class UserManage extends Component {
    constructor(props){
        super(props)
        this.state = {
            arrUsers : []

        }
    }

    async componentDidMount() {
        let response = await getAllUsers('ALL'); 
        console.log('ths is response',response);
        if(response && response.errCode === 0){
            this.setState({
                arrUsers : response.users
            },()=>{
                console.log('Check Status' , this.state.users);
            });
            console.log('Check Status 1' , this.state.users);
        }
    }


    state = {

    }



    render() {
        let arrUsers = this.state.arrUsers ;
        return (

            <div className="tables">
                <div className="text-center">Manage users</div>
                <h1 className='text-center'>Manage users</h1>
                    <img src="images/search.png" alt="" />
                
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
                                    <td> <img src="images/Zinzu Chan Lee.jpg" alt="" />{item.firstName}</td>
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
