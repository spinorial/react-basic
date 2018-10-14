import React from 'react';
import axios from 'axios';
// import WPAPI from 'wpapi';
import {connect} from 'react-redux';

// import {connect} from 'react-redux';

import {AUTHENTICATION_URL, GUIDELINES_URL} from './Constants/routes.js';
import {updateCredentials, updatePassword, updateUsername, logoutUser} from './Actions/authenticationActions.js';
import {updateGuidelinesRoute, loadFromRoute} from './Actions/guidelinesActions.js';

class Login extends React.Component{
	constructor(props){
		super(props);
		this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
		this.handleLoginUser = this.handleLoginUser.bind(this);
		this.handleLogoutUser = this.handleLogoutUser.bind(this);
	}

	handleLoginUser(event){
		
		var input = event.target.id;
		// console.log('[login] ',input, '[value] ',event.target.value);

		if(input=='login-username'){
			
			this.props.updateUsernameAction(event.target.value);
		}

		if(input=='login-password'){
			this.props.updatePasswordAction(event.target.value);
		}
	}


	handleSubmitLogin(event){

	event.preventDefault()

	console.log(event.target.values)

	// var b = btoa('joe:pass123');
	// console.log(b);
	
	axios.post(AUTHENTICATION_URL, {
    		username: this.props.credentials.user.username,
   			password: this.props.credentials.user.password
  	})
 	 .then((response)=>{

 	 	console.log('response to request', response);

 	 	this.props.updateCredentialsAction(response.data);
		// var loginAllURL = GUIDELINES_URL + '/id=' + this.props.credentials.data.user_id;

		// console.log('[Credentials] ', this.props.credentials);


		// var loginAllURL = GUIDELINES_URL + '/id=' + response.data.data.user_id;

		// console.log('[URL] ', loginAllURL);

		// this.props.updateRoute('blah');

		//this.props.load(this.props.route);



 	 }



  		
  
  )
  .catch(function (error) {
    console.log(error);
    //Do a modal here
  });

	// this.props.load(this.props.route);

	}

  handleLogoutUser(){

  	this.props.logoutAction();

  }


	render(){
		
		return (

		<div>

		<form onSubmit={this.handleSubmitLogin}>

		{!this.props.credentials.status ? 

		<div>

		<div className = 'form-control bg-white' style={{'border':'solid 1px black','min-width':'400px'}}>

		<div className = 'input-group input-group-sm'>

		<label style={{'padding-right':'5px','padding-left':'5px','padding-top':'4px','margin-bottom':'4px','min-width':'100px'}} for='login-username'>Username: </label><input className="form-control" type='text' id='login-username' onChange={this.handleLoginUser}/>
		<label style={{'padding-right':'5px','padding-left':'5px','padding-top':'4px','margin-bottom':'4px','min-width':'100px'}} for='login-passsword'>Password: </label><input className="form-control" type='password' id='login-password' onChange={this.handleLoginUser}/>

		<button className="btn btn-primary btn-sm" style={{'margin-left':'10px','min-width':'64px'}} type="submit">Login</button>

		</div>

		</div>
		</div> 

		: 



		<div>

		<div className = 'form-control bg-white' style={{'border':'solid 1px black','min-width':'400px'}}>

		<div className = 'input-group input-group-sm'>

		<label style={{'padding-right':'5px','padding-left':'5px','padding-top':'4px','margin-bottom':'4px','min-width':'100px'}} for='login-username'>Username: </label><input className="form-control" type='text' id='login-username' value='' readOnly/>
		<label style={{'padding-right':'5px','padding-left':'5px','padding-top':'4px','margin-bottom':'4px','min-width':'100px'}} for='login-passsword'>Password: </label><input className="form-control" type='password' id='login-password' value='' readOnly/>

		<button className="btn btn-primary btn-sm" style={{'margin-left':'10px','min-width':'64px'}} onClick={this.handleLogoutUser}>Logout</button>

		</div>

		</div>

		</div>}

		
		


		</form>
			
		</div>)
	}
}

const mapStateToProps = (state) => {
	return {credentials: state.auth,
			route: state.table.route}
}

const mapDispatchToProps = (dispatch) => {

	return {
		updateCredentialsAction: (creds) => dispatch(updateCredentials(creds)),
		updateUsernameAction: (username) => dispatch(updateUsername(username)),
		updatePasswordAction: (password) => dispatch(updatePassword(password)),
		logoutAction: ()=>dispatch(logoutUser()),
		updateRoute: (url)=>dispatch(updateGuidelinesRoute(url)),
		load: ()=>dispatch(loadFromRoute())
		}

}

export default connect(mapStateToProps,mapDispatchToProps)(Login);