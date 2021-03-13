// import './App.css';
// import './styles/app.css';

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateStore from './Pages/CreateStore';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import Register from './Pages/Register';
import ShowInventory from './Pages/ShowInventory';
import Axios from './utils/axiosInstance';

export class App extends Component {
	state = { authenticated: null, email: '', role: '', store: '' };

	getUserData = async () => {
		try {
			let resp = await Axios.get('/user');
			console.log(resp.data);
		} catch (err) {
			console.log(err.response);
		}
	};

	loginSuccessHandler = async (email, role, store, callback) => {
		this.setState({ email: email, role: role, store, authenticated: true });
		await this.getUserData();
		callback();
	};

	render() {
		return (
			<div>
				<Router>
					<Switch>
						<Route
							path='/login'
							component={(props) => (
								<Login
									{...props}
									loginSuccessHandler={
										this.loginSuccessHandler
									}
								/>
							)}
						/>
						<Route
							path='/register'
							component={(props) => (
								<Register
									{...props}
									loginSuccessHandler={
										this.loginSuccessHandler
									}
								/>
							)}
						/>
						<Route
							path='/createstore'
							component={(props) => (
								<CreateStore
									{...props}
									store={this.state.store}
								/>
							)}
						/>
						<Route
							path='/inventory'
							component={(props) => (
								<ShowInventory
									{...props}
									store={this.state.store}
								/>
							)}
						/>
						<Route path='/dashboard' component={Dashboard} />
					</Switch>
				</Router>
			</div>
		);
	}
}

export default App;
