import {FETCH_DATA, ADD_REMINDER,DELETE_REMINDER} from '../constants';


/*const getInitialData = ()=>{
           const loged_in_user_id = 1458;
           const START = 0;
           const LIMIT = 4;
           const encrypted_data = "215c1cfadf7a6a8916a0d447039bb0836f06b46297e55e722e74287e09bd07bd";
           const pref_lang = 'en';
           const SERVER_PATH  = 'http://192.168.1.100/apps/wentamashy/api/v2/testreact/user_list';
           const query = `?encrypted_data=${encrypted_data}&loged_in_user_id=${loged_in_user_id}&user_type=5&start=${START}&limit=${LIMIT}`;
           //const query = '?encrypted_data='+encrypted_data+'&loged_in_user_id='+loged_in_user_id+'&user_type=5&start='+START+'&limit'+LIMIT;
           const full_url = SERVER_PATH+query;
           
           fetch(full_url,{
            method:'POST',
            async:false
            })
           .then(response=>response.json())
           .then(json =>{
              console.log('Reducer response of fetch:',json.list);
              let state = json;
              return state;
            });
}*/

const reminder = (action)=>{
    let {text,user_info} = action;
    return{
        id: Math.random(),
        text,
        user_info,
    }
}
const removeByID = (state =[],id)=>{
    const reminders = state.user_info.list.filter(reminder => reminder.id != id);
    console.log('new reminders after deleted:',reminders);
    return reminders;
}

const reminders  = (state = [],action)=>{
    let reminders  = null;
    
    console.log('from reducer state:',state);
    console.log('from reducer action:',action);
    //state = setTimeout(getInitialData(),4000);
    //return state;
    switch(action.type){
        case FETCH_DATA:
             reminders = action;
             console.log('reducer FETCH_DATA:',reminders);
             return reminders;
        case ADD_REMINDER:
            reminders = [...state,reminder(action)];
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