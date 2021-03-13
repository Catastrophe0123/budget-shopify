import React, { Component } from 'react';
import Axios from '../utils/axiosInstance';

export class ShowInventory extends Component {
	state = {
		items: null,
		name: '',
		price: '',
		quantityAvailable: '',
		image: '',
	};

	componentDidMount = async () => {
		// "/:store/items"
		try {
			console.log('Erq');
			const req = await Axios.get(`/${this.props.store}/items`);
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
			let { name, price, quantityAvailable, image } = this.state;
			const req = await Axios.post(`/item`, {
				name,
				price,
				quantityAvailable,
				image,
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
		return (
			<div>
				<h1>hello from show inventory</h1>
				<h1>should contain add inventory function</h1>

				{this.state.items && (
					<div>
						{this.state.items.map((item) => {
							console.log(item);
							return (
								<div key={item._id}>
									<h1>{item.name}</h1>
									<h1>{item.price}</h1>
									<h1>{item.category}</h1>
									<h1>{item.quantityAvailable}</h1>
									<img src={item.image} alt='item' />
								</div>
							);
						})}
					</div>
				)}

				<div>
					<input
						onChange={this.onChangeHandler}
						value={this.state.name}
						name='name'
						placeholder='Name'
					/>
					<input
						onChange={this.onChangeHandler}
						value={this.state.price}
						name='price'
						placeholder='Price'
					/>
					<input
						onChange={this.onChangeHandler}
						value={this.state.quantityAvailable}
						name='quantityAvailable'
						placeholder='quantityAvailable'
					/>
					<input
						onChange={this.onChangeHandler}
						value={this.state.image}
						name='image'
						placeholder='Image'
					/>
				</div>
				<button onClick={this.onAddInventoryClickHandler}>
					+ Add inventory
				</button>
			</div>
		);
	}
}

export default ShowInventory;
