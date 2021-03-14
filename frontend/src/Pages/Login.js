// import React, { Component } from 'react';
// import Axios from '../utils/axiosInstance';
// import { constants } from '../utils/constants';

// export class Login extends Component {
// 	state = { email: '', password: '', errors: null };

// 	onChangeHandler = (event) => {
// 		let value = event.target.value;
// 		this.setState({ [event.target.name]: value });
// 	};

// 	onSubmitHandler = async () => {
// 		try {
// 			const { email, password } = this.state;
// 			let resp = await Axios.post('/login', {
// 				email,
// 				password,
// 				role: constants.ADMIN, //TODO: have to refactor. get the role from the parent
// 			});
// 			let mail = resp.data.user.email;
// 			let role = resp.data.user.role;
// 			let store = resp.data.store;
// 			console.log(resp);
// 			this.setState({ errors: null }, () => {
// 				console.log('running?');
// 				this.props.loginSuccessHandler(mail, role, store, () => {
// 					this.props.history.push('/dashboard');
// 				});
// 			});
// 		} catch (err) {
// 			console.log(err);
// 			console.log(err.response);
// 			this.setState({ errors: err.response.data.errors[0].message });
// 		}
// 	};

// 	render() {
// 		return (
// 			<div>
// 				<h1>Welcome from the login page</h1>
// 				<div>
// 					<input
// 						onChange={this.onChangeHandler}
// 						value={this.state.email}
// 						name='email'
// 						type='email'
// 						placeholder='Email'
// 					/>

// 					<input
// 						onChange={this.onChangeHandler}
// 						value={this.state.password}
// 						name='password'
// 						type='password'
// 						placeholder='Password'
// 					/>

// 					<button onClick={this.onSubmitHandler}>SUBMIT</button>

// 					{this.state.errors && <p>{this.state.errors}</p>}
// 				</div>
// 			</div>
// 		);
// 	}
// }

// export default Login;

// -------------------------------------------------------------

import React, { Component } from 'react';
import Axios from '../utils/axiosInstance';
import { constants } from '../utils/constants';
import '../styles/App.css';
import { Link } from 'react-router-dom';

export class Login extends Component {
	state = { email: '', password: '', errors: null };

	onChangeHandler = (event) => {
		let value = event.target.value;
		this.setState({ [event.target.name]: value });
	};

	onCloseError = async () => {
		this.setState({ errors: null });
	};

	onSubmitHandler = async () => {
		try {
			const { email, password } = this.state;
			let resp = await Axios.post('/login', {
				email,
				password,
				role: constants.ADMIN, //TODO: have to refactor. get the role from the parent
			});
			let mail = resp.data.user.email;
			let role = resp.data.user.role;
			let store = resp.data.store;
			console.log(resp);
			this.setState({ errors: null }, () => {
				console.log('running?');
				this.props.loginSuccessHandler(mail, role, store, (s) => {
					this.props.history.push(`/`);
				});
			});
		} catch (err) {
			console.log(err);
			console.log(err.response);
			this.setState({ errors: err.response.data.errors[0].message });
		}
	};

	render() {
		return (
			<div id='main'>
				<div id='headrr'>
					<img
						alt='upload'
						src='https://www.jtvdigital.com/wp-content/uploads/2013/05/iTunes_Pre-order1.png'
						height='60px'
					/>
					<h2 id='bud'>Budget Shopify</h2>
				</div>
				<div id='loginbox'>
					<h1 id='wel'>Login</h1>
					<div>
						<input
							id='i1'
							onChange={this.onChangeHandler}
							value={this.state.email}
							name='email'
							type='email'
							placeholder='Email'
						/>
						<br></br>

						<input
							id='i2'
							onChange={this.onChangeHandler}
							value={this.state.password}
							name='password'
							type='password'
							placeholder='Password'
						/>
						<br></br>
						<button id='b1' onClick={this.onSubmitHandler}>
							SUBMIT
						</button>
						<h3 id='last'>
							Don't have an account?{' '}
							<Link to='/register'>
								<div id='c'>Register</div>
							</Link>
						</h3>

						{this.state.errors && (
							<div class='callout'>
								<div class='callout-header'>
									{this.state.errors}
								</div>
								<span
									class='closebtn'
									onClick={this.onCloseError}>
									×
								</span>
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default Login;
