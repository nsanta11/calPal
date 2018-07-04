import React from "react";
import "./Login.css";
import { Button, Icon } from 'semantic-ui-react'

const Login = props =>
    <div>
        <div className="login">
            <div className="calPal">calPal</div>
            <form action="/login" method="post">
                <div>
                    <label>Username: </label>
                    <input type="text" name="username" />
                </div>
                <div>
                    <label>Password:  </label>
                    <input type="password" name="password" />
                </div>
                <Button animated type="submit" className="loginButton">
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
        {props.children}
    </div>

export default Login;


