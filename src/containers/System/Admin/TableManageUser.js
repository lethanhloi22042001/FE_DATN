import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import './TableManageUser.scss'
import { connect } from 'react-redux';
import _ from 'lodash'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
  } from 'reactstrap';
import * as actions from "../../../store/actions";


import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log('handleEditorChange', html, text);
}


class TableManageUser extends Component {
    constructor(props){
        super(props)
        this.state  = {
            arrLoadData : [],
            email: "",
            password: "",
            lastName: "",
            firstName: "",
            phonenumber: "",
            address: "",
            gender: "",
            roleId: "",
            position: "",
            avatar: "",
        }
    }

    componentDidMount() {
        this.props.dispatchGetlAllUserAdminReducer();
        this.setState({
            arrLoadData: this.props.arrLoadDataStatetoProp,
          })

    }
     componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.arrLoadDataStatetoProp !== this.props.arrLoadDataStatetoProp) {
          this.setState({
            arrLoadData: this.props.arrLoadDataStatetoProp,
          },()=>{
            console.log('this is arrLoadData Of TableManage',this.state.arrLoadData);
          })
        }
    }
    handdleDelete(dataId){
        alert('da xoa thanh cong');
        this.props.dispatchDeleteUserAdminReducer(dataId);
    };
    handdleEditUser(data){
        alert('da lay thanh cong');
        this.props.handleEditUserFromParentKey(data)
        console.log('day ne ae',this.props);
    }

    render() {
        let arrLoadDataRender = this.state.arrLoadData ;
        return(
            <React.Fragment>
                <section className="table__body">
                    <table>
                        <thead>
                        <tr>
                            <th> Id <span className="icon-arrow"><i className="fas fa-arrow-up"></i></span></th>
                            <th> Email <span className="icon-arrow"><i className="fas fa-arrow-up"></i></span></th>
                            <th> Firs tName <span className="icon-arrow"><i className="fas fa-arrow-up"></i></span></th>
                            <th> Last Name <span className="icon-arrow"><i className="fas fa-arrow-up"></i></span></th>
                            <th> Address <span className="icon-arrow"><i className="fas fa-arrow-up"></i></span></th>
                            <th> Gender <span className="icon-arrow"><i className="fas fa-arrow-up"></i></span></th>
                            <th> RoleId <span className="icon-arrow"></span></th>
                            <th> Phone Number <span className="icon-arrow"></span></th>
                            <th> Position ID <span className="icon-arrow"></span></th>
                            <th> Image <span className="icon-arrow"></span></th>
                        </tr>
                        </thead>
                        <tbody>
                            
                        { arrLoadDataRender && arrLoadDataRender.map((item,index)=>{
                                    return(
                                        <tr key={item.id}>
                                            <td  >{item.id}</td>
                                            <td  >{item.email}</td>
                                            <td  > {item.firstName}</td>
                                            <td  > {item.lastName} </td>
                                            <td  > {item.address} </td>
                                            <td  > {item.gender} </td>
                                            <td  > {item.roleId} </td>
                                            <td  > {item.phonenumber} </td>
                                            <td  > <strong> {item.positionId} </strong></td>
                                            <td className='btn-addDelete'  >
                                                {/* <p className="status delivered">Delivered</p> */}
                                                <button  className='status delivered asd1' onClick={()=>{
                                                    this.handdleDelete(item.id) ;
                                                }}>Deleted</button>
                                                <button className='status delivered asd' onClick={()=>{
                                                    this.handdleEditUser(item);
                                                }}>Edit User</button>
                                            </td>
                                        </tr>
                                    ) 
                                })
                                }
                        </tbody>
                    </table>
                </section>
                <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
            </React.Fragment>
            );
    }

}

const mapStateToProps = state => {
    return {
        arrLoadDataStatetoProp: state.adminReducerRoot.arrLoadData,
    };

};

const mapDispatchToProps = dispatch => {
   
    return {
        dispatchGetlAllUserAdminReducer: () => {
            dispatch(actions.getAllUserRedux());
          },
        dispatchDeleteUserAdminReducer: (data) => {
            dispatch(actions.deleteUserRedux(data));
          },
        dispatchUpdateUserAdminReducer: (data) => {
            dispatch(actions.updateUserRedux(data));
          },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
