import React,{useState,useEffect} from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import AddFolder from './AddFolder';
import './folders.css'
function Folders(){
    const [foldersHook,setFolders] = useState([]);
    const [addHook,setAdd] = useState(false);
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

    if (addHook===false){
        return(
            <div className='container'>
            <div className='wrapper'>
                <h1>My folders</h1>
                <ul>
                    {foldersHook.map((e,i)=><li className='folderItem' key={e.id}>{e.name}<button className='item bn6'>open</button><button className='item bn6'>edit</button><button className='item bn6'>delete</button></li>)} 
                </ul>

                <button className='add' onClick={clickAdd}>Add folder</button>
            </div>
            </div>
        );
    }else{
        return(
            <BrowserRouter>
                <Route to="/foldersAdd" component={AddFolder}></Route>
                <Redirect to='/folders/add'/>
            </BrowserRouter>
        )
    }
}

export default Folders;