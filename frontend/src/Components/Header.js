import React, { Component } from 'react';
import Axios from '../utils/axiosInstance';
import '../styles/App.css';
import { Link, withRouter } from 'react-router-dom';

export class Header extends Component {
	logoutHandler = async () => {
		const resp = await Axios.post('/logout');
		console.log(resp);
		this.props.logoutHandler(() => {
			this.props.history.push('/');
		});
	};

	render() {
		return (
			<div class='header' id='lie'>
				<a href='#default' class='logoi'>
					<img
						alt='Asdqw'
						id='pic'
						src='https://www.jtvdigital.com/wp-content/uploads/2013/05/iTunes_Pre-order1.png'
					/>
				</a>
				<Link to='/'>
					<a class='logo'>Budget Shopify</a>
				</Link>

				<div class='header-right'>
					{/* <a>Account</a> */}
					{this.props.authenticated ? (
						<span>
							<a onClick={this.logoutHandler} class='active'>
								Logout
							</a>
							<Link to={`/admin/${this.props.store}`}>
								View Your Store
							</Link>
							<Link to={`/admin/${this.props.store}/inventory`}>
								View Inventory
							</Link>
						</span>
					) : (
						<Link to='/login'>
							<a class='active'>Login</a>
						</Link>
					)}
				</div>
			</div>
		);
	}
}

export default withRouter(Header);
