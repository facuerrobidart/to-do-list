import React,{useState,useEffect} from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Notes from './Notes';

function AddNotes(props){
    return(
        <div>
            <form>
                <label>Insert your note here:</label>
                <input placeholder='your note'></input>
                <button type="submit">Add</button>
            </form>
        </div>
    );
}

export default AddNotes;