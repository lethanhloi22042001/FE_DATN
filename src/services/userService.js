import axios from "../axios";

const handleLoginApi = (userEmail, userPassword) => {
  // axios này khi nãy mình search có nghĩa là nó là chổ để gọi CRUD API
  return axios.post("/api/login", { email: userEmail, password: userPassword });
};

const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`, {
    id: inputId,
  });
};

const createNewUserService = (data) => {
  return axios.post("/api/create-new-user", data);
};

const deleteNewUserService = (userId) => {
  return axios.delete("/api/delete-user", { data: { id: userId } });
};
const updateUser = (userId) => {
  return axios.put("/api/edit-user", userId );
};


const getAllCode = (role) => {
  return axios.get(`/api/getallcode?type=${role}`);
};
const getTopDoctorService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`)
};
// Lấy Toàn Bộ Bác Sĩ
const getAllDoctor = () => {
  return axios.get(`/api/getAllDoctor`);
};

// Lưu Thông Tin Chi Tiết Một Bác Sĩ
const SaveInfoDoctor = (data) => {
  return axios.post(`/api/save-info-doctor`,data);
};



//Láy Tin Chi Tiết Một Bác Sĩ + Thông Tin MarkDown

const getDetailInfoDoctor = (data) => {
  return axios.get(`/api/get-detail-doctor-by-id?id=${data}`);
};

//Láy Tin Chi Tiết Một Bác Sĩ + Thông Tin MarkDown

const getSelectedOption = (dataId) => {
  return axios.get(`/api/getSelectedOption`,dataId);
};

const saveBulkScheduleDoctor = (data) => {
  return axios.post('/api/bulk-create-schedule', data)
}
const getScheduleDoctorByDate = (doctorId, date) => {
  return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`)
}



export {
  handleLoginApi,
  getAllUsers,
  createNewUserService,
  deleteNewUserService,
  updateUser,
  getAllCode,
  getTopDoctorService,
  getAllDoctor,
  SaveInfoDoctor,
  getDetailInfoDoctor,
  saveBulkScheduleDoctor,
  getScheduleDoctorByDate,
  

};
