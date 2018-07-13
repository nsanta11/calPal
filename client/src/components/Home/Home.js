import React, { Component } from "react"
import { Redirect } from 'react-router-dom'
import "./Home.css"
// import { Button, Icon } from 'semantic-ui-react'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            redirectTo: null,
            redirect: false
        }
        // this.googleSignin = this.googleSignin.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        console.log('handleSubmit')
        this.props._login(this.state.username, this.state.password)
        this.setState({
            redirectTo: '/'
        })
    }

    handleClick(event) {
        event.preventDefault()
        console.log('handleSubmit')
        this.setState({
            redirectTo: '/Signup'
        })
    }



    // setRedirect = () => {
    //     this.setState({
    //         redirect: true
    //     })
    // }
    // renderRedirect = () => {
    //     if (this.state.redirect) {
    //         return <Redirect to='/'/>
    //             }
    //           }
            
            
    render() {
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
                } else {
            return (
                <div>
                    <div className="home">
                        {/* <h1 className="calPal">calPal</h1> */}
                        <form className="form">
                            <div className="wrapper">
                                {/* <form action="/login" method="post"> */}
                                <div>
                                    <div className="signupwrapper">
                                        <div id="calPalHome" className="calPal">calPal</div>
                                        <p className="intro">Get organized with calPal! The only app that lets you prioritize your personal schedule and add local events. Our open source model lets you share your events with the public so you can get the poeple you want at your event.</p>

                                        {/* <button class="fluid ui button">Sign Up Now {<Redirect to="/signup" />}</button> */}

                                        <div>
                                            <button className="fluid ui button" onClick={this.handleClick}>Sign Up Now</button>
                                        </div>
                                    </div>
                                    {/* <Button animated type="submit" className="signupButton" onClick={this.handleSubmit}>
                                    <Button.Content visible>Sign Up</Button.Content>
                                    <Button.Content hidden>
                                        <Icon name='right arrow' />
                                    </Button.Content>
                                </Button> */}
                                </div>
                                {/* <div>
                    <input type="submit" value="Log In" />
                </div> */}
                            </div>
                        </form>
                    </div>
                    {/* {props.children} */}
                </div>

                )
            }
    
        }
    }
    
    
export default Home;