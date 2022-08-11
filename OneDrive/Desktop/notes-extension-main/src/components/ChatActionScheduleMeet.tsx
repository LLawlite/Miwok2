import React, { useEffect, useState } from 'react';
import '../styles/ChatActionScheduleMeet.css';
import ScheduleEventModal from './ScheduleEventModal';

function ChatActionScheduleMeet(props) {
  const [modalOpen, setModalOpen] = useState(false);
  // const [chatActionMenuItemsBackgroundChange,setChatActionMenuItemsBackgroundChange] = useState(false);

  var chatActionMenu = document.querySelector('#chat-action-menu-ui');

  //Creating schedule meet div
  var scheduleMeet = document.createElement('div');
  scheduleMeet.id = 'schedule-meet';
  scheduleMeet.className = 'tooltip';

  // for popup text effect
  var toolTipText = document.createElement('span');
  toolTipText.className = 'tooltiptext';
  toolTipText.innerHTML = 'Schedule Meet';
  scheduleMeet.appendChild(toolTipText);

  var scheduleMeetImg = document.createElement('img');
  scheduleMeetImg.src = chrome.runtime.getURL('calendar.png');
  scheduleMeetImg.id = 'schedule-meet-img';

  scheduleMeet.appendChild(scheduleMeetImg);

  scheduleMeet.onclick = function () {
    setModalOpen(true);
    scheduleMeet.classList.add('chat-action-menu-background-white');
  };

  if (chatActionMenu !== null) {
    if (document.querySelector('#schedule-meet') === null) {
      chatActionMenu.appendChild(scheduleMeet);
    }
  }

  return <>{modalOpen && <ScheduleEventModal setOpenModal={setModalOpen} />}</>;
}

export default ChatActionScheduleMeet;
