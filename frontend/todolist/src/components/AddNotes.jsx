import React,{useState} from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Notes from './Notes';

function AddNotes(props){

    const [returnToList,setReturn] = useState(false);
    const [hookId,setId] = useState(props.id);
    const [note,setNote] = useState('');

    let backClick=()=>{
        setReturn(true);
    }
    let postNote = ()=>{
        const options = {
            method: 'POST',
            body: JSON.stringify({description: note, folders_id: props.id}),
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        };
        let url = 'http://localhost:3005/notes/folders/'+(props.id);
        fetch(url, options)
            .then((response)=>response.json())
            .then((data) => {
                setReturn(data);
            })
    }


    if (returnToList===false){
        return(
            <div>
                <h1>Add note to folder {props.name}</h1>
                <form onSubmit={postNote}>
                    <label>Insert your note here:</label>
                    <input placeholder='your note' onChange={event => setNote(event.target.value)}></input>
                    <button type="submit">Add</button>
                </form>
                <button onClick={backClick}>Go back</button>
            </div>
        );
    }else{
        return(
            <BrowserRouter>
                <Route to="/folders/notes" render={(props) => <Notes {...props} id={hookId}/>}/>
                <Redirect to='folders/notes'/>
            </BrowserRouter>
        );
    }
}

export default AddNotes;