import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
//components
import CalendarWrapper from "./components/CalendarWrapper";
import LoginForm from "./components/Login";
import Logout from "./components/Logout";
import Navbar from "./components/navbar";
import Signup from "./components/Signup"
import Form from "./components/Form";
import Home from "./components/Home";
import UpdateForm from "./components/UpdateForm";

import './App.css';

const DisplayLinks = props => {
	if (props.loggedIn) {
		return (
			<nav className="navbar">
				<div className="calPalLogo">
					<Link to="/calendar" className="nav-link">
						calPal
					</Link>
				</div>
				<ul className="nav">
					<li>
						<Link to="/logout" className="nav-link1" onClick={props._logout}>
							Logout
						</Link>
					</li>
				</ul>
			</nav>
		)
	} else {
		return (
			<nav className="navbar">
				<div className="calPalLogo">
					<Link to="/" className="nav-link">
						calPal
					</Link>
				</div>
				<ul className="nav">
					<li className="nav-item">
						<Link to="/login" className="nav-link1">
							login
						</Link>
					</li>
					<li className="nav-item">
						<Link to="/signup" className="nav-link1">
							sign up
						</Link>
					</li>
				</ul>
			</nav>
		)
	}
}

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			username: '',
			password: '',
			loggedIn: false,
			user: null,
			redirectTo: null
		}
		this._logout = this._logout.bind(this)
		this._login = this._login.bind(this)
	}

	_logout(props) {
		// event.preventDefault()
		console.log('handleClick')
		console.log('logging out')
		axios.post('/auth/logout').then(response => {
			console.log(response.data)
			if (response.status === 200) {
				this.setState({
					loggedIn: false,
					user: null,
				})
			}

		})
	}



	componentDidMount() {
		axios.get('/auth/user').then(response => {
			console.log(response.data)
			if (!!response.data.user) {
				console.log('THERE IS A USER')
				this.setState({
					loggedIn: true,
					user: response.data.user
				})
			} else {
				this.setState({
					loggedIn: false,
					user: null,
				})
			}
		})
	}


	_login(username, password) {
		axios
			.post('/auth/login', {
				username,
				password
			})
			.then(response => {
				console.log(response)
				if (response.status === 200) {
					// update the state
					this.setState({
						loggedIn: true,
						user: response.data.user,
						// redirectTo:'/calendar/'
					});

					localStorage.clear();
					localStorage.setItem("_id", response.data.user._id);
					localStorage.setItem("name", response.data.user.local.username);
					localStorage.setItem("schedules", response.data.user.local.schedules);
				}
			})
			.catch((error) => {
				console.log(error);
				console.log('incorrect username or password')
				this.setState({
					message: 'incorrect username or password',

				})
			})
	}




	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		}
		return (

			<div className="App">

				{/* <Navbar user={this.state.user} />
				{/* LINKS to our different 'pages' *
				<DisplayLinks _logout={this._logout} loggedIn={this.state.loggedIn} /> */}

				<Router>
					<div>
						<div>
							<Navbar user={this.state.user} />
							{/* LINKS to our different 'pages' */}
							<DisplayLinks _logout={this._logout} loggedIn={this.state.loggedIn} />
						</div>


						<Route path="/calendar" component={CalendarWrapper} />
						<Route exact path="/create"
							render={() =>
								<Form
								/>}
						/>
						<Route exact path="/update"
							render={() =>
								<UpdateForm user={this.state.user}
								/>}
						/>
						<Route exact path="/" render={() => <Home user={this.state.user} />} />
						<Route exact path="/signup" component={Signup} />
						<Route exact path="/login"
							render={() =>
								<LoginForm
									_login={this._login}
									loggedIn={this.state.loggedIn}
									user={this.state.user}
								/>}
						/>
						<Route exact path="/logout"
							render={() =>
								<Logout
									_login={this._login}
								/>}
						/>
					</div>
				</Router>
			</div >
		)

	}
}

export default App;
