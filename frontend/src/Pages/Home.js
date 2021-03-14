import React, { Component } from 'react';
import '../styles/App.css';

export class Home extends Component {
	render() {
		return (
			<div id='imain'>
				<div id='icenter'>
					{/* <p>Bring your business online</p>
					<p>Create an ecommerce website backed by powerful tools that help you find customers, drive sales, and manage your day-to-day.</p> */}
					<img
						id='icpic'
						src='https://www.apexweb.co.uk/docs/headers/e-commerce-websites.jpg'></img>
					<div class='top-left'>
						<p id='ich1'>Bring your business online</p>
					</div>
					<div class='bottom-right'>
						<p id='ich2'>
							Create an ecommerce website backed by powerful tools
							that help you find<br></br> customers, drive sales,
							and manage your day-to-day.
						</p>
					</div>
				</div>
				<br></br>
				<br></br>
				<br></br>
				<div id='adv'>
					<h1>Anyone, anywhere can start an ecommerce website</h1>
					<br></br>
					<br></br>
					<br></br>
					<div class='sample'>
						<div class='lft'>
							<h2>Sell everywhere</h2>
							<p>
								Use one platform to sell products to anyone,
								anywhere—in person with Point of Sale and online
								through your website, social media, and online
								marketplaces.
							</p>
						</div>
						<div class='ryt'>
							<img
								width='700px'
								src='https://www.tompkinsinc.com/Portals/0/EasyDNNnews/1048/blog_10-29-19.jpg'
							/>
						</div>
					</div>
					<br></br>
					<br></br>
					<br></br>
					<br></br>
					<br></br>
					<br></br>
					<div class='sample'>
						<div class='ryt'>
							<h2>Market your business</h2>
							<p>
								Take the guesswork out of marketing with
								built-in tools that help you create, execute,
								and analyze digital marketing campaigns.
							</p>
						</div>
						<div class='lft'>
							<img
								width='700px'
								src='https://mk0buildfireqbf86ll2.kinstacdn.com/wp-content/uploads/2017/04/promote-your-business.jpg'
							/>
						</div>
					</div>
					<br></br>
					<br></br>
					<br></br>
					<br></br>
					<br></br>
					<br></br>
					<div class='sample'>
						<div class='lft'>
							<h2>Manage everything</h2>
							<p>
								Gain the insights you need to grow—use a single
								dashboard to manage orders, shipping, and
								payments anywhere you go.
							</p>
						</div>
						<div class='ryt'>
							<img
								width='700px'
								src='https://miro.medium.com/max/3840/1*bLeGflJgjzhZRhA628WliQ.png'
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Home;
