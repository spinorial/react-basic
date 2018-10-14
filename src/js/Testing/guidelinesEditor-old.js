import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import WPAPI from 'wpapi';

import {updateGuidelineTitle} from './Actions/guidelinesActions.js';
import {updateGuidelineDescription, updateGuideline, addBlankReviewer, removeReviewer, fetchGuideline, updateGuidelineCategory} from './Actions/guidelinesActions.js';
import {updateLeadAuthorTitle, updateLeadAuthorFirstname, updateLeadAuthorSurname, updateLeadAuthorEmail} from './Actions/guidelinesActions.js';
import {updateReviewerTitle, updateReviewerFirstname, updateReviewerSurname, updateReviewerEmail} from './Actions/guidelinesActions.js';

import {updatePostID, updateFileData, updatePostModified, persistToDatabase} from './Actions/guidelinesActions.js';
import GuidelineStatus from './guidelineStatus.js';

import * as baseURLs from './Constants/routes.js';

import CRUDClass from './crudClass.js';





class GuidelinesEditor extends React.Component{


	constructor(props){

		super(props);
		this.handleForm = this.handleForm.bind(this);
		this.handleRemoveReviewer = this.handleRemoveReviewer.bind(this);
		this.handleReviewer = this.handleReviewer.bind(this);
		this.handleFormFieldChange = this.handleFormFieldChange.bind(this);
		this.createGuideline = this.createGuideline.bind(this);
		this.updateGuideline = this.updateGuideline.bind(this);
		this.handleFile = this.handleFile.bind(this);


	//Local Version of state which is updated to store on submit.

}

componentDidMount(){


		//Loading a guideline through prop of id

		//1. Axios Call if ID set
		//2. Dispatch an Action 

		if(this.props.id){

		var session_url = baseURLs.GUIDELINE_URL + this.props.id;

		if(this.props.credentials.status){

				var req = axios.get(session_url,{

			auth: {
						username: this.props.credentials.user.username,
						password: this.props.credentials.user.password
					}
			

		}).then(response => {

			this.props.fetchGuideline(response.data);

				const responseData = {

					id:response.data.id,
					fileTitle: response.data.acf.file.filename,
					fileURL: response.data.acf.file.url

				}

				this.props.updateFileData(responseData);

				
			}).catch((error)=>{console.log(error)})

		}else{

			var req = axios.get(session_url,{}).then(response => {

			this.props.fetchGuideline(response.data);

				const responseData = {

					id:response.data.id,
					fileTitle: response.data.acf.file.filename,
					fileURL: response.data.acf.file.url

				}

				this.props.updateFileData(responseData);

				
			}).catch((error)=>{console.log(error)})

		}
		
	
	}




}

componentDidUpdate(){




}

createGuideline(){



	//Get these values from a login store
	var uname = this.props.credentials.user.username;
	var pass = 	this.props.credentials.user.password;

	var g = this.props.guidelineMapped;
	
	var session_url = baseURLs.GUIDELINE_URL;
	axios.post(session_url, g, {
		auth: {
			username: uname,
			password: pass
		}
	}).then(response => {

		
		console.log('Post Created ',response.data);
		this.props.updatePostID(response.data.id);
		this.props.updateModified(response.data.modified);


	}).catch(function(error) {
		console.log('Error on Authentication',error);

	});


}

updateGuideline(id){


	var uname = this.props.credentials.user.username;
	var pass = 	this.props.credentials.user.password;

	var g = this.props.guidelineMapped;
	var id = this.props.postIdMapped;

	var session_url = baseURLs.GUIDELINE_URL + id;
	console.log(session_url);
	axios.put(session_url, g, {
		auth: {
			username: uname,
			password: pass
		}
	}).then(response=>{
			// console.log('Authenticated');
			console.log('guideline updated');
			this.props.updateModified(response.data.modified);


		}).catch(function(error) {
			console.log('Error on Authentication',error);

		});


	}

	handleForm(event){

		event.preventDefault();
		this.props.updateDatabase(); //Middleware Handles Updating the Database from the form.


			// if(!this.props.postIdMapped){

			// // this.createGuideline() //Should have this handled by middleware.
			// this.props.updateDatabase(); //Middleware

			// }

			// if(this.props.postIdMapped){

			// this.updateGuideline(this.props.postIdMapped);

			// }

}

handleFormFieldChange(event){

	var formFieldId = event.target.id;

	console.log(event.target.id);

	if(formFieldId=='guideline-title'){
		this.props.updateTitle(event.target.value);
	}

	if(formFieldId=='guideline-description'){
		this.props.updateDescription(event.target.value);			
	}
	if(formFieldId=='guideline-category'){
		this.props.updateCategory(event.target.value);			
	}

	if(formFieldId=='lead-author-title'){
		this.props.updateLeadAuthorTitle(event.target.value);
	}

	if(formFieldId=='lead-author-firstname'){
		this.props.updateLeadAuthorFirstname(event.target.value);
	}

	if(formFieldId=='lead-author-surname'){
		this.props.updateLeadAuthorSurname(event.target.value);
	}

	if(formFieldId=='lead-author-email'){
		this.props.updateLeadAuthorEmail(event.target.value);
	}
	if(formFieldId.startsWith('review-author-title')){

		this.props.updateReviewerTitle({title: event.target.value, index: event.target.name});
	}
	if(formFieldId.startsWith('review-author-firstname')){

		console.log('firstname');

		this.props.updateReviewerFirstname({firstname: event.target.value, index: event.target.name});
	}
	if(formFieldId.startsWith('review-author-surname')){

		this.props.updateReviewerSurname({surname: event.target.value, index: event.target.name});
	}
	if(formFieldId.startsWith('review-author-email')){

		console.log('email trigger');
		
		this.props.updateReviewerEmail({email: event.target.value, index: event.target.name});
	}

	
}

handleRemoveReviewer(event){

	var val = event.target.name;

	console.log('removing at index ', val)

	this.props.removeReviewer(val);


}

handleReviewer(event){

		//Send a payoload of an action to add data to reviewers.

		const data = {

			name: event.target.name,
			target: event.target,
			value: event.target.value


		}

	// console.log('[Handle Reviewer] ',data);

		// this.props.handleReviewer(data)
	}

	handleFile(event){
		
		console.log("file selected ",event.target.value);
		var uname = 'joe';
		var pass = 'pass123';

		var wp = new WPAPI({endpoint: 'https://guidelines.joe:8890/wp-json/',
			username: 'joe',
			password: 'pass123' });

		wp.media()

		.file(document.getElementById( 'file-input' ).files[0])
		.create({
		})
		.then(response =>{

			console.log("response data",response);


	//Update ID's

	this.props.updateFileData(
	{
		id:response.id,
		fileTitle: response.title.rendered,
		fileURL: response.source_url

	})

})
		.then(function( response ) {

		});


	}


	


	render(){

		if(!this.props.credentials.status){
			return (<div><h1>No access: Please log in to view this page.</h1></div>)
		}


		const guidelineCategory = [
		{
			label: 'Medical',
			value: 'Medical'

		},
		{
			label: 'Pharmocological',
			value: 'Pharmocological'
		}
		]

		const authorTitle = [
		{
			label: 'Ms',
			value: 'Ms'
		},
		{
			label: 'Mr',
			value: 'Mr'
		},
		{
			label: 'Dr',
			value: 'Dr'
		},
		{
			label: 'Prof',
			value: 'Prof'
		}
		]

		return(

	<div className='row'> {/* Start of Form  */}

	<GuidelineStatus />

<div className='col-md-12'> {/* Start of form columm for input*/}

<form onSubmit={this.handleForm}>

<table className='table'> {/* Form enclosed in a table */}

<tbody>

<tr> {/* Guideline Title */}

<td style={{width:'15%'}}>

<label className='guideline-title-label'> Title: </label>

</td>

<td colSpan='5'>

<input className='form-control' style={{width:'100%'}} type='text' rows='1' name='title' id='guideline-title' value={this.props.guidelineMapped.fields.guideline_title ? this.props.guidelineMapped.fields.guideline_title : ''} onChange={this.handleFormFieldChange}/>

</td>

</tr>

<tr> {/* Guideline Description */}


<td style={{width:'15%'}}> 

<label className='guideline-description-label'> Description: </label>

</td>

<td colSpan='5'>

<textarea className='form-control'  style={{width:'100%',height:'200px'}} rows='10' name='description' id='guideline-description' value={this.props.guidelineMapped.fields.guideline_description ? this.props.guidelineMapped.fields.guideline_description : ''} 
onChange={this.handleFormFieldChange}/>

</td>


</tr>

<tr>
<td style={{width:'15%'}}>
<label className='guideline-category-label'>Category:</label>
</td>
<td colSpan='5'>

<select className='form-control' style={{width:'50%'}} name='category' id='guideline-category' value={this.props.guidelineMapped.fields.guideline_category ? this.props.guidelineMapped.fields.guideline_category : 'Medical'} onChange={this.handleFormFieldChange} >

{guidelineCategory.map((e)=>{return(<option value={e.value}>{e.label}</option>)})}

</select>
</td>

</tr>

<tr style={{borderBottom:'1px solid red'}}>

<td style={{width:'15%'}}>
</td>

<td>
Title
</td>
<td>
Firstname
</td>
<td>
Surname
</td>
<td>
email
</td>


</tr>

<tr>
<td style={{width:'15%'}}>


<label className='lead-author-label'>Lead Author:</label>

</td>

<td >


<select className='form-control' id='lead-author-title' name='leadAuthorTitle'  defaultValue={this.props.guidelineMapped.fields.lead_author[0].title ? this.props.guidelineMapped.fields.lead_author[0].title : 'Ms'} onChange={this.handleFormFieldChange}>

{authorTitle.map((e)=>{return(<option value={e.value}>{e.label}</option>)})}

</select>

</td>

<td>
<input className='form-control' type='text' id='lead-author-firstname' name='leadAuthorFirstname' defaultValue={this.props.guidelineMapped.fields.lead_author[0].firstname ? this.props.guidelineMapped.fields.lead_author[0].firstname : ''} onChange={this.handleFormFieldChange} />
</td>
<td>
<input className='form-control' type='text' id='lead-author-surname' name='leadAuthorSurname' defaultValue={this.props.guidelineMapped.fields.lead_author[0].surname}  onChange={this.handleFormFieldChange}/>
</td>
<td> 
<input className='form-control' type='text' id='lead-author-email' name='leadAuthorEmail' defaultValue={this.props.guidelineMapped.fields.lead_author[0].email} onChange={this.handleFormFieldChange}/>


</td>
<td style={{minWidth:'110px'}}>

</td>
</tr>

{this.props.guidelineMapped.fields.review_panel ? this.props.guidelineMapped.fields.review_panel.map((e,i)=>{

	return(
		<tr>
		<td style={{width:'15%'}}>

		Reviewer:

		</td>
		<td>
		<select className='form-control' name={i} id={`review-author-title-${i}`}  defaultValue={this.props.guidelineMapped.fields.review_panel[i].title ? this.props.guidelineMapped.fields.review_panel[i].title : 'Ms'} onChange={this.handleFormFieldChange}>

		{authorTitle.map((element)=>{return(<option value={element.value}>{element.label}</option>)})}


		</select>
		</td>
		<td>
		<input className='form-control' type='text' name={i} id={`review-author-firstname-${i}`} defaultValue={this.props.guidelineMapped.fields.review_panel[i].firstname ? this.props.guidelineMapped.fields.review_panel[i].firstname : ''} onChange={this.handleFormFieldChange} />
		</td>
		<td>
		<input className='form-control' type='text' name={i} id={`review-author-surname-${i}`} value={this.props.guidelineMapped.fields.review_panel[i].surname ? this.props.guidelineMapped.fields.review_panel[i].surname : ''} onChange={this.handleFormFieldChange} />
		</td>
		<td>
		<input className='form-control' type='text' name={i} id={`review-author-email-${i}`} value={this.props.guidelineMapped.fields.review_panel[i].email ? this.props.guidelineMapped.fields.review_panel[i].email :''} onChange={this.handleFormFieldChange}/>
		</td>
		<td>
		<input className='form-control' className='btn btn-outline-danger' type='button' name={i} id={`review-author-button-${i}`} value='remove' onClick={this.handleRemoveReviewer} />
		</td>
		</tr>

		)}): <tr></tr>}




</tbody>

</table>

<div><button className="btn btn-success float-right" style={{'margin-bottom':'20px'}} id='add-reviewer-button' onClick={this.props.addReviewerBlankReviewer}>Add Reviewer</button></div>

<div>



<label>Download File: {this.props.fileTitleMapped ? <a href={this.props.fileURLMapped}> {this.props.fileTitleMapped}</a>: 'No File Uploaded' }</label>

<label className='form-control btn btn-outline-secondary'>Upload File: {this.props.fileTitleMapped}
<input style={{display:'none'}} type='file' id="file-input" onChange={this.handleFile}/>
</label>


</div>

<button className='btn btn-primary btn-block' type="submit" >Submit {this.props.postModifiedMapped ? ' - Last Modified: '+this.props.postModifiedMapped  : ''}</button>

</form> 

</div> {/* Emd of form bar */}



<div style={{'padding-bottom':'250px'}}></div>

</div>)
}
}

const mapStateToProps = (state)=>{

	return{
		guidelineMapped: state.edit.guideline,
		postIdMapped: state.edit.postid,
		fileURLMapped: state.edit.fileURL,
		fileTitleMapped: state.edit.fileTitle,
		credentials: state.auth,
		postModifiedMapped: state.edit.modified
	}
}

const mapDispatchToProps = (dispatch) =>{

	return {

		updateTitle: (title) => dispatch(updateGuidelineTitle(title)),
		updateDescription: (description) => dispatch(updateGuidelineDescription(description)),
		updateCategory: (category)=> dispatch(updateGuidelineCategory(category)),
		updateLeadAuthorTitle: (title)=>dispatch(updateLeadAuthorTitle(title)),
		updateLeadAuthorFirstname: (firstname)=>dispatch(updateLeadAuthorFirstname(firstname)),
		updateLeadAuthorSurname: (surname)=>dispatch(updateLeadAuthorSurname(surname)),
		updateLeadAuthorEmail: (email)=>dispatch(updateLeadAuthorEmail(email)),

		updateReviewerTitle: (title)=>dispatch(updateReviewerTitle(title)),
		updateReviewerFirstname: (firstname)=>dispatch(updateReviewerFirstname(firstname)),
		updateReviewerSurname: (surname)=>dispatch(updateReviewerSurname(surname)),
		updateReviewerEmail: (email)=>dispatch(updateReviewerEmail(email)),

		updatePostID: (id)=>dispatch(updatePostID(id)),
		updateFileData: (data)=>dispatch(updateFileData(data)),

		updateModified: (timeDate)=>dispatch(updatePostModified(timeDate)),

		updateGuideline: (formData) => dispatch(updateGuideline(formData)),
		addReviewerBlankReviewer: ()=>dispatch(addBlankReviewer()),
		removeReviewer: (id)=>dispatch(removeReviewer(id)),
		fetchGuideline: (data)=>dispatch(fetchGuideline(data)),
		updateDatabase: ()=>dispatch(persistToDatabase())
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(GuidelinesEditor)