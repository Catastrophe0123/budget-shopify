import React, { Component } from 'react';
import Axios from '../utils/axiosInstance';

export class CreateStore extends Component {
	state = { name: '', address: '', errors: null };

	onChangeHandler = (event) => {
		let value = event.target.value;
		this.setState({ [event.target.name]: value });
	};

	onCreateStoreHandler = async () => {
		try {
			const { name, address } = this.state;
			let resp = await Axios.put('/store', {
				id: this.props.store,
				name,
				address,
				// role: constants.ADMIN, //TODO: have to refactor. get the role from the parent
			});
			console.log(resp);
			this.setState({ errors: null }, () => {
				this.props.history.push('/inventory');
			});
		} catch (err) {
			console.log(err.response);
			this.setState({ errors: err.response.data.errors[0].message });
		}
	};

	render() {
		return (
			<div>
				<h1>hello from the create store page</h1>
				<input
					onChange={this.onChangeHandler}
					value={this.state.name}
					name='name'
					placeholder='Name'
				/>

				<input
					onChange={this.onChangeHandler}
					value={this.state.address}
					name='address'
					placeholder='Address'
				/>
				<button onClick={this.onCreateStoreHandler}>
					CREATE STORE
				</button>
			</div>
		);
	}
}

export default CreateStore;
