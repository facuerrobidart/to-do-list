import React, {useState,useEffect} from 'react'
import EditNote from './EditNote'
function NotesItem(props){
    let [checkHook,setCheck] = useState(props.checked);
    let [editHook, setEdit] = useState(false);
    let [deleteHook, setDelete] = useState(false);
    let [descHook,setDesc] = useState(props.description);

    let updateBox = ()=>{
        const options = {
            method: 'PUT',
            body: JSON.stringify({
                                    id: props.id,
                                    checked: checkHook
                                }),
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        };
        let url = 'http://localhost:3005/notes/folders/status';
        fetch(url, options)
            .then((response)=>response.json())
            .then((data) => {
                
            });
    }
    let change = (event)=>{
        setCheck(!checkHook);
        updateBox();
    }


    let edit = (event)=>{
        setEdit(true);
    }

    let deleteNote = (event)=>{
        event.preventDefault();
        const options = {
            method: 'DELETE',
            body: JSON.stringify({
                                    id: props.id,
                                }),
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        };
        let url = 'http://localhost:3005/notes/folders/'+props.folderId;
        fetch(url, options)
            .then((response)=>response.json())
            .then((data) => {
                
                setDelete(true);
            })
    }

    useEffect(()=>{
        console.log(checkHook)
        updateBox();
    },[checkHook]);
    
    if(editHook===false){
        if (deleteHook===false){
            return(
                    <div>
                        <li className='folderItem' key={Number(props.description)+props.id}>
                            <input type="checkbox" checked={checkHook} key={props.id + props.checked} onChange={change} name="box"/>
                            <label htmlFor="box">{descHook}</label>
                            <button className='item' onClick={edit}>edit</button>
                            <button className='item' onClick={deleteNote}>delete</button>
                        </li>
                    </div>
            );
        }else{
            return(
                <div></div>
            )
        }
    }else{
        return(
            <EditNote setDesc={setDesc} description={descHook} id={props.id} checked={props.checked} folderId={props.folderId}></EditNote>
        );
    }
}


export default NotesItem;