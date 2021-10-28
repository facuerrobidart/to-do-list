import React, {useState,useEffect} from 'react'

function NotesItem(props){
    let [checkHook,setCheck] = useState(props.checked);
    
    let updateBox=()=>{
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
                    console.log(data);
                })
    }
    let change = (event)=>{
        setCheck(!checkHook);
    }
    useEffect(()=>{
        console.log(checkHook);
        updateBox();
    },[checkHook])
    return(
        <div>
            <input type="checkbox" checked={checkHook} key={props.id + props.checked} onChange={change} name="box"/>
            <label for="box">{props.description}</label>
            <button className='item'>edit</button>
            <button className='item'>delete</button>
        </div>
    );
}


export default NotesItem;