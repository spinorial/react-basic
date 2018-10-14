import React from 'react';
import {connect} from 'react-redux';
import {updateGuidelineStatus, persistToDatabase} from './Actions/guidelinesActions.js';
import CRUDClass from './crudClass.js';


class GuidelineStatus extends React.Component{
	constructor(props){
		super(props);
		this.handleGuidelineStatus = this.handleGuidelineStatus.bind(this);
	}


	handleGuidelineStatus = (event) =>{

	
		var statusTransition = event.target.value;

		 console.log('transition ',statusTransition);

		if(statusTransition=='Publish'){

			this.props.updateStatus('draft');
		}

		if(statusTransition=='Draft')

			this.props.updateStatus('publish');
		}

	

	



	render(){



		return(

		<div>

		{/*	
			<button className='btn btn-primary' type='button' onClick={this.handleGuidelineStatus}>{this.props.mappedGuideline.status == 'draft' ? 'Set Published' : 'Set Draft'}
			</button>*/}

			<select className='form-control' onChange={this.handleGuidelineStatus}>
			<option>
			{this.props.mappedGuideline.status == 'publish' ? 'Publish' : 'Draft'}
			</option>
			<option>
			Publish
			</option>
			<option>
			Draft
			</option>
			</select>
					
		</div>
		)
	}
}



const mapStateToProps = (state)=>{

	return {

		mappedGuideline: state.edit
	

	}

}

const mapDispatchToProps = (dispatch)=>{
	return {

		updateStatus: (status)=>dispatch(updateGuidelineStatus(status)),
		persist: ()=>dispatch(persistToDatabase())

	}
}

export default connect(mapStateToProps,mapDispatchToProps)(GuidelineStatus);


