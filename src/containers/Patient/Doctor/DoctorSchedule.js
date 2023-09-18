import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss'
import { LANGUAGES } from '../../../utils';
import moment, { lang } from 'moment';
import localization from 'moment/locale/vi'
import { getScheduleDoctorByDate } from '../../../services/userService'
import { FormattedMessage } from 'react-intl';
// import BookingModal from './Modal/BookingModal';

class DoctorSchedule extends Component {

    constructor(props) {
        super(props)
        this.state = {
            allDays : [],
            allAvalableTime : [],
        }
    }

    async componentDidMount() {

        let {language} = this.props ;
        let allDays = this.getArrDays(language) ;
        this.setState({
            allDays : allDays ,
        });

    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        let {language} = this.props ;
        if (prevProps.language !== this.props.language) {
            let allDays = this.getArrDays(language) ;
            this.setState({
                allDays : allDays,

            });
          }
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    getArrDays = (language) => {
        let arrDate = [] ;
        for(let i = 0 ; i < 7 ; i++){
            let object = {} ;
            if(language === LANGUAGES.VI){
                object.lable = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
            }else{
                object.lable = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
            }

            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf()
            arrDate.push(object)
        }
        return arrDate ;
    }

   

    handleOnChangeSelect = async (e) => {
        
    }

    handleClickScheduleTime = (time) => {

    }

    closeModalBookingModal = () => {
    }
    // Today
    handleSelectTime = async (e)=>{
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent
            let date = e.target.value
            let res = await getScheduleDoctorByDate(doctorId, date)
            if (res && res.errCode === 0) {
                console.log('this is res',res);
                this.setState({
                    allAvalableTime: res.data ? res.data : []
                })
            }
        }
    }


    render() {
        let { allAvalableTime, allDays, isOpenModalBooking, dataScheduleTimeModal } = this.state
        let { language } = this.props ;
        
        return (
            <>
                <div className='doctor-schedule-container'>
                    <div className='all-schedule'>
                        <select
                        onChange={ (event)=>{this.handleSelectTime(event)}}
                        >
                            { allDays && allDays.map((item,index)=>{
                            return(
                                    // <option key={index} >{item.lable}</option>
                                    <option key={index} value={item.value}>
                                            {item.lable}
                                    </option>
                            ) 
                        })
                        }
                            
                        </select>
                    </div>
                    <div className='all-available-time'>
                        <div className='text-calendar'>
                            <span><i className='fas fa-calendar-alt'></i><FormattedMessage id='patient.detail-doctor.schedule' /></span>
                        </div>
                        <div className='time-content'>
                            {/* {allAvalableTime && allAvalableTime.length > 0 ?
                                <>
                                    {allAvalableTime.map((item, index) => {
                                        let timeDisplay = language === LANGUAGES.VI ?
                                            item.timeTypeData.valueVi : item.timeTypeData.valueEn
                                        return (
                                            <button
                                                key={index}
                                                className={language === LANGUAGES.VI ? 'btn-vi' : 'btn-en'}
                                                onClick={() => this.handleClickScheduleTime(item)}
                                            >{timeDisplay}
                                            </button>
                                        )
                                    })}
                                    <div className='book-free'>
                                        <span><FormattedMessage id='patient.detail-doctor.choose' />
                                            <i className='far fa-hand-point-up'></i>
                                            <FormattedMessage id='patient.detail-doctor.book-free' /></span>
                                    </div>
                                </>
                                :
                                <div className='text-text'><FormattedMessage id='patient.detail-doctor.no-schedule' /></div>
                            } */}
                            {allAvalableTime && allAvalableTime.length > 0 ? 
                            <>
                                    {
                                        allAvalableTime.map((item,index)=>{
                                            let timeTypeDisplay = language === LANGUAGES.VI? item.timeTypeData.valueVi: item.timeTypeData.valueEn ;
                                            return(
                                                <button key={index}>{timeTypeDisplay}</button>

                                            );
                                        } )
                                    }
                            </> : 
                            <div className='text-text'><FormattedMessage id='patient.detail-doctor.no-schedule' /></div>}
                        </div>
                    </div>
                </div>
            </>
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

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);