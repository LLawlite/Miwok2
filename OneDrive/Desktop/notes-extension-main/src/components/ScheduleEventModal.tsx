import React from 'react';
import '../styles/ScheduleEventModal.css';

function ScheduleEventModal({ setOpenModal }) {
  return (
    <div
      className="scheduleEventmodal-Background"
      onClick={() => {
        setOpenModal(false);
        var scheduleMeetBackground = document.getElementById('schedule-meet');
        scheduleMeetBackground.classList.remove(
          'chat-action-menu-background-white'
        );
      }}
    >
      <div className="scheduleEventmodal-Container">
        <div className="scheduleEventmodal-titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
              var chatActionMenuItemsBackgroundChange =
                document.getElementById('schedule-meet');
              chatActionMenuItemsBackgroundChange.classList.add(
                'chat-action-menu-background-white'
              );
            }}
          >
            &#10006;
          </button>
        </div>
        <div id="schedule-meet-container">
          <div id="schedule-an-event">
            <div className="schedule-meet-child-header">
              <img src={chrome.runtime.getURL('event1.png')} alt="" />
              <h2>Schedule an event</h2>
            </div>
            <p>
              You can add title, event time, participants, description, meeting
              link and other details
            </p>
            <a
              href="https://calendar.google.com/calendar/u/0/r/eventedit"
              target="_blank"
            >
              <button id="schedule-btn" className="btn-hover">
                Schedule
              </button>
            </a>
          </div>

          <div className="vertical-line"></div>
          <div id="start-instant-meet">
            <div className="schedule-meet-child-header">
              <img src={chrome.runtime.getURL('./stopwatch.png')} alt="" />
              <h2>Create Instant Meet</h2>
            </div>
            <p>
              Create and enter an instant meeting link. You can later share the
              link with other participants
            </p>
            <a href="https://meet.google.com/_meet/new" target="_blank">
              <button id="create-meet-btn" className="btn-hover">
                Create
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScheduleEventModal;
