import React from 'react';
import ReactDOM from 'react-dom';
import './popup.css';

const App: React.FC<{}> = () => {
  return (
    <div>
      <img src="icon.png" />
      <img src="event1.png" />
    </div>
  );
};

const root = document.createElement('div');
document.body.appendChild(root);
ReactDOM.render(<App />, root);
