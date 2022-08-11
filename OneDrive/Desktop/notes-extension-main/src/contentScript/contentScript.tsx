// TODO: content script
import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';

import $ from 'jquery';

import TextEditor from '../components/TextEditor';
import NotesList from '../components/NotesList';
import SuggestionMessage from '../components/SuggestionMessage';
import { NotesProvider } from '../context/NotesContext';

import { SuggestionMessageProvider } from '../context/SuggestionMessageContext';
import './contentScript.css';
import ChatActionMenu from '../components/ChatActionMenu';
import ScheduleEventModal from '../components/ScheduleEventModal';
import Sample from '../components/sample';

const App: React.FC<{}> = () => {
  // State will save notes is opened or no
  const [notesOpen, setNotesOpen] = useState(false);

  const [mainChatOpen, setMainChatOpen] = useState(false);

  // State for whose chat is currently open
  const [name, setName] = useState('');

  // THis userName get the name of freind on whatsapp web
  const [userName, setUserName] = useState('');

  const [trucnatedName, setTruncatedName] = useState('');

  var currName = '';

  // Status
  const [statusOpen, setStatusOpen] = useState(false);

  // Right Panel
  const [rightSidePanelOpen, setRightSidePanel] = useState(false);

  var icons = $('._26lC3');

  var debug = false;
  var safetyDelayShort = 300;

  // Info of user which opens on right side
  var rightSidePanel = $('._2J8hu');

  // Waiting for User to log in and then inject the contentScript into the id app of whatsapp
  // so that extension works only after login. Refered from some github repo!
  function onMainUiReady() {
    try {
      // First check if the main UI is already ready, just in case
      if (document.querySelector('#app .two') != undefined) {
        if (debug)
          console.info(
            'WAT: Found main UI, will notify main UI ready event directly'
          );
        document.querySelector('#app .two').appendChild(root);
        rightSidePanel = $('._2J8hu');
        icons = $('._26lC3');
      } else {
        if (debug)
          console.info(
            'WAT: Setting up mutation observer for main UI ready event...'
          );

        var appElem = document.querySelector('#app');
        if (appElem != undefined) {
          var mutationObserver = new MutationObserver(function (mutations) {
            if (debug)
              console.info('WAT: Mutation observerd, will search main UI');

            // Check if main UI is now ready (new child div with class "two")
            if (document.querySelector('#app .two') != undefined) {
              if (debug)
                console.info(
                  'WAT: Found main UI, will notify main UI ready event'
                );

              mutationObserver.disconnect();
              setTimeout(function () {
                onMainUiReady();
              }, safetyDelayShort);
            }
          });

          mutationObserver.observe(appElem, { childList: true, subtree: true });
        }
      }
    } catch (err) {
      console.error(
        'WAT: Exception while setting up mutation observer for main UI ready event'
      );
      console.error(err);
    }
  }

  window.addEventListener('load', onMainUiReady, false);

  // Suggestion messages displayed when any chat is opened
  window.onload = function () {
    if (window.location.host === 'web.whatsapp.com') {
      setInterval(() => {
        var groupInfo = document.getElementsByClassName(
          'se2m7z6i p357zi0d f8m0rgwh ppled2lx tkdu00h0 gfz4du6o r7fjleex jv8uhy2r lhggkp7q qq0sjtgm ln8gz9je tm2tP copyable-area'
        );
        var item = document.getElementsByClassName('_2J8hu');
        var disappering = document.getElementsByClassName(
          'cumqsjf0 p357zi0d f8m0rgwh ppled2lx tkdu00h0 gfz4du6o r7fjleex jv8uhy2r lhggkp7q qq0sjtgm ln8gz9je tm2tP copyable-area'
        );
        var searchMessages = document.getElementsByClassName(
          'g6kkip0l p357zi0d f8m0rgwh ppled2lx tkdu00h0 gfz4du6o r7fjleex jv8uhy2r lhggkp7q qq0sjtgm ln8gz9je tm2tP copyable-area'
        );
        var mainChat = document.getElementById('main');
        if (mainChat) {
          retrieveName();
          setMainChatOpen(true);
        } else {
          setMainChatOpen(false);
          setNotesOpen(false);
          notesPanelCloseCss();
        }

        if (item[0] || disappering[0] || searchMessages[0] || groupInfo[0]) {
          setNotesOpen(false);
          notesPanelCloseCss();
          $('.notes-btn').css('left', '54%');
        } else {
          $('.notes-btn').css('left', '84%');
        }
      }, 100);
    }
  };

  useEffect(() => {
    var item = document.getElementsByClassName('_1QVfy _3UaCz');
    var btn = document.createElement('button');

    btn.innerHTML = 'Notes';
    btn.className = 'main-note-btn';
    btn.onclick = notesMaker;

    if (item[1]) {
      item[1].prepend(btn);
    }
  }, [name]);

  useEffect(() => {
    if (!notesOpen) {
      notesPanelCloseCss();
    }
  }, [notesOpen]);

  // Main chats which appears on center
  var mainChats = document.getElementById('main');

  const notesPanelOpenCss = () => {
    $('#side').css('width', '80%'),
      $('._3sh5K').css('left', '-90px'),
      $('#main').css('width', '66.1%');
    $('.ldL67 .zaKsw').css('width', '70%');
    $('.notes-btn').css('left', '54%');
  };

  const notesPanelCloseCss = () => {
    $('#side').css('width', '100%'),
      $('#app #main').css('width', '100%'),
      $('._3sh5K').css('left', '0px');
    $('.ldL67 .zaKsw').css('width', '100%');
    $('.notes-btn').css('left', '84%');
  };

  // Changing Whatsapp style when Notes are opened
  const changeStyleofWAUI = () => {
    if ((!notesOpen && rightSidePanel.length == 0) || !notesOpen) {
      notesPanelOpenCss();
    } else {
      notesPanelCloseCss();
    }
  };

  // Retrieving name of the person whose chat is currently opened
  const retrieveName = () => {
    if ($('._21nHd')[0] == undefined) return;
    currName = 'notes_' + $('._21nHd')[0].innerText;
    setUserName($('._21nHd')[0].innerText);
    if (userName.length >= 10) {
      var str = userName.substring(0, 10) + '...';
      setTruncatedName(str);
    }
    setName(currName);
  };
  // Funtction to check if the contact info and diappering message panel is open and notes open is true

  function checkContaInfoOpenandNOtesTrue() {
    var groupInfo = document.getElementsByClassName(
      'se2m7z6i p357zi0d f8m0rgwh ppled2lx tkdu00h0 gfz4du6o r7fjleex jv8uhy2r lhggkp7q qq0sjtgm ln8gz9je tm2tP copyable-area'
    );
    var item = document.getElementsByClassName('_2J8hu');
    var disappering = document.getElementsByClassName(
      'cumqsjf0 p357zi0d f8m0rgwh ppled2lx tkdu00h0 gfz4du6o r7fjleex jv8uhy2r lhggkp7q qq0sjtgm ln8gz9je tm2tP copyable-area'
    );
    var searchMessages = document.getElementsByClassName(
      'g6kkip0l p357zi0d f8m0rgwh ppled2lx tkdu00h0 gfz4du6o r7fjleex jv8uhy2r lhggkp7q qq0sjtgm ln8gz9je tm2tP copyable-area'
    );
    if (
      notesOpen === false &&
      (item[0] || disappering[0] || groupInfo[0] || searchMessages[0])
    ) {
      var mEvent = document.createEvent('MouseEvent');
      mEvent.initMouseEvent(
        'click',
        true,
        true,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      );

      var btn = document.querySelector('[data-testid="btn-closer-drawer"]');
      btn.dispatchEvent(mEvent);
    }
  }
  // Function called when Notes Button is clicked!!

  const notesMaker = () => {
    checkContaInfoOpenandNOtesTrue();
    setTimeout(() => {
      setNotesOpen((prev) => !prev);
    }, 250);

    changeStyleofWAUI();
    retrieveName();
  };

  useEffect(() => {
    if (notesOpen) {
      notesPanelOpenCss();
    }
  }, [name, notesOpen]);

  var contactInfo = $('._24-Ff');
  var serachIcon = icons[3];

  const closeRightPanel = () => {
    var closeButton = $('[data-icon = "x"]');
    closeButton[0].addEventListener('click', function (e) {
      setNotesOpen(false);
      notesPanelCloseCss();
    });
  };

  if (icons.length != 0 && serachIcon != undefined) {
    serachIcon.addEventListener('click', function (e) {
      notesPanelCloseCss();

      setTimeout(function () {
        closeRightPanel();
      }, 100);
    });
  }

  if (contactInfo.length != 0) {
    contactInfo[0].addEventListener('click', function (e) {
      notesPanelCloseCss();

      setTimeout(function () {
        closeRightPanel();
      }, 100);
    });
  }

  // when the ESC key is preseed the notesPanel is closed

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();

        // 👇️ your logic here
        setNotesOpen(false);
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    // 👇️ clean up event listener
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);

  return (
    <>
      {/* If notesOpen state is true and rightSidePanel i.e. info panel is not opened
                and mainChats window is currently open then only show notes    */}
      {notesOpen && mainChats && name && (
        <NotesProvider>
          <div className="container">
            <h2 className="notes-name">{name.substring(6)} Notes</h2>
            <div className="editor">
              <TextEditor name={name} />
            </div>
            {/* <DisplayNotes name = {currName}/> */}
            <NotesList name={name} />
          </div>
        </NotesProvider>
      )}

      {/* if mainChats window is not opened and notesOpen is true 
                then it will show Please select a chat!!  */}
      {notesOpen && mainChats === null && (
        <div className="container">
          <h2 style={{ textAlign: 'center' }}> Please select a chat!!</h2>
        </div>
      )}

      <ChatActionMenu name={userName} />
      {/* Suggestion Message which are displayed above the chatbox */}
      {name && (
        <SuggestionMessageProvider>
          <SuggestionMessage />
        </SuggestionMessageProvider>
      )}
    </>
  );
};

const root = document.createElement('div');
root.id = 'notes-ui';

ReactDOM.render(<App />, root);
