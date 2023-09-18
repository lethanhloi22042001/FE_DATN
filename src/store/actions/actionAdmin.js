import actionTypes from "./actionTypes";
import {
  getAllCode,
  createNewUserService,
  getAllUsers,
  deleteNewUserService,
  updateUser,
  getTopDoctorService,
  getAllDoctor,
  SaveInfoDoctor,
} from "../../services/userService";
import { toast } from "react-toastify"; // toast : thư viện dùng để hiện thị thông báo giống như alert
// export const startDoing = () => ({
//     type: actionTypes.START,
// });
export const startDoing = () => {
  return async (dispatch, getState) => {
    try {
      let data = await getAllCode("GENDER");
      console.log("data", data);
      if (data && data.errCode === 0) {
        dispatch(success(data.data));
      } else {
        dispatch(failed());
      }
    } catch (error) {
      dispatch(failed());
      console.log(error);
    }
  };
};

export const success = (data) => ({
  type: actionTypes.SUCCESS,
  data: data,
});

export const failed = () => ({
  type: actionTypes.FAILED,
});

export const startDoingPosition = () => {
  return async (dispatch, getState) => {
    try {
      let data = await getAllCode("POSITION");
      if (data && data.errCode === 0) {
        dispatch(successPosition(data.data));
      } else {
        dispatch(failedPosition());
      }
    } catch (error) {
      dispatch(failed());
      console.log(error);
    }
  };
};

export const successPosition = (data) => ({
  type: actionTypes.POSITION_SUCCESS,
  data: data,
});

export const failedPosition = () => ({
  type: actionTypes.POSITION_FAIL,
});

// ROLE

export const startDoingRole = () => {
  return async (dispatch, getState) => {
    try {
      let data = await getAllCode("ROLE");
      if (data && data.errCode === 0) {
        dispatch(successRole(data.data));
      } else {
        dispatch(failedRole());
      }
    } catch (error) {
      dispatch(failed());
      console.log(error);
    }
  };
};

export const successRole = (data) => ({
  type: actionTypes.ROLE_SUCCESS,
  data: data,
});

export const failedRole = () => ({
  type: actionTypes.ROLE_FAIL,
});

// --------------CREATE USER--------------

export const createUserRedux = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserService(userId);
      if (res && res.errCode === 0) {
        toast.success("Đã tạo thành công ");
        dispatch(createUserReduxSucess());
        dispatch(getAllUserRedux());
      } else {
        dispatch(createUserReduxFailed());
      }
    } catch (errCode) {
      dispatch(createUserReduxFailed());
      console.log("saveUserFailed", errCode);
    }
  };
};

export const createUserReduxSucess = () => ({
  type: actionTypes.CREATE_SUCESS,
});

export const createUserReduxFailed = () => ({
  type: actionTypes.CREATE_FAILED,
});

// --------------GetAll USER--------------

export const getAllUserRedux = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers("ALL");
      let test = await getTopDoctorService(3);
      console.log("Test API DOCTOR", test);
      if (res && res.errCode === 0) {
        dispatch(getAllUserReduxUserReduxSucess(res.users.reverse()));
      } else {
        dispatch(getAllUserReduxUserReduxFailed());
      }
    } catch (errCode) {
      dispatch(getAllUserReduxUserReduxFailed());
      console.log("saveUserFailed", errCode);
    }
  };
};

export const getAllUserReduxUserReduxSucess = (data) => ({
  type: actionTypes.GETALL_SUCESS,
  data: data,
});

export const getAllUserReduxUserReduxFailed = () => ({
  type: actionTypes.GETALL_FAILED,
});

// --------------DELETE USER--------------

export const deleteUserRedux = (data) => {
  return async (dispatch, getState) => {
    try {
      let dispat = await deleteNewUserService(data);
      if (dispat && dispat.errCode === 0) {
        dispatch(deleteUserReduxUserReduxSucess());
        dispatch(getAllUserRedux());
      } else {
        dispatch(deleteUserReduxUserReduxFailed());
      }
    } catch (errCode) {
      dispatch(deleteUserReduxUserReduxFailed());
      console.log("saveUserFailed", errCode);
    }
  };
};

export const deleteUserReduxUserReduxSucess = () => ({
  type: actionTypes.DELETE_SUCCESS,
});

export const deleteUserReduxUserReduxFailed = () => ({
  type: actionTypes.DELETE_FAIL,
});

// --------------UPDATE USER--------------

export const updateUserRedux = (data) => {
  console.log("da ta cua updateUserRedux", data);
  return async (dispatch, getState) => {
    try {
      let dispat = await updateUser(data);
      if (dispat && dispat.errCode === 0) {
        toast.success("Cập Nhật Thành Công");
        dispatch(updateUserReduxUserReduxSucess());
        dispatch(getAllUserRedux());
      } else {
        dispatch(updateUserReduxUserReduxFailed());
      }
    } catch (errCode) {
      dispatch(deleteUserReduxUserReduxFailed());
      console.log("saveUserFailed", errCode);
    }
  };
};

export const updateUserReduxUserReduxSucess = () => ({
  type: actionTypes.UPDATE_SUCCESS,
  // data : data,
});

export const updateUserReduxUserReduxFailed = () => ({
  type: actionTypes.UPDATE_FAIL,
});

// --------------GET ALL-ONE DOCTOR--------------

export const getDoctorRedux = () => {
  console.log("fire thanh cong");
  return async (dispatch, getState) => {
    try {
      let dispat = await getTopDoctorService("10");
      if (dispat && dispat.errCode === 0) {
        toast.success("Lấy Bác Sĩ Thành Công");
        dispatch(getDoctorReduxSucess(dispat.data));
      } else {
        dispatch(getDoctorReduxFailed());
      }
    } catch (errCode) {
      dispatch(getDoctorReduxFailed());
      console.log("saveUserFailed", errCode);
    }
  };
};

export const getDoctorReduxSucess = (data) => ({
  type: actionTypes.GETDOCTOR_SUCCESS,
  data: data,
});

export const getDoctorReduxFailed = () => ({
  type: actionTypes.GETDOCTOR_FAIL,
});

// --------------GET ALL DOCTOR--------------

export const getAllDoctorRedux = () => {
  return async (dispatch, getState) => {
    try {
      let Arrdata = await getAllDoctor();
      if (Arrdata && Arrdata.errCode === 0) {
        // toast.success("Lấy Toàn Bộ Bác Sĩ Thành Công");
        dispatch(getAllDoctorReduxSucess(Arrdata.data));
      } else {
        dispatch(getAllDoctorReduxFailed());
      }
    } catch (errCode) {
      dispatch(getAllDoctorReduxFailed());
      console.log("saveUserFailed", errCode);
    }
  };
};

export const getAllDoctorReduxSucess = (data) => ({
  type: actionTypes.GETALLDOCTOR_SUCCESS,
  data: data,
});

export const getAllDoctorReduxFailed = () => ({
  type: actionTypes.GETALLDOCTOR_FAIL,
});

// SAVE DETAIL A DOCTOR
export const SaveDetailDoctorRedux = (data) => {
  console.log(data);
  return async (dispatch, getState) => {
    try {
      let Arrdata = await SaveInfoDoctor(data);
      console.log("arrdata ne", Arrdata);
      if (Arrdata && Arrdata.errCode === 0) {
        toast.success("Lưu Thông Tin Bác Sĩ Thành Công");
        dispatch(SaveDetailDoctorReduxSucess());
      } else {
        dispatch(SaveDetailDoctorReduxFailed());
      }
    } catch (errCode) {
      dispatch(SaveDetailDoctorReduxFailed());
      console.log("SaveDetailDoctorReduxFailed", errCode);
    }
  };
};

export const SaveDetailDoctorReduxSucess = () => ({
  type: actionTypes.SAVEDETAILDOCTOR_SUCCESS,
});

export const SaveDetailDoctorReduxFailed = () => ({
  type: actionTypes.SAVEDETAILDOCTOR_FAIL,
});

// SAVE DETAIL A DOCTOR
export const fetchAllScheduleTime = (type) => {
  return async (dispatch, getState) => {
    try {
      let Arrdata = await getAllCode("TIME");
      if (Arrdata && Arrdata.errCode === 0) {
        // toast.success("Lấy Toàn Bộ Thời Gian Thành Công");
        dispatch(fetchAllScheduleHoursSucess(Arrdata.data));
      } else {
        dispatch(fetchAllScheduleHoursFailed());
      }
    } catch (errCode) {
      dispatch(fetchAllScheduleHoursFailed());
      console.log("saveUserFailed", errCode);
    }
  };
};
export const fetchAllScheduleHoursSucess = (data) => ({
  type: actionTypes.FETCH_ALLCODE_SCHEDUAL_HOURS_SUCCESS,
  dataTime: data,
});

export const fetchAllScheduleHoursFailed = () => ({
  type: actionTypes.FETCH_ALLCODE_SCHEDUAL_HOURS_FAIL,
});
