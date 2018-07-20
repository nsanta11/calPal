import React, { Component } from "react"
// import axios from 'axios'
import { Redirect } from 'react-router-dom'
import "./Login.css"
import { Button, Icon } from 'semantic-ui-react'
// import {App} from "../../App.js"



class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            redirectTo: null,
        }
        // this.googleSignin = this.googleSignin.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    componentWillReceiveProps(newProps){
       console.log(newProps)
       if (newProps.loggedIn===true) {
        this.setState({
            redirectTo: `/calendar/`
        })
       }

       else {
        console.log('incorrect username or password')
        this.setState({ 
            message: 'incorrect username or password',
        })
    }
    }

    handleSubmit(event) {
        event.preventDefault()

        console.log('handleSubmit')
        this.props._login(this.state.username, this.state.password)
    }


    render() {
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
                <div>
                    <div className="login">
                        <h1 className="calPal">calPal</h1>
                        <h2>Login</h2>
                        <form className="form">
                            {/* <form action="/login" method="post"> */}
                            <div>
                                <label htmlFor="username">Username: </label>
                                <input type="text" id="username" name="username" placeholder="Username" value={this.state.username} onChange={this.handleChange} />
                            </div>
                            <div>
                                <label htmlFor="password">Password:  </label>
                                <input type="password" id="password" name="password" placeholder="password" value={this.state.password} onChange={this.handleChange} />
                            </div>
                            <div className="message">
                                {this.state.message}
                            </div>
                            <Button animated type="submit" className="loginButton" onClick={this.handleSubmit}>
                                <Button.Content visible>Log In</Button.Content>
                                <Button.Content hidden>
                                    <Icon name='right arrow' />
                                </Button.Content>
                            </Button>
                            {/* <div>
                    <input type="submit" value="Log In" />
                </div> */}
                        </form>
                    </div>
                    {/* {props.children} */}
                </div>

            )
        }

    }
}


export default LoginForm;


