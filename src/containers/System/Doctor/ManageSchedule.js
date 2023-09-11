import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import './ManageSchedule.scss' ;
import Select from 'react-select';
import * as actions from '../../../store/actions'
import { LANGUAGES } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
  
class ManageSchedule extends Component {
    //selectedOption: null,
    constructor(props) {
        super(props);
        this.state = {
          selectedOption: null,
          listDoctors : [],
          selectedDoctor : {},
          currentDate: '',
          rangeTime : [],

        }
    } 
    componentDidMount() {
        this.props.dispatchAdminReducerGetAllDoctor();
        this.props.dispatchAllScheduleTime();
    }

    buildDataInputSelect = (inputData) =>{
        let result = [] ;
        let {language} = this.props ;
        if(inputData && inputData.length > 0){
            inputData.map( (item,index)=>{
                let Object = {};
                // nối chuỗi
                let lableVi = `${item.lastName} ${item.firstName} ` ; 
                let lableEn = `${item.firstName} ${item.lastName} ` ;

                Object.label = language === LANGUAGES.VI ? lableVi : lableEn ;
                Object.value = item.id ;
                result.push(Object)
            } );
        }
        // console.log('this is result',result);
        return result ;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSlect = this.buildDataInputSelect(this.props.allDoctors)
            console.log('listDoctors',dataSlect);
            this.setState({
                listDoctors: dataSlect,
            });
          }
          if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            this.setState({
                rangeTime: this.props.allScheduleTime
            });
          }
        
    }

    handleChangeSelect = (selectedDoctor) => {
        this.setState({ selectedDoctor :selectedDoctor });
      };

      
    handleChangeDatePicker = (date) => {
        this.setState({ currentDate : date[0] },
            ()=>{
                console.log('currentDate',this.state.currentDate);
            });
    }

    render() {
        let {rangeTime} = this.state ;
        let {language} = this.props ;
        return (
            <div className='manage-schedule-container'>
                <div className='m-s-title'>
                    <FormattedMessage id='manage-schedule.title' />
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6 form-group'>
                             <label>
                                <FormattedMessage id='manage-schedule.choose-doctor' />
                            </label>
                            <Select 
                                options = {this.state.listDoctors}
                                value = {this.state.selectedDoctor}
                                onChange = {this.handleChangeSelect}
                            />

                        </div>

                        <div className='col-6 form-group'>
                            <label>
                                <FormattedMessage id='manage-schedule.choose-date' />
                            </label>
                            <DatePicker
                                onChange={this.handleChangeDatePicker}
                                className='form-control'
                                minDate={new Date()}
                                value={this.state.currentDate[0]}
                            />
                        </div>
                        <div className='col-12 pick-hour-container'>
                        { rangeTime && rangeTime.length > 0 && rangeTime.map((item,index)=>{
                                    return(
                                        <button key="keyMap" className = 'btn btn-schedule btn-save-schedule active'>
                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn} 
                                        </button>
                                    ) 
                            })
                        }
                            
                               
                        </div>
                        <div className='col-12'>
                            <button className='btn btn-primary'>
                                <FormattedMessage id='manage-schedule.save' />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}



const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allDoctors: state.adminReducerRoot.doctorAllArr,
        allScheduleTime : state.adminReducerRoot.allScheduleTime,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        //getAllDoctorRedux
        dispatchAdminReducerGetAllDoctor: () => {
            dispatch(actions.getAllDoctorRedux());
          },
        dispatchAllScheduleTime: () => {
            dispatch(actions.fetchAllScheduleTime());
          },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
