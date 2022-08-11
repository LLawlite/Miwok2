import React, { useState } from 'react';
import $ from 'jquery';
import '../styles/ChatActionMenu.css';
import ChatActionRemainderForm from './ChatActionRemainderForm';
import ChatActionScheduleMeet from './ChatActionScheduleMeet';

function ChatActionMenu(props) {
  const name = props.name;

  var parent = $('._2gzeB');
  var chatActionMenu = document.createElement('div'); //This is container for chat-action-menu
  chatActionMenu.id = 'chat-action-menu-ui';

  // var chatActionMenuItem1 = document.createElement('img');
  // chatActionMenuItem1.src = 'https://img.icons8.com/color/344/whatsapp--v1.png';
  // // chatActionMenuItem1.onclick = function () {
  // //   console.log(remainderDialogueOpen);
  // //   console.log('Chat');
  // //   setRemainderDialogueOpen(true);
  // // };
  // chatActionMenuItem1.id = 'chat-action-menu-ui-item-1';

  // var chatActionMenuItem2 = document.createElement('img');
  // chatActionMenuItem2.src = 'https://img.icons8.com/color/344/whatsapp--v1.png';
  // chatActionMenuItem2.id = 'chat-action-menu-ui-item-2';

  // var chatActionMenuItem3 = document.createElement('img');
  // chatActionMenuItem3.id = 'chat-action-menu-ui-item-3';
  // chatActionMenuItem3.src = 'https://img.icons8.com/color/344/whatsapp--v1.png';

  // var chatActionMenuItem4 = document.createElement('img');
  // chatActionMenuItem4.id = 'chat-action-menu-ui-item-4';
  // chatActionMenuItem4.src =
  //   'https://img.icons8.com/color/344/whatsapp--v1.pngg';

  // // chatActionMenu.append(chatActionMenuItem1);
  // chatActionMenu.append(chatActionMenuItem2);
  // chatActionMenu.append(chatActionMenuItem3);
  // chatActionMenu.append(chatActionMenuItem4);

  parent.append(chatActionMenu);

  return (
    <>
      <div className="notify">
        <span id="notifyType" className=""></span>
      </div>
      <ChatActionRemainderForm name={name} />
      <ChatActionScheduleMeet />
    </>
  );
}

export default ChatActionMenu;
