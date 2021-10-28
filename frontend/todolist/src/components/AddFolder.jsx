import React from 'react'
import { useState } from 'react';
import { BrowserRouter,Route,Redirect } from 'react-router-dom';
import Folders from './Folders'

function AddFolder(){

    const [name,setName] = useState("");
    const [returnToList,setReturn] = useState(false);

    let crear = (event) =>{
        event.preventDefault();
        const options = {
            method: 'POST',
            body: JSON.stringify({name: name}),
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        };
        fetch('http://localhost:3005/notes/folders', options)
            .then((response)=>response.json())
            .then((data) => {
                setReturn(data);
            })
    }
    let back = (event) =>{
        event.preventDefault();
        setReturn(true);
    }
    if (returnToList===false){
        return(
            <div>
                <h1>Add a folder</h1>
                <form onSubmit={crear}>
                    <label for="name">Name:</label>
                    <input type="text" placeholder='put the folder name here' onChange={event => setName(event.target.value)}></input>
                    <button type="submit"> Add Folder</button>
                    <button onClick={back}>Go back</button>
                </form>
            </div>
        );
    }else{
        return(
            <BrowserRouter>
                <Route to="/folders" component={Folders}/>
                <Redirect to='/folders'/>
            </BrowserRouter>
        );
    }
}
export default AddFolder;