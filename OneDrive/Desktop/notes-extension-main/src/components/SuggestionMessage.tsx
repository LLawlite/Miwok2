import React, { useContext, useEffect, useState } from 'react';
import $ from 'jquery';
import '../contentScript/contentScript.css';
import SuggestionPopup from './SuggestionPopup';
import SuggestionMessageContext from '../context/SuggestionMessageContext';

function SuggestionMessage() {
  const { messages, setMessages, edit, setEdit, sendMessage } = useContext(
    SuggestionMessageContext
  );

  // Fetching footer of WA and ading some css
  var footer = $('footer._2cYbV');

  if (!footer) return;

  footer.css('padding', '33px 0 0 0');

  // Creating a div for holding the messages and edit button
  var mb_reply_div = document.getElementById('mb_reply_div');
  if (mb_reply_div) {
    mb_reply_div.parentNode.removeChild(mb_reply_div);
  }

  setTimeout(async function () {
    var reply_div = document.getElementById('reply_div');
    var smart_reply_edit = document.getElementById('smart_reply_edit_button');
    if (reply_div) {
      reply_div.style.display = 'none';
      smart_reply_edit.style.display = 'none';
    }
  }, 2000);

  mb_reply_div = document.createElement('div');
  mb_reply_div.id = 'mb_reply_div';

  // Appending the mb_reply_div to footer
  footer.append(mb_reply_div);

  // Displaying the suggested messages

  if (messages.length > 0) {
    $.each(messages, function (i, p) {
      var ps = p.message;
      if (p.message.length > 47) ps = p.message.substring(0, 47) + '...';

      $('#mb_reply_div').append(
        '<button class="reply_click" value="' +
          p.message +
          '">' +
          ps +
          '</button>'
      );
    });
  } else {
    $('#mb_reply_div').append(
      "<div style='color: var(--message-primary);padding: 4px 8px;font-size: 12px;'>Please click on 'Edit' to add or edit quick replies</div>"
    );
  }

  // useEffect(() => {
  //   if (reply_div.childElementCount === 0) {
  //     var para = document.createElement('div');
  //     para.innerHTML = 'Jello hese';
  //     reply_div.appendChild(para);
  //   }
  // }, [reply_div.childElementCount]);

  //Edit Button
  var editButton = document.getElementById('mb_smart_reply_edit_button');
  if (editButton) {
    // console.log("Edit",editButton);
    footer.append(editButton);
  } else {
    footer.append('<button id="mb_smart_reply_edit_button">Edit</button>');
  }

  // Edit Button event
  if (document.getElementById('mb_smart_reply_edit_button') != null) {
    document
      .getElementById('mb_smart_reply_edit_button')
      .addEventListener('click', function (event) {
        setEdit(true);
      });
  }

  // Message which are displayed above the chat when clicked will send the clicked message
  if (document.getElementById('mb_reply_div') != null) {
    document
      .getElementById('mb_reply_div')
      .addEventListener('click', function (event) {
        var message = (event.target as HTMLInputElement).value;
        sendMessage(message);
      });
  }

  return <>{edit && <SuggestionPopup />}</>;
}

export default SuggestionMessage;
