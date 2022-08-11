chrome.runtime.onInstalled.addListener((async function(e) {
    send_notification("Mobbana is installed", '');
}));

chrome.alarms.create('remainderNotification', {
    periodInMinutes: 1 / 60,
  });
  
  
  // showing the notification if the required date and time is matched with the current data and time
  
  chrome.alarms.onAlarm.addListener((alarm) => {
    chrome.storage.local.get(
      [
        'hours',
        'minutes',
        'day',
        'month',
        'year',
        'title',
        'description',
        'checkingNotificationTime',
        'deleteItem',
        'valueFilled',
      ],
  
  
      function (result) {
        let d = new Date();
        let hrs = d.getHours();
        let min = d.getMinutes();
        let dy=d.getDate();
        let y=d.getFullYear();
        let month=d.getMonth();
     
       
        
        if (result.valueFilled)
         {
          if (hrs === result.hours && min === result.minutes && result.month===d.getMonth() && result.day===d.getDate() && result.year===d.getFullYear() ) {
            send_notification(result.title, result.message);
  
            chrome.storage.local.set({
              checkingNotificationTime: false,
              deleteItem: true,
              valueFilled:false,
            });
          }
        }
      }
    );
  });

function send_notification(title, message) {
    try {
        this.registration.showNotification(title, {body: message, icon: 'icon.png'});
    } catch (e) {}
}