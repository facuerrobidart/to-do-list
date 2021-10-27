import React,{useState,useEffect} from 'react'

function Folders(){
    const [foldersHook,setFolders] = useState([]);
    const [ready, setReady] = useState(false);
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
                /*while (ready===false){
                    if(foldersHook.length>0){
                        setReady(true);
                    }
                }
                console.log(foldersHook);*/
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
        <div>
            <h1>My folders</h1>
            <ul>
                {foldersHook.map((e,i)=><li key={i}>{e.name}</li>)}
            </ul>
        </div>
    );
}

export default Folders;