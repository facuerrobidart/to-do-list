import React,{useState} from 'react'
import {Redirect} from 'react-router-dom'
import './login.css'


function Login(){

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [logged,setLogged] = useState(false);


    let logueo = (event) =>{
        event.preventDefault();
        const options = {
            method: 'POST',
            body: JSON.stringify({username: username,password:password}),
            headers: {'Content-Type': 'application/json'},
        };
        fetch('http://localhost:3005/users/login', options)
            .then((response)=>response.json)
            .then((data) => {
                if (data.answer===true){
                    setLogged(true);
                    console.log("logueado");
                }
                
            })
            .catch(err=>{
                console.log(err);});
    }

    if (!logged){
    return(
        <div className="container">
        <div className="wrapper">
            <form>
                <input type="text" onChange={event => setUsername(event.target.value)} name="username" placeholder="login"/>
                <br></br>
                <input type="password" onChange={event => setPassword(event.target.value)} name="password" placeholder="password"/>
                <br></br>
                <button onClick={logueo} >Log In</button>
            </form>
        </div>
        </div>
    );
    }else{
        return <Redirect to='notes/folders'/>
    }
    
}

export default Login;