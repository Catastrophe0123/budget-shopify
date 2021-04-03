// import React, { Component } from 'react';
// import Axios from '../utils/axiosInstance';

// export class CreateStore extends Component {
// 	state = { name: '', address: '', errors: null };

// 	onChangeHandler = (event) => {
// 		let value = event.target.value;
// 		this.setState({ [event.target.name]: value });
// 	};

// 	onCreateStoreHandler = async () => {
// 		try {
// 			const { name, address } = this.state;
// 			let resp = await Axios.put('/store', {
// 				id: this.props.store,
// 				name,
// 				address,
// 				// role: constants.ADMIN, //TODO: have to refactor. get the role from the parent
// 			});
// 			console.log(resp);
// 			this.setState({ errors: null }, () => {
// 				this.props.history.push('/inventory');
// 			});
// 		} catch (err) {
// 			console.log(err.response);
// 			this.setState({ errors: err.response.data.errors[0].message });
// 		}
// 	};

// 	render() {
// 		return (
// 			<div>
// 				<h1>hello from the create store page</h1>
// 				<input
// 					onChange={this.onChangeHandler}
// 					value={this.state.name}
// 					name='name'
// 					placeholder='Name'
// 				/>

// 				<input
// 					onChange={this.onChangeHandler}
// 					value={this.state.address}
// 					name='address'
// 					placeholder='Address'
// 				/>
// 				<button onClick={this.onCreateStoreHandler}>
// 					CREATE STORE
// 				</button>
// 			</div>
// 		);
// 	}
// }

// export default CreateStore;

// --------------------------------------------------

import React, { Component } from 'react';
import Axios from '../utils/axiosInstance';
import '../styles/App.css';

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
				this.props.history.push(`admin/${this.props.store}/dashboard`);
				this.props.history.push(`/`);
			});
		} catch (err) {
			console.log(err.response);
			this.setState({ errors: err.response.data.errors[0].message });
		}
	};

	render() {
		if (!this.props.authenticated) {
			this.props.history.push('/');
			return null;
		}

		return (
			<div>
				<div id='mainc'>
					<div id='cbox'>
						<h1 id='ct'>Bring Your Business Online</h1>
						<input
							id='ci1'
							onChange={this.onChangeHandler}
							value={this.state.name}
							name='name'
							placeholder='Name'
						/>
						<br></br>

						<input
							id='ci2'
							onChange={this.onChangeHandler}
							value={this.state.address}
							name='address'
							placeholder='Address'
						/>
						<br></br>

						{/* <input
							id='ci3'
							onChange={this.onChangeHandler}
							value={this.state.address}
							name='storename'
							placeholder='Storename'
						/> */}
						<br></br>

						{this.state.errors && <p>{this.state.errors}</p>}

						<button id='cb1' onClick={this.onCreateStoreHandler}>
							CREATE STORE
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default CreateStore;
