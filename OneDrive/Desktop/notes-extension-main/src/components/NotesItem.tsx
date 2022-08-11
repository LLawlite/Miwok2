import React from 'react'
import Card from './shared/Card'
import {FaTimes, FaEdit} from 'react-icons/fa'
import { useContext } from 'react'
import NotesContext from '../context/NotesContext'



function NotesItem({item,name}) {
    const {deleteNotes, editNotes} = useContext(NotesContext)
    
    return (
        <Card> 
            <button onClick = {() => deleteNotes(item.id,name)} className='close'>
                <FaTimes color='#E18B43'/>
            </button> 
            <button onClick = {() => editNotes(item)} className='edit'>
                <FaEdit color='#E18B43'/>
            </button> 
            <div dangerouslySetInnerHTML={{__html: item.text}}></div>
        </Card>
           
    )
}

export default NotesItem