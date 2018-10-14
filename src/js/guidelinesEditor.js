import React from 'react';
import {connect} from 'react-redux';
// import axios from 'axios';
// import WPAPI from 'wpapi';
import DatePicker from 'react-datepicker';
import '../../node_modules/react-datepicker/dist/react-datepicker.css';
// node_modules/react-datepicker/dist/react-datepicker.js
// import DayPickerInput from 'react-day-picker';
import moment from 'moment';


import {updateGuidelineTitle} from './Actions/guidelinesActions.js';
import {updateGuidelineDescription, updateGuideline, addBlankReviewer, removeReviewer, fetchGuideline, updateGuidelineCategory} from './Actions/guidelinesActions.js';
import {updateLeadAuthorTitle, updateLeadAuthorFirstname, updateLeadAuthorSurname, updateLeadAuthorEmail} from './Actions/guidelinesActions.js';
import {updateReviewerTitle, updateReviewerFirstname, updateReviewerSurname, updateReviewerEmail, updateGuidelineStatus} from './Actions/guidelinesActions.js';

import {updatePostID, updateFileData, updatePostModified, persistToDatabase, getGuidelineByID, uploadFile} from './Actions/guidelinesActions.js';
import GuidelineStatus from './guidelineStatus.js';

import {setEndDate, setStartDate} from './Actions/guidelinesActions.js';


import * as baseURLs from './Constants/routes.js';

import CRUDClass from './crudClass.js';






class GuidelinesEditor extends React.Component{


	constructor(props){

		super(props);
		this.handleForm = this.handleForm.bind(this);
		this.handleFormFieldChange = this.handleFormFieldChange.bind(this);
		this.handleFile = this.handleFile.bind(this);
		this.handleRemoveReviewer = this.handleRemoveReviewer.bind(this);
		this.handleStartDate = this.handleStartDate.bind(this);
		this.handleEndDate = this.handleEndDate.bind(this);


}


componentDidMount(){

	if(this.props.credentials.status){

		if(this.props.id){

			//Asynchromous action to get the guideline with id

			this.props.getGuidelineByID(this.props.id,this.props.credentials.user.username,this.props.credentials.user.password);

		}

	}

// console.log('[Start Date] ',this.props.guidelineMapped);

}

componentDidUpdate(){



}

handleRemoveReviewer(event){

	var val = event.target.name;
	 // console.log('removing at index ', val)

	this.props.removeReviewer(val);


}


handleForm(event){

		event.preventDefault();
		this.props.updateDatabase(); //Middleware Handles Updating the Database from the form.

}

handleFormFieldChange(event){

	var formFieldId = event.target.id;

	if(formFieldId=='guideline-publish-status'){
		console.log('guideline-publish-status', event.target.value);
		this.props.updateGuidelineStatus(event.target.value);
	}

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


	handleFile(event){

	console.log('[Handle File Event Triggered]')
		


	this.props.uploadFile(document.getElementById( 'file-input' )
	.files[0],this.props.credentials.user.username,this.props.credentials.user.password);


	}

	handleStartDate(event){

		var m = event.month() + 1; //Correction as momentjs has months 0 - 11.

		// var date = m + '/' + event.date()+ '/' + event.year(); //Correction for server side storage

		var date = event.date() + '/' + m + '/' + event.year();


		this.props.setStartDate(date);
	}

	handleEndDate(event){

		var m = event.month() + 1; //Correction as momentjs has months 0 - 11.

		// var date = m + '/' + event.date()+ '/' + event.year(); //Correction for server side storage

		var date = event.date() + '/' + m + '/' + event.year();

		this.props.setEndDate(date);
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

	

<div className='col-md-10'> {/* Start of form columm for input*/}

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

<tr>
<td style={{width:'15%'}}>
<label className='guideline-category-label'>Status:</label>
</td>
<td colSpan='5'>
{/*<div style={{width:'50%'}}><GuidelineStatus status={this.props.guidelineMapped.status}/></div>*/}
<select className='form-control' style={{width:'50%'}} id='guideline-publish-status' onChange={this.handleFormFieldChange}>
			<option value={this.props.guidelineMapped.status}>
			{this.props.guidelineMapped.status == 'publish' ? 'Publish' : 'Draft'}
			</option>
			<option value='publish'>
			Publish
			</option>
			<option value='draft'>
			Draft
			</option>
			</select>
</td>




</tr>

<tr>
<td style={{width:'15%'}}>
Start Date:
</td>
<td colSpan='5'>
<DatePicker className='form-control' id='start-date' dateFormat="DD/MM/YYYY" locale="en-gb" withPortal onChange={this.handleStartDate} selected={this.props.startDate ? moment(this.props.startDate, 'DD/MM/YYYY') : moment()}/>
</td>
</tr>
<tr>
<td style={{width:'15%'}}>
End Date:
</td>
<td colSpan='5'>
<DatePicker className='form-control' id='end-date' dateFormat="DD/MM/YYYY" locale="en-gb" withPortal onChange={this.handleEndDate} selected={this.props.endDate ? moment(this.props.endDate,'DD/MM/YYYY') : moment()}/>
</td>
</tr>

<tr>

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

<td style={{width:'10%'}}>


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

<button className='btn btn-primary btn-block' type="submit" >Save</button>

</form> 

</div> {/* Emd of form bar */}

<div className='col-sm-2'>
{this.props.guidelineMapped.status ? 'Status: '+ this.props.guidelineMapped.status : ''}
<br></br>
{this.props.postModifiedMapped ? 'Last Modified: '+this.props.postModifiedMapped  : ''}
<br></br>

</div>



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
		postModifiedMapped: state.edit.modified,
		startDate: state.edit.guideline.fields.start_date,
		endDate: state.edit.guideline.fields.end_date,

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
		// updateFileData: (data)=>dispatch(updateFileData(data)),

		updateModified: (timeDate)=>dispatch(updatePostModified(timeDate)),

		updateGuideline: (formData) => dispatch(updateGuideline(formData)),
		addReviewerBlankReviewer: ()=>dispatch(addBlankReviewer()),
		removeReviewer: (id)=>dispatch(removeReviewer(id)),
		updateGuidelineStatus: (status)=>dispatch(updateGuidelineStatus(status)),
		// fetchGuideline: (data)=>dispatch(fetchGuideline(data)),
		updateDatabase: ()=>dispatch(persistToDatabase()),
		getGuidelineByID: (id,username,password)=>dispatch(getGuidelineByID(id,username,password)),
		uploadFile: (file, username, password)=>dispatch(uploadFile(file, username, password)),
		
		//DD/MM/YYYY
		setStartDate: (date)=>dispatch(setStartDate(date)),
		setEndDate: (date)=>dispatch(setEndDate(date))
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(GuidelinesEditor)