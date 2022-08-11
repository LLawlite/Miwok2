import React, { useContext } from 'react';
import '../contentScript/contentScript.css';
import Card from './shared/Card';
import SuggestionMessageContext from '../context/SuggestionMessageContext';
import { FaTimes, FaEdit } from 'react-icons/fa';
function SuggestionMsgItem({ item }) {
  const { messages, setMessages, deleteMsg } = useContext(
    SuggestionMessageContext
  );

  return (
    <div id="message-item">
      <div className="message-item-firstChild">
        <img src={chrome.runtime.getURL('Polygon.png')} alt="" />

        <div className="popup_list_message">{item.message}</div>
      </div>
      <button onClick={() => deleteMsg(item.id)} className="delete_message">
        <FaTimes color="#ABAEB1" />
      </button>
    </div>
  );
}

export default SuggestionMsgItem;

// function send_text(text) {
//     const dataTransfer = new DataTransfer();
//     dataTransfer.setData('text', text);
//     const event = new ClipboardEvent('paste', {
//           clipboardData: dataTransfer,
//           bubbles: true
//         });
//     let el = document.querySelector('#main .copyable-area [contenteditable="true"][role="textbox"]')
//     el.dispatchEvent(event)
//     }
//     send_text(your_text)
