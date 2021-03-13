import React, { Component } from 'react';

export class ShowInventory extends Component {
	componentDidMount = () => {
		console.log(this.props);
	};

	render() {
		return (
			<div>
				<h1>hello from show inventory</h1>
				<h1>should contain add inventory function</h1>
			</div>
		);
	}
}

export default ShowInventory;
