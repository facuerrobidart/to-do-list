import React,{useState,useEffect} from 'react'
import './folders.css'
function Folders(){
    const [foldersHook,setFolders] = useState([]);
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

    return(
        <div className='container'>
        <div className='wrapper'>
            <h1>My folders</h1>
            <ul>
                {foldersHook.map((e,i)=><li className='folderItem' key={e.id}>{e.name}<button className='item bn6'>open</button><button className='item bn6'>edit</button><button className='item bn6'>delete</button></li>)} 
            </ul>

            <button className='add'>Add folder</button>
        </div>
        </div>
    );
}

export default Folders;