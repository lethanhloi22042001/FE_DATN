import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getAllDoctor } from '../../../services/userService'
import * as actions from '../../../store/actions'
import './ManageDoctor.scss'

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

import Select from 'react-select';
import { LANGUAGES } from '../../../utils';
// import { getDetailInfoDoctor } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
// import { preProcessFile } from 'typescript';


const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedOption: '',
            description: '',
            contentMarkdown : '',
            contentHTML : '',
            listDoctors  : [],
            // detailDoctors: []
        }
    }


    componentDidMount() {
        this.props.dispatchAdminReducerGetAllDoctor();
    }
    buildDataInputSelect = (inputData) =>{
        let result = [] ;
        let {language} = this.props ;
        if(inputData && inputData.length > 0){
            inputData.map( (item,index)=>{
                let Object = {};
                let lableVi = `${item.lastName} ${item.firstName}` ;
                let lableEn = `${item.firstName} ${item.lastName}` ;

                Object.label = language === LANGUAGES.VI ? lableVi : lableEn ;
                Object.value = item.id ;
                result.push(Object)
            } );
        }
        console.log('this is result',result);
        return result ;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSlect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSlect,
            });
          }
          if (prevProps.language !== this.props.language) {
            let dataSlect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSlect,
            });
          }
        
    }
   
    handleChange = (selectedOption)=>{
        this.setState({
            selectedOption
        });
    }
    
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }

    handleDescription = (event)=>{
        this.setState({  
            description : event.target.value
        });
    }
   
    handleSaveContentMarkdown = ()=>{
        this.props.dispatchAdminReducerSaveDoctor({
            selectedOption: this.state.selectedOption,
            description: this.state.description,
            contentMarkdown : this.state.contentMarkdown,
            contentHTML : this.state.contentHTML,
        });
    }
  

    render() {
        let listDoctors = this.state.listDoctors;
        console.log('Xem State',listDoctors);
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'><FormattedMessage id="admin.manage-doctor.title" /></div>
                <div className='more-info'>
                    <div className='content-left form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.choose-doctor" /></label>
                        <Select
                            options={this.state.listDoctors}
                            
                            defaultValue={this.state.selectedOption}
                            onChange = { this.handleChange}
                            placeholder={<FormattedMessage id="admin.manage-doctor.choose-doctor" />}
                        />
                    </div>
                    <div className='content-right'>
                        <label><FormattedMessage id="admin.manage-doctor.intro" /></label>
                        <textarea
                            className='form-control' rows='4'
                            value={this.state.description}
                            onChange={ (event)=>{ this.handleDescription(event)} }
                        >
                        </textarea>
                    </div>
                </div>
                <div className='more-info-extra row'>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.price" /></label>
                        <Select
                            // value={this.state.selectedPrice}
                            // onChange={this.handleChangeSelectDoctorInfo}
                            // options={this.state.listPrice}
                            placeholder={<FormattedMessage id="admin.manage-doctor.price" />}
                            name="selectedPrice"
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.payment" /></label>
                        <Select
                            // value={this.state.selectedPayment}
                            // onChange={this.handleChangeSelectDoctorInfo}
                            // options={this.state.listPayment}
                            placeholder={<FormattedMessage id="admin.manage-doctor.payment" />}
                            name="selectedPayment"
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.province" /></label>
                        <Select
                            // value={this.state.selectedProvince}
                            // onChange={this.handleChangeSelectDoctorInfo}
                            // options={this.state.listProvince}
                            placeholder={<FormattedMessage id="admin.manage-doctor.province" />}
                            name="selectedProvince"
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.clinic-name" /></label>
                        <input className='form-control'
                            // onChange={(event) => this.handleOnchangeText(event, 'nameClinic')}
                            // value={this.state.nameClinic}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.clinic-address" /></label>
                        <input className='form-control'
                            // onChange={(event) => this.handleOnchangeText(event, 'addressClinic')}
                            // value={this.state.addressClinic}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.clinic-note" /></label>
                        <input className='form-control'
                            // onChange={(event) => this.handleOnchangeText(event, 'note')}
                            // value={this.state.note}
                        />
                    </div>
                </div>
                <div className='row specialty-choice'>
                    <div className='col-4 from-group'>
                        <label><FormattedMessage id="admin.manage-doctor.choose-specialty" /></label>
                        <Select
                            // value={this.state.selectedSpecialty}
                            // onChange={this.handleChangeSelectDoctorInfo}
                            // options={this.state.listSpecialty}
                            placeholder={<FormattedMessage id="admin.manage-doctor.choose-specialty" />}
                            name="selectedSpecialty"
                        />
                    </div>
                    <div className='col-8 from-group'>
                        <label><FormattedMessage id="admin.manage-doctor.choose-clinic" /></label>
                        <Select
                            defaultValue={this.state.selectedClinic}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={this.state.listClinic}
                            placeholder={<FormattedMessage id="admin.manage-doctor.choose-clinic" />}
                            name="selectedClinic"
                        />
                    </div>
                </div>
                <div className='manage-doctor-editor'>
                    <MdEditor style={{ height: '300px' }}
                        renderHTML={text => mdParser.render(text)}
                        defaultValue={this.state.contentMarkdown}
                        // onChange={this.handleContentMarkdown(event)}
                        // onChange={ (event)=>{this.handleContentMarkdown(event)}}
                        onChange={this.handleEditorChange}
                    />
                </div>
                <button
                    onClick={() => this.handleSaveContentMarkdown()}
                    // className={hasOldData === true ? 'save-content-doctor' : 'create-content-doctor'}>
                    className='save-content-doctor' >
                            Save
                </button>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctors: state.adminReducerRoot.doctorAllArr,
        // detailDoctors: state.adminReducerRoot.detail,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        dispatchAdminReducerGetAllDoctor: () => {
            dispatch(actions.getAllDoctorRedux());
          },
        dispatchAdminReducerSaveDoctor: (data) => {
            dispatch(actions.SaveDetailDoctorRedux(data));
          },

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);