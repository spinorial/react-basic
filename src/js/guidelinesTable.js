/*
* Guidelines Table Component
* This component displays the guidelines in a table
* It obtains the information from the GuidelinesStore
*/



import React from 'react';
import {connect} from 'react-redux';
import {updateGuidelines} from './Actions/guidelinesActions.js';
import {updateGuidelinesRoute, getGuidelineData} from './Actions/guidelinesActions.js';

import axios from 'axios';


//Constants

import * as baseURLs from './Constants/routes.js';


class GuidelinesTable extends React.Component{
		constructor(props){
		super(props);

		//Function bindings

		// this.getGuidelinesData = this.getGuidelinesData.bind(this);
		this.selectGuidelinesByLetter = this.selectGuidelinesByLetter.bind(this);
		this.selectGuidelinesAll = this.selectGuidelinesAll.bind(this);
		this.selectGuidelinesAllMy = this.selectGuidelinesAllMy.bind(this);

		

	}

	componentDidMount() {

  		//Calls an asynchronous action generator getGuidelineData on mount
  		this.props.getGuidelineData(this.props.mappedRoute);

  	}

  	componentDidUpdate(){

  		// this.getGuidelinesData(this.props.mappedRoute);
 
  	}


  	selectGuidelinesByLetter = (letter)=>{


		let selectURL = baseURLs.GUIDLINE_BY_LETTER_URL + letter;

		if(this.props.userid){

  		selectURL = baseURLs.GUIDLINE_BY_LETTER_URL + letter + '/id=' + this.props.userid;

  		}
  		
  		this.props.updateGuidelinesRoute(selectURL);
  		// this.getGuidelinesData(selectURL);
  		this.props.getGuidelineData(selectURL);


  	}

  	selectGuidelinesAll = ()=>{

  		let selectURL = baseURLs.GUIDELINES_URL;

  		
  		this.props.updateGuidelinesRoute(selectURL);
  		// this.getGuidelinesData(selectURL);

  		this.props.getGuidelineData(selectURL);


  	}

  	selectGuidelinesAllMy = ()=>{

  		let selectURL = baseURLs.GUIDELINES_URL;

  		if(this.props.userid){

  		selectURL = baseURLs.GUIDELINES_URL + '/id=' + this.props.userid;

  		}

  		
  		this.props.updateGuidelinesRoute(selectURL);
  		// this.getGuidelinesData(selectURL);

  		this.props.getGuidelineData(selectURL);

  	}

  	selectGuidelinesByLeadAuthor = (firstname, surname) =>{

  		const selectURL = baseURLs.LEAD_AUTHOR_GUIDELINES_URL(firstname,surname);
  		this.props.updateGuidelinesRoute(selectURL);
  		this.props.getGuidelineData(selectURL);

  	}

  

	
	render(){

		//Note when using on click, can only have it reference function, if it needs to execute
		//a function this has to be put in through an anonymous function ()=>{}. The reason for this
		//is that we only want the function to execute when it is clicked.

		const guideItemsUser = this.props.mappedGuidelines.map(g=>
		{
			let mailto = "mailto:"+ g.lead_author[0].email;
			return(
				<tr style={{'border-bottom':'solid 1px lightgrey','height':'70px'}}>
				<td style={{'padding-left':'5px'}}>{g.guideline_category}</td>
				<td><a href={g.file.url}>{g.guideline_title}</a></td>
				<td>{g.guideline_description}</td>
				<td><a href={mailto} target='blank'>{g.lead_author[0].title} {g.lead_author[0].firstname} {g.lead_author[0].surname}</a></td>
				<td>Start</td>
				<td>End</td>
				</tr>)
		})

		const guideItemsUserHead = () => {
			return 	(<thead className='bg-danger'>
				<tr style={{'height':'60px'}}>
				<th style={{'width':'15%','padding-left':'5px'}}>Category</th>
				<th style={{'width':'20%'}}>Title</th>
				<th style={{'width':'40%'}}>Description</th>
				<th style={{'width':'10%'}}>Lead Author</th>
				<th style={{'width':'10%'}}>Valid From</th>
				<th style={{'width':'10%'}}>Valid Until</th>
				</tr>
			</thead>)
		};

// <a href={g.author == this.props.userid ? baseURLs.REACT_EDITOR_URL + '/' + g.id : '#'}>{g.guideline_description}</a>

		const guideItemsAdmin = this.props.mappedGuidelines.map(g=>{

			// console.log('[GuideItemsAdmin] ', g);


			const linkto = (s) => {

				if(this.props.userRole){
					if(this.props.userRole[0]=='administrator'){
						return (<a href={baseURLs.REACT_EDITOR_URL + '/' + s.id}>{s.guideline_description}</a>);
					}
				}

				if(s.author == this.props.userid){

					return (<a href={baseURLs.REACT_EDITOR_URL + '/' + s.id}>{s.guideline_description}</a>);

				}else{
					return (<a>{s.guideline_description}</a>);

				}


			}

			
			return(
				<tr style={{'border-bottom':'solid 1px lightgrey','height':'70px'}}>
				<td style={{'padding-left':'5px'}}>{g.guideline_category}</td>
				<td><a href={g.file.url}>{g.guideline_title}</a></td>
				<td>{linkto(g)}</td>
				<td><a>{g.status}</a></td>
				<td>{g.end__date}</td>
				</tr>)

		});
		const guideItemsAdminTableHead = () =>{

			return 	(<thead className='bg-danger'>
				<tr style={{'height':'60px'}}>
				<th style={{'width':'10%','padding-left':'5px'}}>Category</th>
				<th style={{'width':'20%'}}>Title</th>
				<th style={{'width':'40%'}}>Description</th>
				<th style={{'width':'10%'}}>Status</th>
				<th style={{'width':'10%'}}>Valid Until</th>
				</tr>
			</thead>)

		}; //Set this up so there is a different head and different table if in admin mode.

		//Alternative guideitems if it is admin version. Wont need lead author for example. Also should gave link to 

		//IF some prop then have the 

			const sortButtons = () => {

			if(this.props.menu){

			return(<div className='bg-white container'>
		    <button className='btn btn-outline-danger btn-pad' onClick={this.selectGuidelinesAll}>All</button>
		    <button className='btn btn-outline-primary btn-pad' onClick={()=>this.selectGuidelinesByLetter('A')}>A</button>
			<button className='btn btn-outline-primary btn-pad' onClick={()=>this.selectGuidelinesByLetter('B')}>B</button>
			<button className='btn btn-outline-primary btn-pad' onClick={()=>this.selectGuidelinesByLetter('C')}>C</button>
			<button className='btn btn-outline-primary btn-pad' onClick={()=>this.selectGuidelinesByLetter('D')}>D</button>
			<button className='btn btn-outline-primary btn-pad' onClick={()=>this.selectGuidelinesByLetter('E')}>E</button>
			<button className='btn btn-outline-primary btn-pad' onClick={()=>this.selectGuidelinesByLetter('F')}>F</button>
			<button className='btn btn-outline-primary btn-pad' onClick={()=>this.selectGuidelinesByLetter('G')}>G</button>
			<button className='btn btn-outline-primary btn-pad' onClick={()=>this.selectGuidelinesByLetter('H')}>H</button>
			<button className='btn btn-outline-primary btn-pad' onClick={()=>this.selectGuidelinesByLetter('I')}>I</button>
			<button className='btn btn-outline-primary btn-pad' onClick={()=>this.selectGuidelinesByLetter('J')}>J</button>
			<button className='btn btn-outline-primary btn-pad' onClick={()=>this.selectGuidelinesByLetter('K')}>K</button>
			<button className='btn btn-outline-primary btn-pad' onClick={()=>this.selectGuidelinesByLetter('L')}>L</button>
			<button className='btn btn-outline-primary btn-pad' onClick={()=>this.selectGuidelinesByLetter('M')}>M</button>
			<button className='btn btn-outline-primary btn-pad' onClick={()=>this.selectGuidelinesByLetter('N')}>N</button>
			<button className='btn btn-outline-primary btn-pad' onClick={()=>this.selectGuidelinesByLetter('O')}>O</button>
			<button className='btn btn-outline-primary btn-pad' onClick={()=>this.selectGuidelinesByLetter('P')}>P</button>
			<button className='btn btn-outline-primary btn-pad' onClick={()=>this.selectGuidelinesByLetter('Q')}>Q</button>
			<button className='btn btn-outline-primary btn-pad' onClick={()=>this.selectGuidelinesByLetter('R')}>R</button>
			<button className='btn btn-outline-primary btn-pad' onClick={()=>this.selectGuidelinesByLetter('S')}>S</button>
			<button className='btn btn-outline-primary btn-pad' onClick={()=>this.selectGuidelinesByLetter('T')}>T</button>
			<button className='btn btn-outline-primary btn-pad' onClick={()=>this.selectGuidelinesByLetter('U')}>U</button>
			<button className='btn btn-outline-primary btn-pad' onClick={()=>this.selectGuidelinesByLetter('V')}>V</button>
			<button className='btn btn-outline-primary btn-pad' onClick={()=>this.selectGuidelinesByLetter('W')}>W</button>
			<button className='btn btn-outline-primary btn-pad' onClick={()=>this.selectGuidelinesByLetter('X')}>X</button>
			<button className='btn btn-outline-primary btn-pad' onClick={()=>this.selectGuidelinesByLetter('Y')}>Y</button>
			<button className='btn btn-outline-primary btn-pad' onClick={()=>this.selectGuidelinesByLetter('Z')}>Z</button>
			{this.props.status ? 

			<button className='btn btn-outline-danger btn-pad' onClick={()=>this.selectGuidelinesAllMy()}>All My Guidelines</button>


			:''}

			</div>)}

		}

	
		
		return (<div>


		{sortButtons()}
		


		<div className="table-div" style={{'min-height':'400px'}}>
			<table style={{'border':'solid 1px black'}}>
			{this.props.status ? guideItemsAdminTableHead() : guideItemsUserHead()}
			<tbody>
			{this.props.status ? guideItemsAdmin: guideItemsUser}

			</tbody>
			</table>
			</div>
			
			</div>)
	}
}


//Map the state and actions 

const mapStateToProps = (state)=>{

	return {
		mappedGuidelines: state.table.guidelines,
		mappedRoute: state.table.route,
		status: state.auth.status,
		userid: state.auth.data.user_id,
		userRole: state.auth.data.user_roles

	}

}

const mapDispatchToProps = (dispatch)=>{
	return {
		updateGuidelinesAction: (dataArray) => dispatch(updateGuidelines(dataArray)),
		updateGuidelinesRoute: (routeURL) => dispatch(updateGuidelinesRoute(routeURL)),
		getGuidelineData: (url) => dispatch(getGuidelineData(url))
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(GuidelinesTable);