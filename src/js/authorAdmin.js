import React from 'react';
import GuidelinesTable from './guidelinesTable.js';
import GuidelinesEditor from './guidelinesEditor.js';


class AuthorAdmin extends React.Component{
	constructor(props){

		super(props);

	}

	componentDidMount(){
		console.log('AuthorAdmin Props ', this.props);
	}

	render(){
		return(<div>
			<div className='row'>
			<div className='col-sm-12 col-md-12 col-lg-6'>
			<GuidelinesTable menu={false} admin={true} />
			</div>
			<div className='col-sm-12 col-md-12 col-lg-6'>
			<GuidelinesEditor />
			</div>
			</div>

			</div>)
	}
}

export default AuthorAdmin;