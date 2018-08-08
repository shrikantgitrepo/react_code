import {FETCH_DATA, ADD_REMINDER,DELETE_REMINDER} from '../constants';


const reminder = (state,action)=>{
    let user_info1 = action.user_info;
    state = [...state,user_info1];
    //state = state.user_info.list.push(user_info);
    return state;
}
const removeByID = (state =[],id)=>{
    console.log('state from remove byid reducer:',state);
    const reminders = state.filter(reminder => reminder.row_id != id);
    
    return reminders;
}

const reminders  = (state = [],action)=>{
    let reminders  = null;
    
    //state = setTimeout(getInitialData(),4000);
    //return state;
    switch(action.type){
        case FETCH_DATA:
             reminders = action.user_info;
             reminders = reminders.map(each_row =>{
                each_row.row_id = Math.random();
                //let new_row = [...each_row,{row_id:Math.random()}];
                 return each_row;
                })
             console.log('reducer FETCH_DATA:',reminders);
             return reminders;
        case ADD_REMINDER:
            reminders = [...state,action.user_info];
            console.log('from reducer ADD_REMINDER :',reminders);
            return reminders;
        case DELETE_REMINDER:
            reminders = removeByID(state,action.id);
            return reminders;
        default :
            return state;
    }
}
export default reminders;