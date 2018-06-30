import React from "react";

const login = props =>
    <div>
        <div className="login">
            <div className="name">calPal</div>
            <form action="/login" method="post">
                <div>
                    <label>Username:</label>
                    <input type="text" name="username" />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" />
                </div>
                <div>
                    <input type="submit" value="Log In" />
                </div>
            </form>
        </div>
        {props.children}
    </div>

export default Nav;

