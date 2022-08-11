import React from 'react';
import { useState, useEffect, useContext } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { useQuill } from 'react-quilljs';
import Button from './shared/Button';
import NotesContext from '../context/NotesContext';
import SuggestionMessageContext from '../context/SuggestionMessageContext';
import { v4 as uuidv4 } from 'uuid';

function SuggTextEditor() {
  //Quill Editor
  const theme = 'snow';

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],

      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['link'],
    ],
  };

  const placeholder = 'Add your note...';

  const formats = [
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'header',
    'link',
  ];

  // Adding Quill Editor
  const { quill, quillRef } = useQuill({
    theme,
    modules,
    formats,
    placeholder,
  });

  // State for saving the html of data written in quill editor
  const [htmlText, setHtmlText] = useState([]);
  const [written, setWritten] = useState(false);

  function isQuillEmpty(quill) {
    if (JSON.stringify(quill.getContents()) == '{"ops":[{"insert":"\\n"}]}') {
      return true;
    } else {
      return false;
    }
  }
  useEffect(() => {
    // if(temp==='<p><br></p>')
    if (quill && (isQuillEmpty(quill) || htmlText === [])) {
      setWritten(false);
    } else {
      setWritten(true);
    }
    console.log(htmlText);
  }, [htmlText]);

  // These functions have been called from NotesContext file

  const { messages, setMessages, edit, setEdit, addMessage, sendMessage } =
    useContext(SuggestionMessageContext);

  // Whenever the text changes in quill editor this runs and sets the htmlText state
  useEffect(() => {
    if (quill) {
      quill.on('text-change', (delta, oldDelta, source) => {
        setHtmlText(quill.root.innerHTML);
      });
    }
  }, [quill]);
  useEffect(() => {
    setWritten(false);
  }, []);

  // Function runs on clicking Add Note Button!

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = {
      id: uuidv4(),
      message: htmlText,
    };

    addMessage(newMessage);

    quill.setContents([]);
  };

  const buttontext = 'Add';

  return (
    <>
      <div ref={quillRef}></div>
      <form onSubmit={handleSubmit}>
        {written && <Button type="submit">{buttontext}</Button>}
        {!written && <Button version="disabled">{buttontext}</Button>}
      </form>
    </>
  );
}

export default SuggTextEditor;
