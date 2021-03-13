import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Dashboard extends Component {
	render() {
		return (
			<div>
				<h1>HELLO FROM DASHBOARD</h1>
				<h1>list of customers</h1>
				<h1> show visit count </h1>
				<h1> view items/inventory </h1>
				<Link to='/inventory'>
					<button>VIEW INVENTORY</button>
				</Link>
			</div>
		);
	}
}

export default Dashboard;
