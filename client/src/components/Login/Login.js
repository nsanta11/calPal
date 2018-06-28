import React from "react";

const login = props =>
    <div>
        <div className="login">
            <div className="name">calPal</div>
            <form style="text-align:center">
                <input type="text" name="firstname" />
                <br/>
                <input type="text" name="lastname" />
                <br/>
                <input type="submit" value="Submit"/>
            </form>
        </div>
        {props.children}
    </div>

export default Nav;

