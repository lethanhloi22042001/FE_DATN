import actionTypes from './actionTypes';
import {getAllCode,createNewUserService,getAllUsers,deleteNewUserService} from '../../services/userService'
import { toast } from "react-toastify";
// export const startDoing = () => ({
//     type: actionTypes.START,
// });
export const startDoing = () => {
    return async (dispatch,getState)=>{
        try {
            let data = await getAllCode('GENDER') ;
            console.log('data',data);
            if( data && data.errCode === 0 ){
                dispatch(success(data.data));
            }else{
                dispatch(failed());
            }
        } catch (error) {
            dispatch(failed());
            console.log(error);
        }
    }
};

export const success = (data) => ({
    type: actionTypes.SUCCESS,
    data : data,
});

export const failed = ()=>({
    type : actionTypes.FAILED,
})


export const startDoingPosition = () => {
    return async (dispatch,getState)=>{
        try {
            let data = await getAllCode('POSITION') ;
            if( data && data.errCode === 0 ){
                dispatch(successPosition(data.data));
            }else{
                dispatch(failedPosition());
            }
        } catch (error) {
            dispatch(failed());
            console.log(error);
        }
    }
};

export const successPosition = (data) => ({
    type: actionTypes.POSITION_SUCCESS,
    data : data,
});

export const failedPosition = ()=>({
    type : actionTypes.POSITION_FAIL,
})


// ROLE


export const startDoingRole = () => {
    return async (dispatch,getState)=>{
        try {
            let data = await getAllCode('ROLE') ;
            if( data && data.errCode === 0 ){
                dispatch(successRole(data.data));
            }else{
                dispatch(failedRole());
            }
        } catch (error) {
            dispatch(failed());
            console.log(error);
        }
    }
};

export const successRole = (data) => ({
    type: actionTypes.ROLE_SUCCESS,
    data : data,
});

export const failedRole = ()=>({
    type : actionTypes.ROLE_FAIL,
})

// --------------CREATE USER--------------

export const createUserRedux = (userId) => {
    return async (dispatch, getState) =>{
          try {
            let res = await createNewUserService(userId) ;
            if( res && res.errCode === 0 ){
                toast.success("Đã tạo thành công ") ;
                dispatch(createUserReduxSucess());
                dispatch(getAllUserRedux());
            }else{
                dispatch(createUserReduxFailed());
            }
        } catch (errCode) {
            dispatch(createUserReduxFailed());
            console.log('saveUserFailed',errCode);
        }  
};
}

export const createUserReduxSucess = () => ({
    type: actionTypes.CREATE_SUCESS,
});

export const createUserReduxFailed  = ()=>({
    type : actionTypes.CREATE_FAILED,
})


// --------------GetAll USER--------------


export const getAllUserRedux = () => {
    return async (dispatch, getState) =>{
          try {
            let res = await getAllUsers('ALL') ;
            if( res && res.errCode === 0 ){
                dispatch(getAllUserReduxUserReduxSucess(res.users.reverse()));
            }else{
                dispatch(getAllUserReduxUserReduxFailed());
            }
        } catch (errCode) {
            dispatch(getAllUserReduxUserReduxFailed());
            console.log('saveUserFailed',errCode);
        }
};
}

export const getAllUserReduxUserReduxSucess = (data) => ({
    type: actionTypes.GETALL_SUCESS,
    data: data,
});

export const getAllUserReduxUserReduxFailed  = ()=>({
    type : actionTypes.GETALL_FAILED,
})




// --------------DELETE USER--------------


export const deleteUserRedux = (data) => {
    return async (dispatch, getState) =>{
          try {
             let dispat =  await deleteNewUserService(data) ;
            if( dispat && dispat.errCode === 0 ){
                dispatch(deleteUserReduxUserReduxSucess());
                dispatch(getAllUserRedux());
            }else{
                dispatch(deleteUserReduxUserReduxFailed());
                }
        } catch (errCode) {
            dispatch(deleteUserReduxUserReduxFailed());
            console.log('saveUserFailed',errCode);
        }
};
}

export const deleteUserReduxUserReduxSucess = () => ({
    type: actionTypes.DELETE_SUCCESS,
});

export const deleteUserReduxUserReduxFailed  = ()=>({
    type : actionTypes.DELETE_FAIL,
})


// --------------UPDATE USER--------------

export const updateUserRedux = (data) => {
    return async (dispatch, getState) =>{
          try {
             let dispat =  await deleteNewUserService(data) ;
            if( dispat && dispat.errCode === 0 ){
                dispatch(updateUserReduxUserReduxSucess());
                dispatch(getAllUserRedux());
            }else{
                dispatch(updateUserReduxUserReduxFailed());
                }
        } catch (errCode) {
            dispatch(deleteUserReduxUserReduxFailed());
            console.log('saveUserFailed',errCode);
        }
};
}


export const updateUserReduxUserReduxSucess = () => ({
    type: actionTypes.UPDATE_SUCCESS,
});

export const updateUserReduxUserReduxFailed  = ()=>({
    type : actionTypes.UPDATE_FAIL,
})

