import React, { Component } from 'react'
import axios from 'axios'
// import { Redirect } from 'react-router-dom'
import "./navbar.css"
import { Button, Icon } from 'semantic-ui-react'

class Navbar extends Component {
    constructor() {
        super()
        this.logout = this.logout.bind(this)
    }

    logout(event) {
        event.preventDefault()
        console.log('logging out')
        axios.post('/user/logout').then(response => {
            console.log(response.data)
            if (response.status === 200) {
                this.props.updateUser({
                    loggedIn: false,
                    username: null
                })
            }
        }).catch(error => {
            console.log('Logout error')
        })
    }

    render() {
        const loggedIn = this.props.loggedIn;
        console.log('navbar render, props: ')
        console.log(this.props);

        return (
            <div>

                {loggedIn ? (
                    <section>
                        <Button animated type="submit" className="logoutbutton" onClick={this.logout}>
                            <Button.Content visible>Log Out</Button.Content>
                            <Button.Content hidden>
                                <Icon name='right arrow' />
                            </Button.Content>
                        </Button>

                    </section>
                ) : (
                        <section className="navbar-section">

                            <Button animated type="submit" className="loginButton" onClick={this.handleSubmit}>
                                <Button.Content visible>Sign Up</Button.Content>
                                <Button.Content hidden>
                                    <Icon name='right arrow' />
                                </Button.Content>
                            </Button>

                        </section>
                    )}

                <div>



                </div>
            </div>

        );

    }
}
export default Navbar;