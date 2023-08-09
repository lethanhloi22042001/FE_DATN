import actionTypes from './actionTypes';
import {getAllCode} from '../../services/userService'

// export const startDoing = () => ({
//     type: actionTypes.START,
// });
export const startDoing = () => {
    return async (dispatch,getState)=>{
        try {
            let data = await getAllCode('GENDER') ;
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