/*
* Actions
* This contains the generators of actions
*/

import axios from 'axios';
import * as baseURLs from '.././Constants/routes.js';
import WPAPI from 'wpapi';



//Generator to update guidelines with new array
//Guidelinesarray is an array of guidelineobjects. 



export function updateGuidelines(guidelinesArray){

	return {

		type: 'UPDATE_GUIDELINES',
		payload: guidelinesArray

	}

}

export function updateGuidelinesRoute(routeURL){
	return{
		type: 'UPDATE_ROUTE',
		payload: routeURL
	}
}

//Editor Actions

export function updateGuidelineTitle(title){
	return{
		type: 'UPDATE_GUIDELINE_TITLE',
		payload: title
	}
}

export function updateGuidelineDescription(description){
	return{
		type: 'UPDATE_GUIDELINE_DESCRIPTION',
		payload: description
	}
}

export function updateGuidelineCategory(category){
	return{
		type: 'UPDATE_GUIDELINE_CATEGORY',
		payload: category
	}
}

export function updateLeadAuthorTitle(title){
	return{
		type: 'UPDATE_LEADAUTHOR_TITLE',
		payload: title
	}
}

export function updateLeadAuthorFirstname(firstname){
	return{
		type: 'UPDATE_LEADAUTHOR_FIRSTNAME',
		payload: firstname

	}
}

export function updateLeadAuthorSurname(surname){
	return{
		type: 'UPDATE_LEADAUTHOR_SURNAME',
		payload: surname

	}
}


export function updateLeadAuthorEmail(email){
	return{
		type: 'UPDATE_LEADAUTHOR_EMAIL',
		payload: email

	}
}

export function updateReviewerTitle(data){
	return{
		type: 'UPDATE_REVIEWER_TITLE',
		payload: data
	}
}

export function updateReviewerFirstname(data){
	return{
		type: 'UPDATE_REVIEWER_FIRSTNAME',
		payload: data
	}
}

export function updateReviewerSurname(data){
	return{
		type: 'UPDATE_REVIEWER_SURNAME',
		payload: data
	}
}

export function updateReviewerEmail(data){
	return{
		type: 'UPDATE_REVIEWER_EMAIL',
		payload: data
	}
}

export function updateGuideline(data){
	return{
		type: 'UPDATE_GUIDELINE',
		payload: {
				guideline:{

				title: 'webform',
				content: null,
				status: null,
				fields: {
					guideline_title: data.title,
					guideline_description: data.description,
					guideline_category:data.category,
					lead_author: [{
						title: null,
						firstname: null,
						surname: null,
						email: null

					}]
					,
					review_panel:data.reviewPanel,
					file: {

						id: null,
						ID: null
					}

				}

			 		

			}
		}
	}
}

export function updatePostID(id){
	return {type: 'UPDATE_POST_ID',payload: id}
}

export function updateFileData(data){

	console.log('Update File Data Action Triggered ',data);
	return {type: 'UPDATE_FILE_DATA',payload: data}
}


export function addBlankReviewer(){
	return {type:'ADD_BLANK_REVIEWER'}
}

export function removeReviewer(number){
	return {type: 'REMOVE_REVIEWER', payload: number}
}

export function fetchGuideline(data){


			return  {type: 'FETCHED_GUIDELINE',
					 payload: data}
}

export function updatePostModified(dateTime){
	return {type: 'UPDATE_MODIFIED', payload: dateTime}
}

export function updateGuidelineStatus(status){
	return {type: 'GUIDELINE_STATUS_UPDATE', payload: status}
}

export function persistToDatabase(){
	return {
		type:'PERSIST_TO_DATABASE'
	}
}


//Action to get table information on load

export function getGuidelineData(url){

	  return dispatch => {
       

		axios.get(url).then(response => {

			// console.log('[getGuidelineData] ',response.data);
			dispatch(updateGuidelines(response.data));
		
		})
		.catch(error=>{console.log(error)})

	}

}

//Table Actions

//Editor Actions


//Asychronus action generator which waits for response before updating data. 
//Middleware Thunk
export function getGuidelineByID(id,user,pass){
	var session_url = baseURLs.GUIDELINE_URL + id;
	return dispatch => {
		var req = axios.get(session_url,{

			auth: {
						username: user,
						password: pass
					}
			

		}).then(response => {

			 console.log('[Response Data To FETCHED_GUIDELINE ]',response.data);

				const responseData = {

					id:response.data.acf.file.id,
					fileTitle: response.data.acf.file.filename,
					fileURL: response.data.acf.file.url

				}

				// this.props.updateFileData(responseData);

				dispatch(fetchGuideline(response.data));
				dispatch(updateFileData(responseData));

				
			}).catch((error)=>{console.log(error)})
	}
}

export function uploadFile(file, uname, pass){
	//Upload file using wp.media and then add the response to the post
	//In the form should check if new file before dispatching this action

	return dispatch => {

		console.log('[uploadFile ActionGen]');

		var wp = new WPAPI({endpoint: baseURLs.WPJSON_URL,
			username: uname,
			password: pass});

		wp.media()

		.file(file)
		.create({
		})
		.then(response =>{

			console.log("uploadFile ActionGen response",response);

			const fileData = {
				id:response.id,
				fileTitle: response.title.rendered,
				fileURL: response.source_url

			}

			dispatch(updateFileData(fileData));


		})



	}
}

export function setStartDate(date){
	return {type:'SET_START_DATE',payload:date}
}

export function setEndDate(date){
	return {type:'SET_END_DATE',payload:date}
}


