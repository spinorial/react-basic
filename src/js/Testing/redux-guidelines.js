import {createStore} from 'redux';


//Actions

//Action tells us how something happens

const myAction = {
	type: 'DO_SOMETHING'
}

//Action Generators

//Store

//----- Reducers --------- //

//Reduces are pure functions. They take in the original state and an action and using these they return a new state

const nullReducer = (state = {count:0},action) =>{

	if(action.type==='INC_COUNTER'){
		return {count: state.count + 1}
	}else if(action.type==='ADD_VALUE'){
		return {count: state.count + action.value}
	}else{

	return state;
	
	}


}

// Can log out the null reducer

// console.log(nullReducer());

// Can add in a different state

const initialState = {

	count: 0,
	text: 'This is a text string',
	fields: []
}

// console.log(nullReducer(initialState));

// console.log(nullReducer(initialState,myAction));


//Reducers are pure functions - output only determined by input, cannot use global variables for example
//This means that it is limited to the function scope only\

// const fieldReducer = (state = initialState, action)=>{

// 	switch(type){

// 		case 'ADD_FIELD':

// 		newState = state.fields.push(action.field);

// 		return(newState);


// 	}
// 	return state;
// }


// console.log('fieldReducer', fieldReducer());

const addFieldAction = {

	type:  'ADD_FIELD',
	field: {
		text: 'Some field text',
		data: 9
	}
}

// console.log('fieldReducer', fieldReducer(initialState, addFieldAction));





//-----------//

//Subscribing to a store
const store = createStore(nullReducer);

const subscribe = store.subscribe(()=>{
	console.log('subscription: ',store.getState);
})

//Creating a Store

store.dispatch({type: 'INC_COUNTER'});
console.log(store.getState());

store.dispatch({type: 'ADD_VALUE', value: 10});
console.log(store.getState());







