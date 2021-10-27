import React from 'react'
import './login.css'

function Login(){
    return(
        <div className="container">
        <div className="wrapper">
            <form>
                <input type="text" id="login" name="login" placeholder="login"/>
                <br></br>
                <input type="text" id="password" name="login" placeholder="password"/>
                <br></br>
                <input type="submit" value="Log In"/>
            </form>
        </div>
        </div>
    );
}

export default Login;