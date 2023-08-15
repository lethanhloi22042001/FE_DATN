import actionTypes from "../actions/actionTypes";

const initialState = { // cục dữ liệu
  gender : [],
  role : [],
  position : [],
  arrLoadData : [],

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
        
    default:
      return state;
  }
};

export default adminReducer;
