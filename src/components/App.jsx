import React from 'react';
import SideBar from './SideBar';
import Messages from './Messages';

function App() {
  return (
    <div className="d-flex">
      <SideBar />
      <Messages />
    </div>
  );
}

export default App;
