import React, { Component } from 'react';
import Axios from '../utils/axiosInstance';
import { constants } from '../utils/constants';

export class Register extends Component {
	state = { email: '', password: '', errors: null };

	onChangeHandler = (event) => {
		let value = event.target.value;
		this.setState({ [event.target.name]: value });
	};

	onSubmitHandler = async () => {
		try {
			const { email, password } = this.state;
			let resp = await Axios.post('/register', {
				email,
				password,
				role: constants.ADMIN, //TODO: have to refactor. get the role from the parent
			});
			let mail = resp.data.user.email;
			let role = resp.data.user.role;
			let store = resp.data.store;

			this.setState({ errors: null }, () => {
				this.props.loginSuccessHandler(mail, role, store, () => {
					// REDIRECT HERE
					console.log('im here now');
					this.props.history.push('/createstore');
				});
			});
		} catch (err) {
			console.log(err.response);
			this.setState({ errors: err.response.data.errors[0].message });
		}
	};

	render() {
		return (
			<div>
				<h1>Welcome from the register page</h1>
				<div>
					<input
						onChange={this.onChangeHandler}
						value={this.state.email}
						name='email'
						type='email'
						placeholder='Email'
					/>

					<input
						onChange={this.onChangeHandler}
						value={this.state.password}
						name='password'
						type='password'
						placeholder='Password'
					/>

					<button onClick={this.onSubmitHandler}>SUBMIT</button>

					{this.state.errors && <p>{this.state.errors}</p>}
				</div>
			</div>
		);
	}
}

export default Register;
