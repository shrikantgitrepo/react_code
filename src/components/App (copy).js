import React,{Component}  from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import { fetchData, addReminder, deleteReminder, clearReminders } from '../actions';

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            user_info : {
              name:"",
              arabic_name:"",
              email_id:"",
              password:"",
              mobile:"",
              dial_code:"",
              dob:"",
              about_me:"",
            },
        }
        console.log('App from constructor');
        
    }
    
    /*componentWillMount(){
        this.props.fetchData();
        console.log('App from willmount props:',this.props);
    }*/
    
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
              let state = json;
              //this.props.fetchData(state);
            });
    }
    
    componentDidMount(){
        this.getInitialData();
    }
    
    addReminder(){
        console.log('this.props',this.props);
        this.props.addReminder(this.state.user_info);
        console.log('this.state1',this.state);
    }
    
    deleteReminder(id){
        console.log('from app id for delete:',id,'this.props:',this.props);
        this.props.deleteReminder(id);
    }
    
    renderReminders(){
       if((this.props.reminders.length == 0)){ //(this.props.reminders !== undefined) ||
        //const reminders = this.props.reminders.user_info.list;
        //const user_info = this.props.reminders.user_info;
        console.log('App after first call store1:',this.props.reminders); 
        //console.log('user_list:',user_info);
        const reminders = "";
        
       }else if((this.props.reminders.type == "FETCH_DATA")){
        console.log('App after first call store2:',this.props.reminders.type);
        const reminders = this.props.reminders.user_info;
        console.log('dispach Actions:',this.props);
        }
       else{
        //const reminders  = {};
        const reminders = "";
        console.log('App after first call store3:',this.props.reminders); 
       }
         
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
                     
                    />
                </div>
                <div className = "form-group col-md-6">
                    <input className = "form-control"
                     placeholder = "Mobile"
                     
                    />
                </div>
                <div className = "form-group col-md-6">
                    <input className = "form-control"
                     placeholder = "DOB"
                     
                    />
                </div>
                <div className = "form-group col-md-6">
                    <input className = "form-control"
                     placeholder = "About me"
                     
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
    console.log('App from rendertable:',props);
    console.log('App from rendertable actions:',props.actions);    
    if((props.params.type == "FETCH_DATA")){
        console.log('App after first call store4:',props.params.type);
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
        }else{
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
