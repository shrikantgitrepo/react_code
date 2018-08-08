import React,{Component}  from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import { fetchData, addReminder, deleteReminder, clearReminders } from '../actions';

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            /*user_info : {
              row_id:Math.random(),
              id:"",
              active:"",
              contact_no:"",
              i_date:"",
              name:"",
              otp_verified:"",
             },*/
            id:"",
            user_info:{
              row_id:Math.random(),
              id:"",
              name:"",
              arabic_name:"",
              email_id:"",
              password:"",
              dial_code:"",
              mobile:"",
              about_me:"",
              dob:"",
              user_type:5,
              
              active:"",
              contact_no:"",
              i_date:"",
              name:"",
              otp_verified:"",
            }
        }
        console.log('App from constructor');
        
    }
    
    getInitialData(){
           console.log('App getinitial data'); 
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
              let user_list = json.list;
              this.props.fetchData(user_list);
            });
    }
    
    
    
    componentDidMount(){
        this.getInitialData();
    }
    forceUpdate(){
        this.setState({id:1})
        this.getInitialData();
    }
    
    addReminder(){
        console.log('this.props',this.props);
        console.log('from add reminder this.state:',this.state);
        
        const loged_in_user_id = 1;
        const encrypted_data = "8c88722333c630177cdcbbe79484eb8ddfd24c9f7f9908e2308a5b2ac7503904";
        const name = this.state.user_info.name;
        const arabic_name = this.state.user_info.arabic_name;
        const email_id = this.state.user_info.email_id;
        const password = this.state.user_info.passsword;
        const dial_code = this.state.user_info.dial_code;
        const mobile = this.state.user_info.mobile;
        const about_me = this.state.user_info.about_me;
        const dob = this.state.user_info.dob;
        const user_type = this.state.user_info.user_type;
        
        const pref_lang = 'en';
        const SERVER_PATH  = 'http://192.168.1.100/apps/wentamashy/api/v2/testreact/add_edit_user';
        const query = `?encrypted_data=${encrypted_data}&loged_in_user_id=${loged_in_user_id}&user_type=5&name=${name}&arabic_name=${arabic_name}
                        &email_id=${email_id}&password=${password}&dial_code=${dial_code}&mobile=${mobile}
                        &about_me=${about_me}`;
        //const query = '?encrypted_data='+encrypted_data+'&loged_in_user_id='+loged_in_user_id+'&user_type=5&start='+START+'&limit'+LIMIT;
        const full_url = SERVER_PATH+query;
        
        fetch(full_url,{
         method:'POST',
         async:false
         })
        .then(response => response.json())
        .then(json =>{
           //this.getInitialData();
           console.log('Response of add user:',json);
           console.log('Response code:',json.code,'type:',typeof(json.code));
           if(json.code == 200){
            this.getInitialData();
           }
           //let user_list = json.list;
           //this.props.fetchData(user_list);
        });
        //this.props.addReminder(this.state.user_info);
        
    }
    
    deleteReminder(id){
        console.log('from app id for delete:',id,'this.props:',this.props);
        this.props.deleteReminder(id);
    }
    
    renderReminders(){
       
    return (
    <div>
      <div class="col-md-12">
        <div class="table-responsive">
            
                <table id="table" class="table table-striped table-bordered" cellspacing="0" width="100%">
                <thead>
                            <tr>
                                <th>Sr.No</th>
                                <th>Name</th>
                                <th>Contact No.</th>
                                <th>Created</th>
                                <th>Verified</th>
                                <th>Action</th>
                            </tr>
                            
                </thead>
                     <tbody>

                     <Rendertable params = {this.props.reminders} actions  ={this.props}  />
                    </tbody>
            </table>
        </div>
      </div>
      </div>
    );
    }
    
    render(){
        return (<div>
                <div className = "title"> Reminder pro </div>
                <div className = "form">
                <div className = "form-group col-md-6">
                    <input className = "form-control"
                     placeholder = "English Name"
                     onChange ={event => {  var user_info = {...this.state.user_info};
                                            user_info.name = event.target.value;
                                            this.setState({user_info})
                                          }
                                }
                    />
                </div>
                <div className = "form-group col-md-6">
                    <input className = "form-control"
                     placeholder = "Arabic name"
                     onChange ={event => {  var user_info = this.state.user_info;
                                            user_info.arabic_name = event.target.value;
                                            this.setState({user_info})
                                          }
                                }
                    />
                </div>
                
                <div className = "form-group col-md-6">
                    <input className = "form-control"
                     placeholder = "Email ID"
                     onChange = {event =>{var user_info = this.state.user_info
                                           user_info.email_id = event.target.value;
                                           this.setState({user_info})
                                         }
                     
                     }
                    />
                </div>
                <div className = "form-group col-md-6">
                    <input className = "form-control"
                     placeholder = "Password"
                     onChange = {event =>{
                                 var user_info = this.state.user_info;
                                 user_info.password = event.target.value;
                                 this.setState({user_info});
                                }
                    }
                    />
                </div>
                <div className = "form-group col-md-6">
                    <input className = "form-control"
                     placeholder = "Dial code"
                     onChange = {event=>{
                         var user_info = this.state.user_info;
                         user_info.dial_code = event.target.value;
                         this.setState({user_info});
                        }
                    }
                     
                    />
                </div>
                <div className = "form-group col-md-6">
                    <input className = "form-control"
                     placeholder = "Mobile"
                     onChange = {event =>{
                            var user_info = this.state.user_info;
                            user_info.mobile = event.target.value;
                            this.setState({user_info});
                        }
                    }
                     
                    />
                </div>
                <div className = "form-group col-md-6">
                    <input className = "form-control"
                     placeholder = "DOB"
                     onChange = {event => {
                            var user_info = this.state.user_info;
                            user_info.dob = event.target.value;
                            this.setState({user_info});
                        }
                    }
                     
                    />
                </div>
                <div className = "form-group col-md-6">
                    <input className = "form-control"
                     placeholder = "About me"
                     onChange = {event => {
                            var user_info = this.state.user_info;
                            user_info.about_me = event.target.value;
                            this.setState({user_info});
                        }
                    }
                     
                    />
                </div>
                
                
                <div className = "form-group"> 
                    <button
                    type = "button"
                    className = "btn btn-sm btn-success"
                    onClick = {()=>this.addReminder()}>
                    Add User
                    </button>
                    
                </div>
                { this.renderReminders() }
                </div>
                
                </div>);
    }
}

function mapStateToProps(state) {
  console.log('App from mapstateto prop:',state);
  return {
    reminders: state,
  }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchData,addReminder,deleteReminder},dispatch);
}

function Rendertable(props,actions){
    console.log('App from rendertable props:',props);
    if((props.params.type == "FETCH_DATA")){
        //console.log('App after first call store4:',props.params.type);
        return (
            props.params.user_info.list.map(each_user =>{
                return(
                   <tr key = {each_user.id}>
                   <td></td>
                   <td>{each_user.name}</td>
                   <td>{each_user.contact_no}</td>
                   <td>--</td>
                   <td>--</td>
                   <td onClick = {()=>props.actions.deleteReminder(each_user.id)}> &#x2715;</td>
                   </tr>
                );
               })
        );
        }
        else if((props.params.length >0)){
        console.log('from rende table:',props.params);
        return (
            props.params.map(each_user =>{
                return(
                   <tr key = {each_user.id}>
                   <td></td>
                   <td>{each_user.name}</td>
                   <td>{each_user.contact_no}</td>
                   <td>--</td>
                   <td>--</td>
                   <td onClick = {()=>props.actions.deleteReminder(each_user.row_id)}> &#x2715;</td>
                   </tr>
                );
               })
        );
        }
        else{
        return "No Record Found"; 
        }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);

/*
 <ul className="list-group col-sm-4">
        {
          reminders.map(reminder => {
            return (
              <li key={reminder.id} className="list-group-item">
                <div className="list-item">
                  <div>{reminder.user_info.name +' '+reminder.user_info.arabic_name}</div>
                </div>
                <div className="list-item delete-button" onClick = {()=>this.deleteReminder(reminder.id)}>
                  &#x2715;
                </div>
              </li>
            )
          })
        }
      </ul>
 */
