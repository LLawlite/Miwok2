import React from "react";
import ReactDOM  from "react-dom";
import { createContext,useState } from "react";
import { v4 as uuidv4} from 'uuid'


const NotesContext = createContext(null);


export const NotesProvider = ({children}) => {
    
    // State for saving notes
    const [notes, setNotes] = useState([])
    
    // State to check if we are in edit mode
    const [notesEdit, setNotesEdit] = useState({
        item: {},
        edit: false,
    })

    // Adding Notes Function
    const addNotes = (newNotes, name) => {
        const userNotes =  localStorage.getItem(name)===null ? []: JSON.parse(localStorage.getItem(name))
        newNotes.id = uuidv4()
        setNotes([newNotes, ...userNotes])
        localStorage.setItem(name, JSON.stringify([newNotes, ...userNotes]))
      }

    // Delete Notes Function
    const deleteNotes = (id, name) =>{
        if(window.confirm('Are you sure you want to delete?')){
            const userNotes =  localStorage.getItem(name)===null ? []: JSON.parse(localStorage.getItem(name))
            setNotes(userNotes.filter((item) => item.id!== id))
            const newNotes = userNotes.filter((item) => item.id!== id)
            localStorage.removeItem(name)
            localStorage.setItem(name, JSON.stringify([...newNotes]))
        }
    }

    // Update Notes Function
    const updateNotes = (id, updItm, name) => {
        const userNotes =  localStorage.getItem(name)===null ? []: JSON.parse(localStorage.getItem(name))
        setNotes(userNotes.map((item) =>  item.id === id ? {...item, ...updItm} : item))
        const updatedNotes = userNotes.map((item) =>  item.id === id ? {...item, ...updItm} : item)
        localStorage.removeItem(name)
        localStorage.setItem(name, JSON.stringify([...updatedNotes]))
    }

    // notesEdit state becomes true when clicked on edit button in UI card
    const editNotes = (item) => {
        setNotesEdit({
            item,
            edit: true,
        })
    }


    return <NotesContext.Provider value={{
        notes,
        notesEdit,
        deleteNotes,
        addNotes,
        editNotes,
        updateNotes,
    }}>
        {children}
    </NotesContext.Provider>

}


export default NotesContext;