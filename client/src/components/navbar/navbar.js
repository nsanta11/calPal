import React from 'react'
// TODO - add proptypes

const Navbar = props => {
	let Greeting
	if (props.user === null) {
		Greeting = <p className="greetings">Hello, guest</p>
	} else if (props.user.firstName) {
		Greeting = (
			<p className="greetings">
				Welcome back, <strong>{props.user.firstName}</strong>
			</p>
		)
	} else if (props.user.local.username) {
		Greeting = (
			<p className="greetings">
				Welcome back, <strong>{props.user.local.username} </strong>
			</p>
		)
	}
	return (
		<div className="Header">
			{Greeting}
		</div>
	)
}

export default Navbar;