import axios from 'axios';
import * as baseURLs from './Constants/routes.js';
import React from 'react';
import {connect} from 'react-redux';


//Renderless Component to manage sending updates to server and storing them locally in the store.


class CRUDClass extends React.Component{

	constructor(props){

		super(props);
	
	}

	//Creates a new post if no postid, otherwise updates it.

	uploadGuideline(){

		var session_url = baseURLs.GUIDELINE_URL;

			axios.post(session_url, this.props.guideline, {
				auth: {
					username: this.props.uname,
					password: this.props.pass
				}
			}).then(response => {
				
			
				console.log('[Post Created] ',response.data);

				this.props.updatePostID(response.data.id);
				this.props.updateModified(response.data.modified);
			
				return response;
				

			}).catch(function(error) {
				console.log('Error on Authentication',error);
				return error;
				
			});

		}


	

	updateGuideline(uname, pass){

		var session_url = baseURLs.GUIDELINE_URL;

		axios.put(session_url, this.props.guideline, {
				auth: {
					username: this.props.uname,
					password: this.props.pass
				}
			}).then(response => {
				
			
				console.log('[Post Updated]',response.data);

				this.props.updateModified(response.data.modified);
			
				return response;
				

			}).catch(function(error) {
				console.log('Error on Authentication',error);
				return error;
				
			});

	}

	deleteGuideline(uname, pass){

	}

	render(){
		return (null);
	}
}

const mapStateToProps = (state) => {

	return{
	guideline: state.edit,
	uname: state.auth.user.username,
	pass: state.auth.user.password
	}

}

const mapDispatchToProps = (dispatch)=>{

	return {
	updatePostID: (id)=>dispatch(updatePostID(id)),
	updateModified: (timeDate)=>dispatch(updatePostModified(timeDate)),
	updateGuideline: (formData) => dispatch(updateGuideline(formData))
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(CRUDClass);

