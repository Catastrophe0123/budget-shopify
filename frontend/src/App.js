// import './App.css';
// import './styles/app.css';

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateStore from './Pages/CreateStore';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import Register from './Pages/Register';
import ShowInventory from './Pages/ShowInventory';
import ViewStore from './Pages/ViewStore';
import Axios from './utils/axiosInstance';
import Header from './Components/Header';
import Home from './Pages/Home';

export class App extends Component {
	state = { authenticated: false, email: '', role: '', store: '' };

	getUserData = async () => {
		try {
			let resp = await Axios.get('/user');
			console.log(resp.data);
			this.setState({
				authenticated: true,
				email: resp.data.email,
				role: resp.data.role,
			});
		} catch (err) {
			this.setState({ authenticated: false });
			console.log(err.response);
		}
	};

	loginSuccessHandler = async (email, role, store, callback) => {
		this.setState({ email: email, role: role, store, authenticated: true });
		await this.getUserData();
		callback(this.state.store);
	};

	logoutHandler = async (callback) => {
		console.log('ehhel');
		this.setState({ authenticated: false, email: '', role: '', store: '' });
		// this.props.history.push('/login');
		callback();
	};

	componentDidMount = async () => {
		await this.getUserData();
	};

	render() {
		return (
			<div>
				<Router>
					<Header
						store={this.state.store}
						authenticated={this.state.authenticated}
						logoutHandler={this.logoutHandler}
					/>

					<Switch>
						<Route
							path='/login'
							component={(props) => (
								<Login
									{...props}
									store={this.state.store}
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
									authenticated={this.state.authenticated}
									store={this.state.store}
								/>
							)}
						/>

						<Route
							path='/admin/:storeid/inventory'
							component={(props) => (
								<ShowInventory
									{...props}
									authenticated={this.state.authenticated}
									store={this.state.store}
								/>
							)}
						/>
						<Route
							path='/admin/:storeid/dashboard'
							component={(props) => (
								<Dashboard
									{...props}
									authenticated={this.state.authenticated}
									store={this.state.store}
								/>
							)}
						/>
						<Route
							path='/admin/:storeid/'
							component={(props) => (
								<ViewStore
									authenticated={this.state.authenticated}
									{...props}
									store={this.state.store}
								/>
							)}
						/>

						<Route
							path='/'
							component={(props) => (
								<Home
									{...props}
									store={this.state.store}
									loginSuccessHandler={
										this.loginSuccessHandler
									}
								/>
							)}
						/>
					</Switch>
				</Router>
			</div>
		);
	}
}

export default App;
