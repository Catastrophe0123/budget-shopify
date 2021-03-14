import React, { Component } from 'react';
import Axios from '../utils/axiosInstance';
// import '../styles/App.css';

export class ViewStore extends Component {
	state = { items: null };

	componentDidMount = async () => {
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

	render() {
		if (!this.props.authenticated) {
			this.props.history.push('/');
			return null;
		}
		return (
			<div>
				<div>
					<div
						className='w3-main'
						style={{ marginLeft: 250, width: '100%' }}>
						{/* Push down content on small screens */}
						<div
							className='w3-hide-large'
							style={{ marginTop: 83 }}
						/>
						{/* Top header */}
						<header className='w3-container w3-xlarge'>
							<p className='w3-left'>Jeans</p>
							<p className='w3-right'>
								<i className='fa fa-shopping-cart w3-margin-right' />
								<i className='fa fa-search' />
							</p>
						</header>
						{/* Image header */}
						<div
							style={{
								width: '100%',
								maxWidth: '1000px',
								display: 'flex',
								justifyContent: 'center',
							}}
							className='w3-display-container w3-container'>
							<img
								src='https://www.w3schools.com/w3images/jeans.jpg'
								alt='Jeans'
								style={{ width: '100%' }}
							/>
							<div
								className='w3-display-topleft w3-text-white'
								style={{ padding: '24px 48px' }}>
								<h1 className='w3-jumbo w3-hide-small'>
									New arrivals
								</h1>
								<h1 className='w3-hide-large w3-hide-medium'>
									New arrivals
								</h1>
								<h1 className='w3-hide-small'>
									COLLECTION 2021
								</h1>
								<p>
									<a
										href='#jeans'
										className='w3-button w3-black w3-padding-large w3-large'>
										SHOP NOW
									</a>
								</p>
							</div>
						</div>
						<div
							className='w3-container w3-text-grey'
							id='jeans'></div>
						{/* Product grid */}
						<div className='w3-row w3-grayscale'>
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
												<div
													style={{
														margin: '25px',
													}}
													class='card'>
													<img
														style={{
															width: '250px',
														}}
														src={item.image}
														alt='iqjdw'
													/>
													<h1>{item.name}</h1>
													<p class='price'>
														{item.price}
													</p>
													<p>
														{item.quantityAvailable}
													</p>
												</div>
											</div>
										);
									})}
								</div>
							)}
							{/* <div className='w3-col l3 s6'>
								<div className='w3-container'>
									<img
										src='https://www.w3schools.com/w3images/jeans1.jpg'
										style={{ width: '100%' }}
									/>
									<p>
										Ripped Skinny Jeans
										<br />
										<b>$24.99</b>
									</p>
								</div>
								<div className='w3-container'>
									<img
										src='https://www.w3schools.com/w3images/jeans2.jpg'
										style={{ width: '100%' }}
									/>
									<p>
										Mega Ripped Jeans
										<br />
										<b>$19.99</b>
									</p>
								</div>
							</div>
							<div className='w3-col l3 s6'>
								<div className='w3-container'>
									<div className='w3-display-container'>
										<img
											src='https://www.w3schools.com/w3images/jeans2.jpg'
											style={{ width: '100%' }}
										/>
										<span className='w3-tag w3-display-topleft'>
											New
										</span>
										<div className='w3-display-middle w3-display-hover'>
											<button className='w3-button w3-black'>
												Buy now{' '}
												<i className='fa fa-shopping-cart' />
											</button>
										</div>
									</div>
									<p>
										Mega Ripped Jeans
										<br />
										<b>$19.99</b>
									</p>
								</div>
								<div className='w3-container'>
									<img
										src='https://www.w3schools.com/w3images/jeans3.jpg'
										style={{ width: '100%' }}
									/>
									<p>
										Washed Skinny Jeans
										<br />
										<b>$20.50</b>
									</p>
								</div>
							</div>
							<div className='w3-col l3 s6'>
								<div className='w3-container'>
									<img
										src='https://www.w3schools.com/w3images/jeans3.jpg'
										style={{ width: '100%' }}
									/>
									<p>
										Washed Skinny Jeans
										<br />
										<b>$20.50</b>
									</p>
								</div>
								<div className='w3-container'>
									<div className='w3-display-container'>
										<img
											src='https://www.w3schools.com/w3images/jeans4.jpg'
											style={{ width: '100%' }}
										/>
										<span className='w3-tag w3-display-topleft'>
											Sale
										</span>
										<div className='w3-display-middle w3-display-hover'>
											<button className='w3-button w3-black'>
												Buy now{' '}
												<i className='fa fa-shopping-cart' />
											</button>
										</div>
									</div>
									<p>
										Vintage Skinny Jeans
										<br />
										<b className='w3-text-red'>$14.99</b>
									</p>
								</div>
							</div>
							<div className='w3-col l3 s6'>
								<div className='w3-container'>
									<img
										src='https://www.w3schools.com/w3images/jeans4.jpg'
										style={{ width: '100%' }}
									/>
									<p>
										Vintage Skinny Jeans
										<br />
										<b>$14.99</b>
									</p>
								</div>
								<div className='w3-container'>
									<img
										src='https://www.w3schools.com/w3images/jeans1.jpg'
										style={{ width: '100%' }}
									/>
									<p>
										Ripped Skinny Jeans
										<br />
										<b>$24.99</b>
									</p>
								</div>
							</div> */}
						</div>
						{/* Subscribe section */}
						<div className='w3-container w3-black w3-padding-32'>
							<h1>Subscribe</h1>
							<p>To get special offers and VIP treatment:</p>
							<p>
								<input
									className='w3-input w3-border'
									type='text'
									placeholder='Enter e-mail'
									style={{ width: '100%' }}
								/>
							</p>
							<button
								type='button'
								className='w3-button w3-red w3-margin-bottom'>
								Subscribe
							</button>
						</div>
						{/* Footer */}
						<footer
							className='w3-padding-64 w3-light-grey w3-small w3-center'
							id='footer'>
							<div className='w3-row-padding'>
								<div className='w3-col s4'>
									<h4>Contact</h4>
									<p>Questions? Go ahead.</p>
									<form
										action='/action_page.php'
										target='_blank'>
										<p>
											<input
												className='w3-input w3-border'
												type='text'
												placeholder='Name'
												name='Name'
												required
											/>
										</p>
										<p>
											<input
												className='w3-input w3-border'
												type='text'
												placeholder='Email'
												name='Email'
												required
											/>
										</p>
										<p>
											<input
												className='w3-input w3-border'
												type='text'
												placeholder='Subject'
												name='Subject'
												required
											/>
										</p>
										<p>
											<input
												className='w3-input w3-border'
												type='text'
												placeholder='Message'
												name='Message'
												required
											/>
										</p>
										<button
											type='submit'
											className='w3-button w3-block w3-black'>
											Send
										</button>
									</form>
								</div>
								<div className='w3-col s4'>
									<h4>About</h4>
									<p>
										<a href='#'>About us</a>
									</p>
									<p>
										<a href='#'>We're hiring</a>
									</p>
									<p>
										<a href='#'>Support</a>
									</p>
									<p>
										<a href='#'>Find store</a>
									</p>
									<p>
										<a href='#'>Shipment</a>
									</p>
									<p>
										<a href='#'>Payment</a>
									</p>
									<p>
										<a href='#'>Gift card</a>
									</p>
									<p>
										<a href='#'>Return</a>
									</p>
									<p>
										<a href='#'>Help</a>
									</p>
								</div>
								<div className='w3-col s4 w3-justify'>
									<h4>Store</h4>
									<p>
										<i className='fa fa-fw fa-map-marker' />{' '}
										Company Name
									</p>
									<p>
										<i className='fa fa-fw fa-phone' />{' '}
										0044123123
									</p>
									<p>
										<i className='fa fa-fw fa-envelope' />{' '}
										ex@mail.com
									</p>
									<h4>We accept</h4>
									<p>
										<i className='fa fa-fw fa-cc-amex' />{' '}
										Amex
									</p>
									<p>
										<i className='fa fa-fw fa-credit-card' />{' '}
										Credit Card
									</p>
									<br />
									<i className='fa fa-facebook-official w3-hover-opacity w3-large' />
									<i className='fa fa-instagram w3-hover-opacity w3-large' />
									<i className='fa fa-snapchat w3-hover-opacity w3-large' />
									<i className='fa fa-pinterest-p w3-hover-opacity w3-large' />
									<i className='fa fa-twitter w3-hover-opacity w3-large' />
									<i className='fa fa-linkedin w3-hover-opacity w3-large' />
								</div>
							</div>
						</footer>

						{/* End page content */}
					</div>
				</div>

				{this.state.items && (
					<div>
						{this.state.items.map((item) => {
							console.log(item);
							if (item.image === '') {
								item.image =
									'https://semantic-ui.com/images/wireframe/image.png';
							}
							return (
								// <div key={item._id}>
								// 	<h1> Name: {item.name}</h1>
								// 	<h1>Price : {item.price}</h1>
								// 	<h1>Category : {item.category}</h1>
								// 	<h1>Quantity : {item.quantityAvailable}</h1>
								// 	<img src={item.image} alt='item' />
								// 	{/* TODO: remove ITEM */}
								// </div>
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
		);
	}
}

export default ViewStore;
