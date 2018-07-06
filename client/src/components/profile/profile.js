import React from "react";
import "./profile.css";
import { Button, Icon } from 'semantic-ui-react'

const profile = props =>

    <div>
        <div className="profile">
            <div className="calPal">calPal</div>
            <form action="/profile" method="post">
                <a href="/logout" class="btn btn-default btn-sm">Logout</a>
            </form>
            <div><h1><span class="fa fa-anchor"></span> Profile Page</h1></div>
            <div>
                <strong>id</strong>: {user.id}<br></br>
                <strong>email</strong>: {user.local.email}<br></br>
                <strong>password</strong>:{user.local.password}<br></br>


            </div>
            {props.children}
        </div>
    </div>

export default profile;






