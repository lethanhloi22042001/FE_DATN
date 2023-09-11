import actionTypes from "../actions/actionTypes";

const initialState = { // cục dữ liệu
  gender : [],
  role : [],
  position : [],
  arrLoadData : [],
  doctorArrOutStandingDoctor : [],
  doctorAllArr : [],
  detail: [],
  allScheduleTime : [],



};

const adminReducer = (state = initialState, action) => {
  switch (action.type) { 
    // CASE MALE-GIOI TINH
    case actionTypes.START:
      return {
        ...state,
      };
    case actionTypes.SUCCESS:
      let copyState = {...state} ;  // tạo 1 mảng mới
      copyState.gender = action.data ; // action.data: data thay đổi liên tục sau đó nhét dữ liệu vô mảng tạo trên
      return {
        ...copyState,
      };
    case actionTypes.FAILED:
      console.log(" START a3");
      return {
        ...state,
      };

      // CASE POSITION
      case actionTypes.POSITION_START:
        console.log('POSITION_START 1');
        return {
          ...state,
        };
      case actionTypes.POSITION_SUCCESS:
          let stateposition = {...state} ;
          stateposition.position = action.data ;
        return {
          ...stateposition,
        };
      case actionTypes.POSITION_FAIL:
        console.log(" POSITION_START a3");
        return {
          ...state,
        };


        // CASE ROLE
      case actionTypes.ROLE_START:
        console.log('ROLE_START 1');
        return {
          ...state,
        };
      case actionTypes.ROLE_SUCCESS:
          let state_role = {...state} ;
          state_role.role = action.data ;
        return {
          ...state_role,
        };
      case actionTypes.ROLE_FAIL:
        console.log("ROLE_START a3");
        return {
          ...state,
        };

//CREATE USER REDUX
case actionTypes.CREATE_START:
        console.log('CREATE_START 1');
        return {
          ...state,
        };
      case actionTypes.CREATE_SUCESS:
          let state_create = {...state} ;
          state_create = action ;
        return {
          ...state_create,
        };
      case actionTypes.CREATE_FAILED:
        console.log("CREATE_START a3");
        return {
          ...state,
        };
//GETALL USER REDUX
case actionTypes.GETALL_START:
        console.log('GETALL_START 1');
        return {
          ...state,
        };
case actionTypes.GETALL_SUCESS:
          let state_getALL = {...state} ;
          state_getALL.arrLoadData = action.data ;
        return {
          ...state_getALL,
        };
case actionTypes.GETALL_FAILED:
        console.log("GETALL_START a3");
        return {
          ...state,
        };

/////============DELETE
case actionTypes.DELETE_START:
        console.log('GETALL_START 1');
        return {
          ...state,
        };
case actionTypes.DELETE_SUCCESS:
          console.log('this is action of DELETE CreateUserRedux');
        return {
          ...state,
        };
case actionTypes.DELETE_FAIL:
        console.log("GETALL_START a3");
        return {
          ...state,
        };

/////============GET DOCTOR
case actionTypes.GETDOCTOR_START:
        console.log('GETDOCTOR_START 1');
        return {
          ...state,
        };
case actionTypes.GETDOCTOR_SUCCESS:
        console.log('this is action of GETDOCTOR_SUCCESS',action);
        let state_getDoctor = {...state} ;
        state_getDoctor.doctorArrOutStandingDoctor = action.data ;
        return {
          ...state_getDoctor,
        };
case actionTypes.GETDOCTOR_FAIL:
        console.log("GETDOCTOR_FAIL a3");
        return {
          ...state,
        };


/////============GET ALL DOCTOR
case actionTypes.GETALLDOCTOR_START:
        console.log('GET ALL DOCTOR');
        return {
          ...state,
        };
case actionTypes.GETALLDOCTOR_SUCCESS:
        let state_getAllDoctor = {...state} ;
        state_getAllDoctor.doctorAllArr = action.data ;
        return {
          ...state_getAllDoctor,
        };
case actionTypes.GETALLDOCTOR_FAIL:
        console.log("GET_ALL_DOCTOR FAIL");
        return {
          ...state,
        };

///============Get All Time Schedule Doctor
 
case actionTypes.FETCH_ALLCODE_SCHEDUAL_HOURS_SUCCESS:
        let copyStates = {...state} ;
        copyStates.allScheduleTime = action.dataTime ;
        return {
          ...copyStates,
        };
case actionTypes.FETCH_ALLCODE_SCHEDUAL_HOURS_FAIL:
        console.log("FETCH_ALLCODE_SCHEDUAL_HOURS_FAIL");
        return {
          ...state,
        };


    default:
      return state;
  }
};

export default adminReducer;
