import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import "./ManageSchedule.scss";
import Select from "react-select";
import * as actions from "../../../store/actions";
import { LANGUAGES, dateFormat } from "../../../utils";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
import { toast } from "react-toastify";
import _, { result } from "lodash";
import { saveBulkScheduleDoctor } from "../../../services/userService";

class ManageSchedule extends Component {
  //selectedOption: null,
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
      listDoctors: [],
      selectedDoctor: {},
      currentDate: "",
      rangeTime: [],
    };
  }
  componentDidMount() {
    this.props.dispatchAdminReducerGetAllDoctor();
    this.props.dispatchAllScheduleTime();
  }

  buildDataInputSelect = (inputData) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let Object = {};
        // nối chuỗi
        let lableVi = `${item.lastName} ${item.firstName} `;
        let lableEn = `${item.firstName} ${item.lastName} `;

        Object.label = language === LANGUAGES.VI ? lableVi : lableEn;
        Object.value = item.id;
        result.push(Object);
      });
    }
    // console.log('this is result',result);
    return result;
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSlect = this.buildDataInputSelect(this.props.allDoctors);
      console.log("listDoctors", dataSlect);
      this.setState({
        listDoctors: dataSlect,
      });
    }
    if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
      let rangeTime = this.props.allScheduleTime;
      if (rangeTime && rangeTime.length > 0) {
        rangeTime = rangeTime.map((item) => ({ ...item, isSelected: false }));
      }
      this.setState({
        rangeTime: rangeTime,
      });
    }
  }

  handleChangeSelect = (selectedDoctor) => {
    this.setState({ selectedDoctor: selectedDoctor });
  };

  handleChangeDatePicker = (date) => {
    this.setState({ currentDate: date[0] }, () => {
      console.log("currentDate", this.state.currentDate);
    });
  };

  handleClicked = (data) => {
    console.log("data", data);
    let dataFrRedux = this.state.rangeTime;
    if (dataFrRedux && dataFrRedux.length > 0) {
      dataFrRedux.map((item) => {
        if (item.id === data.id) {
          item.isSelected = !item.isSelected;
        }
      });
    }
    this.setState({
      rangeTime: dataFrRedux,
    });
  };

  handleSave = async () => {
    let { rangeTime, selectedDoctor, currentDate } = this.state;
    let result = [];
    if (selectedDoctor && _.isEmpty(selectedDoctor)) {
      toast.error("Invalid selected doctor!");
      return;
    }
    if (!currentDate) {
      toast.error("Invalid date!");
      return;
    }

    let formatedDate = new Date(currentDate).getTime();
    if (rangeTime && rangeTime.length > 0) {
      let selectedTime = rangeTime.filter((item) => item.isSelected === true);
      if (selectedTime && selectedTime.length > 0) {
        // Khi chọn 1 cái là tạo 1 Object
        // Nên ở đây cần lưu dưới DB là dạng bulk...
        selectedTime.map((schedule, index) => {
          let object = {};
          object.doctorId = selectedDoctor.value;
          object.date = formatedDate;
          object.timeType = schedule.keyMap;
          result.push(object);
        });
      } else {
        toast.error("Invalid selected time!");
      }
    }

    let res = await saveBulkScheduleDoctor({
      arrSchedule: result,
      doctorId: selectedDoctor.value,
      formatedDate: formatedDate,
    });

    if (res && res.errCode === 0) {
      toast.success("Schedule saved successfully!");
    } else {
      toast.error("Schedule saved Failed!");
      console.log("error saveBulkScheduleDoctor: ", res);
    }
    console.log("check result: ", result, "formatedDate", formatedDate);
  };
  render() {
    let { rangeTime } = this.state;
    let { language } = this.props;
    let yesterday = new Date(new Date().setDate(new Date().getDate()-1));
    return (
      <div className="manage-schedule-container">
        <div className="m-s-title">
          <FormattedMessage id="manage-schedule.title" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="manage-schedule.choose-doctor" />
              </label>
              <Select
                options={this.state.listDoctors}
                value={this.state.selectedDoctor}
                onChange={this.handleChangeSelect}
              />
            </div>

            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="manage-schedule.choose-date" />
              </label>
              <DatePicker
                onChange={this.handleChangeDatePicker}
                className="form-control"
                minDate={yesterday}
                value={this.state.currentDate[0]}
              />
            </div>
            <div className="col-12 pick-hour-container">
              {rangeTime &&
                rangeTime.length > 0 &&
                rangeTime.map((item, index) => {
                  return (
                    <button
                      key={index}
                      className={
                        item.isSelected === true
                          ? "btn btn-schedule btn-save-schedule active"
                          : "btn btn-schedule btn-save-schedule"
                      }
                      onClick={() => {
                        this.handleClicked(item);
                      }}
                    >
                      {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                    </button>
                  );
                })}
            </div>
            <div className="col-12">
              <button className="btn btn-primary" onClick={this.handleSave}>
                <FormattedMessage id="manage-schedule.save" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    allDoctors: state.adminReducerRoot.doctorAllArr,
    allScheduleTime: state.adminReducerRoot.allScheduleTime,
  };
};

const mapDispatchToProps = (dispatch) => {
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
