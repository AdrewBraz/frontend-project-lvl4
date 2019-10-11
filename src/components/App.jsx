import React from 'react';
import SideBar from './SideBar';
import Messages from './Messages';
import ModalEditForm from './ModalEditForm';

function App() {
  return (
    <div className="d-flex">
      <SideBar />
      <Messages />
      <ModalEditForm />
    </div>
  );
}

export default App;
