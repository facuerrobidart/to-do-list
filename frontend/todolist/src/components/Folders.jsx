import React,{useState,useEffect} from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import AddFolder from './AddFolder';
import Notes from './Notes';
import './folders.css'
function Folders(){
    const [foldersHook,setFolders] = useState([]);
    const [addHook,setAdd] = useState(false);
    const [openHook,setOpen] = useState(false);
    const [targetFolder,setTarget] = useState(0);

    let fetchFolders = ()=> {
        const options = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
            };
        fetch('http://localhost:3005/notes/folders',options)
            .then((response)=>response.json())
            .then((data)=>{
                console.log(data.folders);
                setFolders(data.folders);
            })
            .catch(e => (console.log(e)));
    };

    useEffect(()=>{
        fetchFolders();
    },[]);

    useEffect(()=>{
        //console.log(foldersHook);
    },[foldersHook]);

    let clickAdd = (event)=>{
        event.preventDefault();
        setAdd(true)
    }

    let clickOpen = (folder_id,event)=>{
        event.preventDefault();
        setOpen(true); setTarget(folder_id);
    }

    if (addHook===false){
        if (openHook===false){
            return(
                <div className='container'>
                <div className='wrapper'>
                    <h1>My folders</h1>
                    <ul>
                        {foldersHook.map((element,i)=><li className='folderItem' key={element.id}>{element.name}
                        <button onClick={(e)=> clickOpen(element.id,e)} className='item'>open</button>
                        <button className='item'>edit</button>
                        <button className='item'>delete</button></li>)} 
                    </ul>
                    <button className='add' onClick={clickAdd}>Add folder</button>
                </div>
                </div>
            );
        }else{
            return(
                <BrowserRouter>
                    <Route to="/folders/notes" render={(props) => <Notes {...props} id={targetFolder}/>}/>
                    <Redirect to='folders/notes'/>
                </BrowserRouter>
            )
        }
    }else{
        return(
            <BrowserRouter>
                <Route to="/folders/add" component={AddFolder}/>
                <Redirect to='/folders/add'></Redirect>
            </BrowserRouter>
        )
    }
}

export default Folders;