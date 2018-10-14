const initialGuideline = {

	guideline:{
		title: 'webform',
		content: null,
		status: null,
		fields: {
			guideline_title: null,
			guideline_description: null,
			guideline_category:'Medical',
			lead_author: [{
				title: null,
				firstname: null,
				surname: null,
				email: null

			}]
			,
			review_panel:[{
				title: null,
				firstname: null,
				surname: null,
				email: null}],
				file: {

					id: null,
					ID: null
				},
			start_date:null,
			end_date:null

			}



		},
		postid:null,
		fileURL:null,
		fileTitle:null,
		modified: null
		
	}

const guidelinesEditReducer = (state = initialGuideline, action)=>{

		if(action.type=='UPDATE_FILE_DATA'){

			console.log('Action File Data Payload', action.payload);


			return{
				...state,
				fileURL:action.payload.fileURL,
				fileTitle:action.payload.fileTitle,
				guideline:{
					...state.guideline,
					fields:{
						...state.guideline.fields,
						file:{
							id: action.payload.id,
							ID: action.payload.id
							}
					}

				}
				
		}
	}


		if(action.type=='UPDATE_GUIDELINE'){

			// console.log('[Action Dispatched] ',action.type);
			

			return {
				...state,
				guideline: action.payload
			}
		}

		if(action.type=='UPDATE_POST_ID'){
			return {
				...state,
				postid:action.payload
			}
		}

		if(action.type=='UPDATE_GUIDELINE_TITLE'){


			return {
					
						...state,
						guideline:{
							...state.guideline,
							fields:{
								...state.guideline.fields,
								guideline_title: action.payload
							}
						}

					}
			
		}

		if(action.type=='UPDATE_GUIDELINE_DESCRIPTION'){
			return {			
						...state,
						guideline:{
							...state.guideline,
							fields:{
								...state.guideline.fields,
								guideline_description: action.payload
							}
						}

					}
			
		}

		if(action.type=='UPDATE_GUIDELINE_CATEGORY'){

				return {			
						...state,
						guideline:{
							...state.guideline,
							fields:{
								...state.guideline.fields,
								guideline_category: action.payload
							}
						}

					}
		}


		if(action.type=='ADD_BLANK_REVIEWER'){
			
			return {
						...state,
						guideline:{
							...state.guideline,

							fields:{
								...state.guideline.fields,
								review_panel: [...state.guideline.fields.review_panel, {
 				title:null,
 				firstname:null,
 				surname:null,
 				email:null
 			}]
							}
								
						}

					}
		
		}

		if(action.type=='REMOVE_REVIEWER'){
			console.log('Removing index',action.payload);
			return{
							...state,
						guideline:{
							...state.guideline,
							fields:{
								...state.guideline.fields,
								review_panel: [...state.guideline.fields.review_panel].filter((item, index) => index != action.payload)
							}
								
						}
			}
		}

		if(action.type=='FETCHED_GUIDELINE'){
			
					
				// console.log(action.payload);
						return{
							...state,
						guideline:{
							...state.guideline,
							status:action.payload.status,
							fields:{
								...state.guideline.fields,
								guideline_title: action.payload.acf.guideline_title,
								guideline_category: action.payload.acf.guideline_category,
								guideline_description: action.payload.acf.guideline_description,
								lead_author: action.payload.acf.lead_author,
								review_panel: action.payload.acf.review_panel,
								file: {

								id: action.payload.acf.file.id,
								ID: action.payload.acf.file.ID
								},
								start_date:action.payload.acf.start_date,
								end_date:action.payload.acf.end_date
							}
								
						},
						postid: action.payload.id,
						modified: action.payload.modified_gmt


			}
				
			
		}

		if(action.type=='UPDATE_LEADAUTHOR_TITLE'){

			// console.log(action);

			const update = {
						...state,
						guideline:{
							...state.guideline,
							fields:{
								...state.guideline.fields,
								lead_author: [...state.guideline.fields.lead_author].map((e,i)=>{

									const newLeadAuthorState = {
										title:action.payload,
										firstname:e.firstname,
										surname:e.surname,
										email:e.email
									}


									return(newLeadAuthorState)
							})
								}					
							}		
						};


			return update;
		}

		if(action.type=='UPDATE_LEADAUTHOR_FIRSTNAME'){

			// console.log(action);

			const update = {
						...state,
						guideline:{
							...state.guideline,
							fields:{
								...state.guideline.fields,
								lead_author: [...state.guideline.fields.lead_author].map((e,i)=>{

									const newLeadAuthorState = {
										title:e.title,
										firstname:action.payload,
										surname:e.surname,
										email:e.email
									}


									return(newLeadAuthorState)
							})
								}					
							}		
						};


			return update;
		}

			if(action.type=='UPDATE_LEADAUTHOR_SURNAME'){

			// console.log(action);

			const update = {
						...state,
						guideline:{
							...state.guideline,
							fields:{
								...state.guideline.fields,
								lead_author: [...state.guideline.fields.lead_author].map((e,i)=>{

									const newLeadAuthorState = {
										title:e.title,
										firstname:e.firstname,
										surname:action.payload,
										email:e.email
									}


									return(newLeadAuthorState)
							})
								}					
							}		
						};


			return update;
		}

		if(action.type=='UPDATE_LEADAUTHOR_EMAIL'){

			// console.log(action);

			const update = {
						...state,
						guideline:{
							...state.guideline,
							fields:{
								...state.guideline.fields,
								lead_author: [...state.guideline.fields.lead_author].map((e,i)=>{

									const newLeadAuthorState = {
										title:e.title,
										firstname:e.firstname,
										surname:e.surname,
										email:action.payload
									}


									return(newLeadAuthorState)
							})
								}					
							}		
						};


			return update;
		}

		if(action.type=='UPDATE_REVIEWER_TITLE'){

			// console.log(action);

			var v = state.guideline.fields.review_panel.map((e,i)=>{

				if(action.payload.index == i){
					return{
						...e,
						title: action.payload.title
					}
				}
				if(action.payload.index != i){
					return{
						...e,
					}
				}



			});

			const update = {
						...state,
						guideline:{
							...state.guideline,
							fields:{
								...state.guideline.fields,
								review_panel: v
							
								}					
							}		
						};


			return update;
		}


		if(action.type=='UPDATE_REVIEWER_FIRSTNAME'){

			// console.log(action);

			var v = state.guideline.fields.review_panel.map((e,i)=>{
				console.log(e,i)

				if(action.payload.index == i){
					return{
						...e,
						firstname: action.payload.firstname
					}
				}
				if(action.payload.index != i){
					return{
						...e,
					}
				}



			});

			const update = {
						...state,
						guideline:{
							...state.guideline,
							fields:{
								...state.guideline.fields,
								review_panel: v
							
								}					
							}		
						};


			return update;
		}

		if(action.type=='UPDATE_REVIEWER_SURNAME'){

			// console.log(action);

			var v = state.guideline.fields.review_panel.map((e,i)=>{
				console.log(e,i)

				if(action.payload.index == i){
					return{
						...e,
						surname: action.payload.surname
					}
				}
				if(action.payload.index != i){
					return{
						...e,
					}
				}



			});

			const update = {
						...state,
						guideline:{
							...state.guideline,
							fields:{
								...state.guideline.fields,
								review_panel: v
							
								}					
							}		
						};


			return update;
		}

		if(action.type=='UPDATE_REVIEWER_EMAIL'){

			// console.log(action);

			var v = state.guideline.fields.review_panel.map((e,i)=>{
				console.log(e,i)

				if(action.payload.index == i){
					return{
						...e,
						email: action.payload.email
					}
				}
				if(action.payload.index != i){
					return{
						...e,
					}
				}



			});

			const update = {
						...state,
						guideline:{
							...state.guideline,
							fields:{
								...state.guideline.fields,
								review_panel: v
							
								}					
							}		
						};


			return update;
		}


		if(action.type=='UPDATE_MODIFIED'){
			return {
				...state,
				modified: action.payload
			}
		}

		if(action.type=='GUIDELINE_STATUS_UPDATE'){
			return{
				...state,
			guideline:{
				...state.guideline,
				status: action.payload
				}
			}
		}

		if(action.type=='SET_START_DATE'){
			const update = {
						...state,
						guideline:{
							...state.guideline,
							fields:{
								...state.guideline.fields,
								start_date: action.payload
							
								}					
							}		
						};

			// console.log('[Set start date payload] ', action.payload);
			// console.log('[Set start date update] ', update);




			return update;

		}

		if(action.type=='SET_END_DATE'){
				return{
				...state,
			guideline:{
				...state.guideline,
				fields:{
					...state.guideline.fields,
					end_date: action.payload

				}
				
				}
			}

		}

		//Actions for persisting in wordpress


								
		return state
	}


export default guidelinesEditReducer
