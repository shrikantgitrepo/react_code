import {FETCH_DATA,ADD_REMINDER,DELETE_REMINDER} from '../constants';

export const addReminder  = (user_info)=>{
    const action = {
        type : ADD_REMINDER,
        user_info,
    }
    console.log('from action  addReminder:',action);
    return action ;
}

export const deleteReminder = (id)=>{
    const action = {
       type: DELETE_REMINDER,
       id,
    }
    console.log('action from DELETE_REMINDER:',action);
    return action ;
}

export const fetchData = (initial_data)=>{
    const action = {
        type:FETCH_DATA,
        user_info:initial_data,
    }
    console.log('action fetchData:',action);
    return action;
}