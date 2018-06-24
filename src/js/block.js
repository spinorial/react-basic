import React from 'react';

class Block extends React.Component{
		constructor(props){
		super(props);

		this.state={
			stateItem: 'state item',
			stateObj: {
				objectItem1: 'object item 1',
				objectItem2: <div><h1>This is some value</h1></div>
			},
			stateArr: [{
				arr1Item1: 'item 1 1',
				arr1Item2: 'item 1 2'
			},{
				arr2Item1: 'item 2 1',
				arr2Item1: 'item 1 2'
			}],
			someValue: null
		}

		this.overwrite = this.overwrite.bind(this);
	}

	componentDidMount() {


  	}

  	componentWillUnmount() {

  	}


	textToPrint = ()=>{
		return ("This is a boilerplate for React");
	}

	overwrite = ()=>{

		console.log(this.state);

		this.setState((prevState)=>{
      
      	return{
        	stateItem: 'overwritten state'
      	}
    	
    	});

	}

	
	render(){
		
		return (<div>
			<h1>{this.textToPrint()}</h1>
			<h2>{this.state.stateItem}</h2>
			<h2>{this.state.stateObj.objectItem1}</h2>
			<h3>{this.state.stateObj.objectItem2}</h3>
			
			<button key="button-1" onClick={this.overwrite}>Overwrite</button>

			</div>)
	}
}

export default Block;