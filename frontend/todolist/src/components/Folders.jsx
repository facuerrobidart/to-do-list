import React,{useState,useEffect} from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import AddFolder from './AddFolder';
import Notes from './Notes';
import Login from './Login';
import './folders.css'

function Folders(){
    const [foldersHook,setFolders] = useState([]);
    const [addHook,setAdd] = useState(false);
    const [openHook,setOpen] = useState(false);
    const [targetFolder,setTarget] = useState(0);
    const [logOut, setLogOut] = useState(false);


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

    let exit = ()=>{
        const options = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
            };
        fetch('http://localhost:3005/users/logout',options)
            .then((response)=>response.json())
            .then((data)=>{
                setLogOut(data);
            })
            .catch(e => (console.log(e)));
    }

    if (addHook===false){
        if (openHook===false){
            if (logOut===false){
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
                        <button onClick={exit} className='add'>Log out</button>
                    </div>
                    </div>
                );
            }else{
                return(
                    <BrowserRouter>
                        <Route to="/" component={Login}/>
                        <Redirect to='/'/>
                    </BrowserRouter>
                );
            }
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