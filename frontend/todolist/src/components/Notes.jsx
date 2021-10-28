import React,{useState,useEffect} from 'react'
import Folders from './Folders'
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
function Notes(props){
    
    const [notesHook,setNotes] = useState([]);
    const [folderName,setName] = useState('');
    const [backHook,setBack] = useState(false);

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
    
    if (backHook===false){
        return(
                <div>
                    <h1>Folders={'>'}{folderName}</h1>
                    <ul>
                        {notesHook.map((element,i)=>
                        <li className='folderItem' key={element.id}>
                        {element.description}
                            <button className='item'>edit</button>
                            <button className='item'>delete</button>
                        </li>)} 
                    </ul>
                    <button className='add'>Add note</button>
                    <button className='add' onClick={backClick}>Go back</button>
                </div>
        );
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