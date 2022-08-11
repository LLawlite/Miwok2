import React, { useEffect, useContext } from 'react';
import '../contentScript/contentScript.css';
import SuggestionMsgItem from './SuggestionMsgItem';
import SuggestionMessageContext from '../context/SuggestionMessageContext';
import SuggestionMsgData from '../data/SuggestionMsgData';

function SuggestionMsgListInPopup() {
  const { messages, setMessages } = useContext(SuggestionMessageContext);
  // const suggMsgs =  localStorage.getItem("Sugg_messages")===null ? SuggestionMsgData: JSON.parse(localStorage.getItem("Sugg_messages"))

  return (
    <div>
      {messages.map((item) => (
        <div>
          <SuggestionMsgItem item={item} />
        </div>
      ))}
    </div>
  );
}

export default SuggestionMsgListInPopup;
