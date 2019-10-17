import React from 'react';
import { Row } from 'react-bootstrap';

import SideBar from './SideBar';
import Messages from './Messages';
import ModalEditForm from './ModalEditForm';

function App() {
  return (
    <Row>
      <SideBar />
      <Messages />
      <ModalEditForm />
    </Row>
  );
}

export default App;
