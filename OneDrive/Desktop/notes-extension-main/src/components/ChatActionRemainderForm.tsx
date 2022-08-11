import React, { useEffect, useState } from 'react';
import '../styles/ChatActionRemainderForm.css';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import jQuery from 'jquery';
import DialogTitle from '@mui/material/DialogTitle';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'react-toastify/dist/ReactToastify.css';
function ChatActionRemainderForm(props) {
  const notifySuccess = () =>
    toast.success('You reminder has been set', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const notifyFailure = () =>
    toast.error('Opps! schedule is invalid', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const name = props.name;

  const storageName = 'Remainder_' + name; // storing the reaminder data in the form of 'Remainder_name

  //Variables for Dialogue box open or close
  const [remainderDialogueOpen, setRemainderDialogueOpen] = useState(false);

  const d = new Date();

  const latestTime = d.getHours + ':' + d.getMinutes;
  const [inputTime, setInputTime] = useState(latestTime);
  const [titleInput, setTitleInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [dateInput, setDateInput] = useState('');

  var chatActionMenu = document.querySelector('#chat-action-menu-ui');

  var remainder = document.createElement('div');
  remainder.id = 'set-remainder-div';
  remainder.className = 'chat-acftion-menu-items tooltip';

  var remainderChild1 = document.createElement('img');
  remainderChild1.id = 'remainder-child-1';
  remainderChild1.src = chrome.runtime.getURL('alarm.png');

  // var remainderChild2 = document.createElement('div');
  // remainderChild2.id = 'remainder-child-2';

  // var remainderChild21 = document.createElement('img');
  // remainderChild21.id = 'remainder-child-21';
  // remainderChild21.src = chrome.runtime.getURL('plus.png');

  // remainderChild2.appendChild(remainderChild21);

  var toolTipText = document.createElement('span');
  toolTipText.className = 'tooltiptext';
  toolTipText.innerHTML = 'Set reminder';
  remainder.appendChild(toolTipText);

  remainder.appendChild(remainderChild1);
  // remainder.appendChild(remainderChild2);
  // remainder.appendChild(chatActionMenuItem1);
  //Opne the dialogue box when remainder image is clicked

  remainder.onclick = function () {
    setRemainderDialogueOpen(true);
    // chatActionMenuItemsBackgroundChange.classList.add(
    //   'chat-action-menu-background-white'
    // );
    remainder.classList.add('chat-action-menu-background-white');
  };

  // chatActionMenuItem1.id = 'chat-action-menu-ui-item-1';

  //Making sure that the child is not appended multiple times

  if (chatActionMenu !== null) {
    if (document.querySelector('#set-remainder-div') === null) {
      chatActionMenu.appendChild(remainder);
    }
  }

  function handleRemainderDialogueClose() {
    setRemainderDialogueOpen(false);
    var remainderBackgroundColor = document.getElementById('set-remainder-div');
    remainderBackgroundColor.classList.remove(
      'chat-action-menu-background-white'
    );
  }

  // Function to perform operation after the submit button on Dialogue box is clicked

  function handleSubmitClick() {
    let x = inputTime;
    let hrs = parseInt(x.substring(0, 2));
    let min = parseInt(x.substring(3));

    let d = new Date();

    const year = parseInt(dateInput.substring(0, 4));
    const month = parseInt(dateInput.substring(5, 7));
    const day = parseInt(dateInput.substring(8, 10));

    const newInputTime = {
      hours: hrs,
      minutes: min,
      description: descriptionInput,
      title: titleInput,
      year: year,
      month: month - 1,
      day: day,
    };

    // Checking for valid time for remainder

    // &&
    // month >= d.getMonth() &&
    // day >= d.getDay() &&
    // hrs >= d.getHours() &&
    // min > d.getMinutes()
    let validData = true;

    if (year === d.getFullYear()) {
      console.log('Year same');
      if (month - 1 < d.getMonth()) {
        validData = false;
      } else if (month - 1 === d.getMonth()) {
        console.log('Month same');
        if (day < d.getDate()) {
          validData = false;
        } else if (day === d.getDate()) {
          console.log('day same');
          if (hrs < d.getHours()) {
            validData = false;
          } else if (hrs === d.getHours()) {
            console.log('hourse same');
            if (min <= d.getMinutes()) {
              validData = false;
            }
          }
        }
      }
    } else if (year < d.getFullYear()) {
      validData = false;
    }
    if (validData) {
      addTime(newInputTime);
    } else {
      // alert('Invalid Data');
      notifyFailure();
    }

    setRemainderDialogueOpen(false);
    var remainderBackgroundColor = document.getElementById('set-remainder-div');
    remainderBackgroundColor.classList.remove(
      'chat-action-menu-background-white'
    );

    // Resetting the values after the Dialogue box is closed

    setDescriptionInput('');
    setTitleInput('');
  }

  // Function to add the data of the remainder in local storage

  const addTime = (newInputTime: any) => {
    const userRemainder =
      localStorage.getItem(storageName) === null
        ? []
        : JSON.parse(localStorage.getItem(storageName));

    const newNoteArr = [newInputTime, ...userRemainder];

    newNoteArr.sort(compare); // Sorting the data according to date and time in increasing order and compare function is downwards

    localStorage.setItem(storageName, JSON.stringify(newNoteArr));
    notifySuccess();
  };

  chrome.storage.local.set({
    checkingNotificationTime: false,
    deleteItem: false,
    valueFilled: false,
  });

  // Calling the getTime function for ever 100ms

  setInterval(() => {
    getTime(storageName);
  }, 1000);

  // function to get the data from local storage

  const getTime = (name) => {
    const userRemainder =
      localStorage.getItem(name) === null
        ? []
        : JSON.parse(localStorage.getItem(name));
    chrome.storage.local.get(
      ['checkingNotificationTime', 'deleteItem', 'valueFilled'],
      (result) => {
        // valueFilled is helping to know whether we already  get the date and time or data to check

        if (!result.valueFilled) {
          // !result.checkingNotificationTime && !result.deleteItem &&

          if (userRemainder !== []) {
            const timeTocheck = userRemainder[0];

            if (timeTocheck !== undefined) {
              chrome.storage.local.set({
                checkingNotificationTime: true,
                valueFilled: true,
                hours: timeTocheck.hours,
                minutes: timeTocheck.minutes,
                year: timeTocheck.year,
                day: timeTocheck.day,
                month: timeTocheck.month,
                description: timeTocheck.description,
                title: timeTocheck.title,
              });
            }
          }
        } else {
          if (result.deleteItem) {
            // Deleting the first item in the array of data

            userRemainder.shift();

            // Deleting all the data from local storage

            localStorage.removeItem(name);

            //Sorting the array of data according to date and time

            userRemainder.sort(compare);

            // setting the new data in local storage

            localStorage.setItem(name, JSON.stringify(userRemainder));
            chrome.storage.local.set({
              deleteItem: false,
              checkingNotificationTime: false,
              valueFilled: false,
            });
          }
        }
      }
    );
  };

  // function to sor the array of object w.r.t year,month, day, hours, minutes

  function compare(a, b) {
    if (a.year !== b.year) {
      if (a.year > b.year) {
        return 1;
      }
      if (a.year < b.year) {
        return -1;
      }
    } else if (a.month !== b.month) {
      if (a.month > b.month) {
        return 1;
      }
      if (a.month < b.month) {
        return -1;
      }
    } else if (a.day !== b.day) {
      if (a.day > b.day) {
        return 1;
      }
      if (a.day < b.day) {
        return -1;
      }
    } else if (a.hours !== b.hours) {
      if (a.hours > b.hours) {
        return 1;
      }
      if (a.hours < b.hours) {
        return -1;
      }
    } else if (a.minutes !== b.minutes) {
      if (a.minutes > b.minutes) {
        return 1;
      }
      if (a.minutes < b.minutes) {
        return -1;
      }
    }

    return 0;
  }

  return (
    <>
      <Dialog
        open={remainderDialogueOpen}
        onClose={handleRemainderDialogueClose}
        id="chatActionRemainder-dialogue"
      >
        <div className="scheduleEventmodal-titleCloseBtn remainder-dialoge btn-hover">
          <button
            onClick={() => {
              setRemainderDialogueOpen(false);
              var remainderBackgroundColor =
                document.getElementById('set-remainder-div');
              remainderBackgroundColor.classList.remove(
                'chat-action-menu-background-white'
              );
            }}
          >
            &#10006;
          </button>
        </div>
        <DialogContent className="remainder-dialoge">
          <div id="chatActionRemainder">
            <div id="contents">
              <h1 className="title">Set a Reminder</h1>
              <div className="description">
                Once a Reminder is set, we will notify you at your chosen time.
              </div>
              <form id="chat-remainder-form">
                <div className="form-group">
                  <label className="form-groub-labels">Title</label>
                  <input
                    required
                    className="length-limit-input"
                    type="text"
                    placeholder={`Follow up with ${name}`}
                    onChange={(e) => setTitleInput(e.target.value)}
                    value={titleInput}
                  ></input>
                </div>

                <div className="form-group">
                  <label className="form-groub-labels">Time</label>
                  <input
                    required
                    type="time"
                    onChange={(e) => {
                      console.log(e.target.value);
                      setInputTime(e.target.value);
                    }}
                  ></input>
                </div>
                <div className="form-group">
                  <label className="form-groub-labels">Date</label>
                  <input
                    required
                    type="date"
                    onChange={(e) => {
                      setDateInput(e.target.value);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label className="form-groub-labels">
                    Description (Optional)
                  </label>
                  <input
                    value={descriptionInput}
                    onChange={(e) => setDescriptionInput(e.target.value)}
                  />
                </div>
              </form>
            </div>
          </div>
        </DialogContent>

        <DialogActions
          className="remainder-dialoge"
          id="remainder-dialoge-footer"
        >
          <Button onClick={handleSubmitClick} color="primary" autoFocus>
            Create
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default ChatActionRemainderForm;
