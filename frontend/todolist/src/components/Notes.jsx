import React,{useState,useEffect} from 'react'
import Folders from './Folders'
import AddNotes from './AddNotes';
import NotesItem from './NotesItem';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
function Notes(props){
    
    const [notesHook,setNotes] = useState([]);
    const [folderName,setName] = useState('');
    const [folderId,setId] = useState(props.id);
    const [backHook,setBack] = useState(false);
    const [addHook,setAdd] = useState(false);
    let fetchNotes = ()=> {
        const options = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
            };
        let url = 'http://localhost:3005/notes/folders/'+(props.id)
        fetch(url,options)
            .then((response)=>response.json())
            .then((data)=>{
                setNotes(data.notes);
                setName(data.folderName);
            })
            .catch(e => (console.log(e)));
        
        return true;
    };

    useEffect(()=>{
        fetchNotes();
    },[]);

    
    useEffect(()=>{
        console.log(notesHook);
    },[notesHook]);

    let backClick = (event)=>{
        event.preventDefault();
        setBack(true);
        console.log(backHook);
    }

    let addClick = (event)=>{
        event.preventDefault();
        setAdd(true);
    }
    
    if (backHook===false){
        if (addHook===false){
            return(
                    <div>
                        <h1>Folders={'>'}{folderName}</h1>
                        <ul>
                            {notesHook.map((element,i)=>
                                <li className='folderItem' key={element.id}>
                                    <NotesItem id={element.id} folderId={props.id} description={element.description} checked={element.checked}></NotesItem>
                                </li>)} 
                        </ul>
                        <button className='add' onClick={addClick}>Add note</button>
                        <button className='add' onClick={backClick}>Go back</button>
                    </div>
            );
        }else{
            return(
                <BrowserRouter>
                    <Route path="/folders/notes/add" render={(props) => <AddNotes {...props} id={folderId} name={folderName}/>}/>
                    <Redirect to='/folders/notes/add'/>
                </BrowserRouter>
            );
        }
    }else{
        return(
            <BrowserRouter>
                <Redirect to='/folders'></Redirect>
                <Route to="/folders" component={Folders}/>
            </BrowserRouter>
        )
    }
}
export default Notes;