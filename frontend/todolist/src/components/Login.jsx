import React,{useState} from 'react'
import {BrowserRouter,Redirect,Route} from 'react-router-dom'
import './login.css'
import Folders from './Folders'
function Login(props){

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [logged,setLogged] = useState(false);


    let logueo = (event) =>{
        event.preventDefault();
        const options = {
            method: 'POST',
            body: JSON.stringify({username: username,password:password}),
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        };
        fetch('http://localhost:3005/users/login', options)
            .then((response)=>response.json())
            .then((data) => {
                console.log(data);
                if (data===true){
                    setLogged(true);
                    console.log("logueado");
                    console.log(logged);
                }
            })
            .catch(err=>{
                console.log(err);});
    }

    if (logged===false){
    return(
        <div className="container">
        <div className="wrapper">
            <form onSubmit={logueo}>
                <input type="text" onChange={event => setUsername(event.target.value)} name="username" placeholder="login"/>
                <br></br>
                <input type="password" onChange={event => setPassword(event.target.value)} name="password" placeholder="password"/>
                <br></br>
                <button type="submit">Log In</button>
            </form>
        </div>
        </div>
    );
    }else{
        return (<BrowserRouter>
                <Route to="/folders" component={Folders}/>
                <Redirect to='/folders'/>
                </BrowserRouter>);
    }
    
}

export default Login;