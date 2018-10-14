//Import react libraries
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {HashRouter, Switch, Route} from 'react-router-dom';
import thunk from "redux-thunk";


//Import store
import guidelinesReducer from './Store/guidelinesStore';
import guidelinesEditReducer from './Store/guidelinesEditStore';
import authenticationReducer from './Store/authenticationStore';

//Import middleware src/js/Middleware/CRUDMiddleware.js
// import CRUDMiddleware from './Middleware/CRUDmiddleware.js';


//Import custom components
import GuidelinesTable from './guidelinesTable.js';
import GuidelinesEditor from './guidelinesEditor.js';
import Login from './login.js';
import AuthorAdmin from './authorAdmin.js';



//Import CSS and SCSS
import '../css/app.css';
import '../sass/app.scss';




import axios from 'axios';
import * as baseURLs from './Constants/routes.js';

import loadFromRoute from './Actions/guidelinesActions.js';

const reducers = combineReducers({
	table: guidelinesReducer,
	edit: guidelinesEditReducer,
	auth: authenticationReducer

});

//Middleware here. Not sure how to seperate this out. Could use a thunk middleware
//to have actions which have asynchronus functions as their returns.
const CRUDMiddleware = (state) => (next) => (action) =>{
	
	//Displays All Actions
	console.log('[CRUDMiddleware: Redux Action] ', action.type);
	console.log('[CRUDMiddleware: Redux Payload] ', action.payload);


	let s = store.getState();

	if(action.type=='PERSIST_TO_DATABASE'){

	//Check if logged in
		if(s.auth.status){

			var uname = s.auth.user.username;
			var pass = 	s.auth.user.password;
			var g = s.edit.guideline;

			// console.log('[Persistng to database the following] ',g)
			

			if(s.edit.postid==null){

				var session_url = baseURLs.GUIDELINE_URL;

				axios.post(session_url, g, {
					auth: {
						username: uname,
						password: pass
					}
				}).then(response => {

					
					
					// console.log('Post Created ',response.data);

					store.dispatch({type:'UPDATE_POST_ID',payload:response.data.id});
					store.dispatch({type:'UPDATE_MODIFIED',payload:response.data.modified});

					// this.props.updatePostID(response.data.id);
					// this.props.updateModified(response.data.modified);


				}).catch(function(error) {
					console.log('Error on Authentication',error);

				});
			}

			if(s.edit.postid){

				var session_url = baseURLs.GUIDELINE_URL + s.edit.postid;

				axios.put(session_url, g, {
					auth: {
						username: uname,
						password: pass
					}
				}).then(response => {

					
					// console.log('Post Updated ',response.data);

					// store.dispatch({type:'UPDATE_POST_ID',payload:response.data.id});
					store.dispatch({type:'UPDATE_MODIFIED',payload:response.data.modified});

					// this.props.updatePostID(response.data.id);
					// this.props.updateModified(response.data.modified);


				}).catch(function(error) {
					console.log('Error on Authentication',error);

				});
			}

		}

}

	console.log('[CRUDMiddleware :Current State] ', store.getState());

	next(action);
}



const store = createStore(reducers, {}, applyMiddleware(CRUDMiddleware,thunk));


//This listener could updatate to database when it is changed. 

// const subscription = store.subscribe(()=>{
//   console.log('Store changed', store.getState());
// });

//Test Dispatch

// store.dispatch(loadFromRoute(baseURLs.GUIDELINES_URL));




class App extends React.Component{

	constructor(props){
		super(props);

	}

	render(){
		return (<div>
			
			
			<Provider store={store}>

			<HashRouter>


			<Switch>


			
			<Route path='/guidelines' render={()=>(<GuidelinesTable menu={true} />)} />
			<Route path='/new' render={()=>(<GuidelinesEditor />)} />
			

			 <Route path="/editor/:postid" 

      				render={(p)=>{
					let postid = p.match.params.postid;
					console.log('route ',p);

			return (<GuidelinesEditor id={postid}/>);
			}}/>
			


			<Route path='/admin' component={AuthorAdmin} />


			</Switch>

		


			</HashRouter>
			</Provider>
		

			</div>);		
	}
}


ReactDOM.render(<App />, document.getElementById('app'));
ReactDOM.render(<Provider store={store}><Login /></Provider>, document.getElementById('login'));
