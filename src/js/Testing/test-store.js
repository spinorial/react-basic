import {createStore} from 'redux';


//TODO: Export these to a separate file that can be easily changed for different servers
const baseURL = 'https://guidelines.joe:8890/';
const guidelinesURL = 'wp-json/guideline/filter/title=notitle';
const routeURL = baseURL + guidelinesURL;



/*
* Defualt State to be used in the reducer.
* 
*
*/


const guidelinesInitialState = {

	route: routeURL,
	guidelines: []

}


/*
* Reducer. 
* Takes in state and an action, returns a new state based on the old.
* Is a pure function
*/

const guidelinesReducer = (state = guidelinesInitialState, action) => {

	if(action.type=='UPDATE_GUIDELINES'){
		return {
			...state,
			guidelines: action.payload

		};
	};

	if(action.type=='SORT_GUIDELINES_BY_TITLE'){

		//TODO: function to sort the guidelines by the title

	}

	if(action.type=='SORT_GUIDELINES_BY_AUTHOR'){

		//TODO: function to sort the guidelines by the author

	}

	if(action.type=='SORT_GUIDELINES_BY_DATE'){

		//TODO: function to sort the guidelines by the date

	}

	return state;
}

/*
* Store.
* The store is created using the reducer.
* Using the store we can dispach actions and subscribe.
*
*/

const guidelinesStore = createStore(guidelinesReducer);

const subscription = guidelinesStore.subscribe(()=>{
  console.log('guidelineStore ', guidelinesStore.getState());
});


guidelinesStore.dispatch({type:'UPDATE_GUIDELINES',payload:[{title:'something'},{title:
	'else'},{title:'here'}

]});



guidelinesStore.dispatch({type:'UPDATE_GUIDELINES',payload:['a','b','c'

]});







