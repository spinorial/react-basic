//Import react libraries
import React from 'react';
import ReactDOM from 'react-dom';

//Import custom components
import Block from './block.js';

//Import CSS and SCSS
import '../css/app.css';
import '../sass/app.scss';


class GenericApp extends React.Component{

	constructor(props){
		super(props);
	}

	render(){
		return (<Block />);		
	}
}


ReactDOM.render(<GenericApp />, document.getElementById('app'));
