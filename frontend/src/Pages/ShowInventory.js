// import React, { Component } from 'react';
// import Axios from '../utils/axiosInstance';

// export class ShowInventory extends Component {
// 	state = {
// 		items: null,
// 		name: '',
// 		price: '',
// 		category: '',
// 		quantityAvailable: '',
// 		image: '',
// 	};

// 	componentDidMount = async () => {
// 		// "/:store/items"
// 		try {
// 			console.log('Erq');
// 			const req = await Axios.get(
// 				`/${this.props.match.params.storeid}/items`
// 			);
// 			console.log(req.data);

// 			this.setState({ items: req.data });

// 			// console.log(this.props);
// 		} catch (err) {
// 			console.log(err.response);
// 			this.setState({ errors: err.response.data.errors[0].message });
// 		}
// 	};

// 	onChangeHandler = (event) => {
// 		let value = event.target.value;
// 		this.setState({ [event.target.name]: value });
// 	};

// 	onAddInventoryClickHandler = async () => {
// 		// add inventory
// 		try {
// 			let {
// 				name,
// 				price,
// 				quantityAvailable,
// 				image,
// 				category,
// 			} = this.state;
// 			const req = await Axios.post(`/item`, {
// 				name,
// 				price,
// 				quantityAvailable,
// 				image,
// 				category,
// 			});

// 			console.log(req);
// 			this.setState({
// 				items: req.data.store.inventory,
// 				name: '',
// 				price: '',
// 				quantityAvailable: '',
// 				image: '',
// 			});
// 		} catch (err) {
// 			console.log(err.response);
// 			this.setState({ errors: err.response.data.errors[0].message });
// 		}
// 	};

// 	render() {
// 		return (
// 			<div>
// 				<h1>hello from show inventory</h1>
// 				<h1>should contain add inventory function</h1>

// 				{this.state.items && (
// 					<div>
// 						{this.state.items.map((item) => {
// 							console.log(item);
// 							if (item.image === '') {
// 								item.image =
// 									'https://semantic-ui.com/images/wireframe/image.png';
// 							}
// 							return (
// 								<div key={item._id}>
// 									<h1> Name: {item.name}</h1>
// 									<h1>Price : {item.price}</h1>
// 									<h1>Category : {item.category}</h1>
// 									<h1>Quantity : {item.quantityAvailable}</h1>
// 									<img src={item.image} alt='item' />
// 									{/* TODO: remove ITEM */}
// 								</div>
// 							);
// 						})}
// 					</div>
// 				)}

// 				<div>
// 					<input
// 						onChange={this.onChangeHandler}
// 						value={this.state.name}
// 						name='name'
// 						placeholder='Name'
// 					/>
// 					<input
// 						onChange={this.onChangeHandler}
// 						value={this.state.price}
// 						name='price'
// 						placeholder='Price'
// 					/>
// 					<input
// 						onChange={this.onChangeHandler}
// 						value={this.state.quantityAvailable}
// 						name='quantityAvailable'
// 						placeholder='quantityAvailable'
// 					/>
// 					<input
// 						onChange={this.onChangeHandler}
// 						value={this.state.category}
// 						name='category'
// 						placeholder='Category'
// 					/>
// 					<input
// 						onChange={this.onChangeHandler}
// 						value={this.state.image}
// 						name='image'
// 						placeholder='Image'
// 					/>
// 				</div>
// 				<button onClick={this.onAddInventoryClickHandler}>
// 					+ Add inventory
// 				</button>
// 			</div>
// 		);
// 	}
// }

// export default ShowInventory;

// --------------------------------------------------

import React, { Component } from 'react';
import Axios from '../utils/axiosInstance';
import '../styles/App.css';

export class ShowInventory extends Component {
	state = {
		items: null,
		name: '',
		price: '',
		category: '',
		quantityAvailable: '',
		image: '',
	};

	componentDidMount = async () => {
		// "/:store/items"
		try {
			console.log('Erq');
			const req = await Axios.get(
				`/${this.props.match.params.storeid}/items`
			);
			console.log(req.data);

			this.setState({ items: req.data });

			// console.log(this.props);
		} catch (err) {
			console.log(err.response);
			this.setState({ errors: err.response.data.errors[0].message });
		}
	};

	onChangeHandler = (event) => {
		let value = event.target.value;
		this.setState({ [event.target.name]: value });
	};

	onAddInventoryClickHandler = async () => {
		// add inventory
		try {
			let {
				name,
				price,
				quantityAvailable,
				image,
				category,
			} = this.state;
			const req = await Axios.post(`/item`, {
				name,
				price,
				quantityAvailable,
				image,
				category,
			});

			console.log(req);
			this.setState({
				items: req.data.store.inventory,
				name: '',
				price: '',
				quantityAvailable: '',
				image: '',
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
				<div id='fh'>
					<h1>Manage your Inventory</h1>
					<h3>Add Products</h3>

					<input
						class='si'
						onChange={this.onChangeHandler}
						value={this.state.name}
						name='name'
						placeholder='Name'
					/>
					<br></br>
					<input
						class='si'
						onChange={this.onChangeHandler}
						value={this.state.price}
						name='price'
						placeholder='Price'
					/>
					<br></br>
					<input
						class='si'
						onChange={this.onChangeHandler}
						value={this.state.quantityAvailable}
						name='quantityAvailable'
						placeholder='quantityAvailable'
					/>
					<br></br>
					<input
						class='si'
						onChange={this.onChangeHandler}
						value={this.state.category}
						name='category'
						placeholder='Category'
					/>
					<br></br>
					<input
						class='si'
						onChange={this.onChangeHandler}
						value={this.state.image}
						name='image'
						placeholder='Image'
					/>
					<br></br>

					<button id='sb1' onClick={this.onAddInventoryClickHandler}>
						Add inventory
					</button>
				</div>
				<div id='sh'>
					<h3 id='sum'>Products</h3>
					{this.state.items && (
						<div>
							{this.state.items.map((item) => {
								console.log(item);
								if (item.image === '') {
									item.image =
										'https://semantic-ui.com/images/wireframe/image.png';
								}
								return (
									<div
										style={{
											width: '100%',
											display: 'flex',
											justifyContent: 'center',
										}}
										class='tab1cards'>
										{/* <div key={item._id}>
									<h1> Name: {item.name}</h1>
									<h1>Price : {item.price}</h1>
									<h1>Category : {item.category}</h1>
									<h1>Quantity : {item.quantityAvailable}</h1>
									<img src={item.image} alt='item' />
								</div> */}
										<div
											style={{
												margin: '25px',
											}}
											class='card'>
											<img
												style={{ width: '250px' }}
												src={item.image}
												alt='iqjdw'
											/>
											<h1>{item.name}</h1>
											<p class='price'>{item.price}</p>
											<p>{item.quantityAvailable}</p>
										</div>
									</div>
								);
							})}
						</div>
					)}
				</div>
			</div>
		);
	}
}

export default ShowInventory;
