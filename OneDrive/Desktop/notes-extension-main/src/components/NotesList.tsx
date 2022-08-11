import React, { useEffect } from 'react'
import NotesItem from './NotesItem'
import { useContext } from 'react'
import NotesContext from '../context/NotesContext'



function NotesList({name}) {

    
    const {notes} = useContext(NotesContext);
    // Fetching the notes of user whose chat is currently open
    
    const userNotes =  localStorage.getItem(name)===null ? []: JSON.parse(localStorage.getItem(name))
    

    if(!userNotes || userNotes.length===0)
        return <p style={{textAlign: "center"}}>No Notes Yet!!</p>



    return (
        <div>
            {userNotes.map((item) =>(
                <NotesItem 
                key = {item.id} 
                item = {item} 
                name = {name}
                />
            ))}
        </div>
    )
}

export default NotesList