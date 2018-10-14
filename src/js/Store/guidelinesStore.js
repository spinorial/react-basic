//TODO: Export these to a separate file that can be easily changed for different servers
import axios from 'axios';
import {updateGuidelinesRoute} from '../Actions/authenticationActions.js';


const baseURL = 'https://guidelines.joe:8890/';
const guidelinesURL = 'wp-json/guideline/filter/title=notitle';
const routeURL = baseURL + guidelinesURL;




const guidelinesInitialState = {

	route: routeURL,
	guidelines: [],
	storevalue: 'dummmy value for testing'

}

const guidelinesReducer = (state = guidelinesInitialState, action) =>{

	if(action.type=='TEST_ACTION'){
		return {
			...state,
			storevalue: 'updated dummy variable'
		}
	}

	if(action.type=='UPDATE_GUIDELINES'){
		return {
			...state,
			guidelines: action.payload

		};
	};

	if(action.type=='UPDATE_ROUTE'){
		return {
			...state,
			route: action.payload
		}
	}

	if(action.type=='LOAD_FROM_ROUTE'){

		//This should be thunked

		//Get data from the route
		//If logged in use get with credentials
		//If not logged in use get without credentials
		//Dispatch the update once datta received.

		// console.log('[Current Route] ',state.route);

		// axios.get(state.route)
		// .then(response => {

		// 	dispatch(updateGuidelinesRoute(state.route));

		// 	console.log('[action response] ',response);
		
		// })
		// .catch(error=>{console.log(error)})


	}


	if(action.type=='SORT_GUIDELINES_BY_TITLE'){

		//TODO: function to sort the guidelines by the title

	};

	if(action.type=='SORT_GUIDELINES_BY_AUTHOR'){

		//TODO: function to sort the guidelines by the author

	};

	if(action.type=='SORT_GUIDELINES_BY_DATE'){

		//TODO: function to sort the guidelines by the date

	};

	return state;
}

export default guidelinesReducer;