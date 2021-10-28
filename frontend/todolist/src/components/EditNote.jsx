import React from 'react'
import { useState } from 'react';
import NotesItem from './NotesItem';

function EditNote({setDesc,id,description,folderId,checked}){
    const [closeHook,setClose] = useState(false);
    const [editHook,setEdit] = useState("");

    let close = ()=>{
        setClose(true);
    }
    let putNote = (event)=>{
        event.preventDefault();
        const options = {
            method: 'PUT',
            body: JSON.stringify({description: editHook, id:id}),
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        };
        let url = 'http://localhost:3005/notes/folders/'+(id);
        fetch(url, options)
            .then((response)=>response.json())
            .then((data) => {
                console.log(data);
                close();
                setDesc(editHook);
                console.log(editHook);
            })
    }
    if (closeHook===false){
        return(
            <div>
                <p>Editing note "{description}"</p>
                <input  onChange={event => setEdit(event.target.value)} type="text"/>
                <button onClick={putNote}>Confirm</button>
                <button onClick={close}>Cancel</button>
            </div>
        );
    }else{
        return(
            <NotesItem description={editHook} id={id} checked={checked} folderId={folderId}></NotesItem>
        );
    }
}


export default EditNote;