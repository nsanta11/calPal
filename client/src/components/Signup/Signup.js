import React, { Component } from 'react'
import axios from 'axios'
import "./Signup.css"
import "../Login"
import { Redirect } from 'react-router-dom'
import { Button, Icon } from 'semantic-ui-react'

class SignupForm extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
            redirectTo: null,
            message: '',
            invalid: false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleSubmit(event) {
        event.preventDefault()
        // TODO - validate!
        axios
            .post('/auth/signup', {
                username: this.state.username,
        password: this.state.password,
        schedules: []
            })
            .then(response => {
                console.log(response)
                if (!response.data.msg) {
                    console.log('you are good')
                    this.setState({
                        redirectTo: '/login'
                    })
                } else {
                    console.log('duplicate')
                    this.setState({ message: 'username already exists'})
                }
            })
    }


    render() {
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        }
        return (
            <div className="SignupForm">
                <h1 className="calPal">calPal</h1>
                <h2>Signup form</h2>
                <div>
                    <label htmlFor="username">Username: </label>
                    <input
                        type="text"
                        name="username"
                        value={this.state.username}
                        onChange={this.handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                </div>
                <div>
                    <label id="confirmPW" htmlFor="confirmPassword">Confirm Password: </label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={this.state.confirmPassword}
                        onChange={this.handleChange}
                    />
                </div>
                <div>
                    {this.state.message}
                </div>
                <Button animated type="submit" className="signupButton" onClick={this.handleSubmit}>
                    <Button.Content visible>Sign Up</Button.Content>
                    <Button.Content hidden>
                        <Icon name='right arrow' />
                    </Button.Content>
                </Button>

                {/* <button onClick={this.handleSubmit}>Sign up</button> */}
            </div>
        )
    }
}

export default SignupForm