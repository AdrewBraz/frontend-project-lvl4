// @ts-check
import React from 'react';
import { Row, Navbar, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import getModal from './modals/index';

import SideBar from './SideBar';
import Messages from './Messages';
import Select from './Select';

const App = () => {
  const modal = useSelector((state) => state.chatState.modal);
  const channelEditId = useSelector((state) => state.chatState.channelEditId);
  console.log(channelEditId)
  const connectionState = useSelector((state) => state.connectionState);

  const renderModal = () => {
    if (modal === 'closed') {
      return null;
    }
    const Compontnet = getModal(modal);
    return <Compontnet modal={modal} channelEditId={channelEditId} />;
  };

  const renderChat = () => (
    <>
      <Row>
        <Navbar expand="lg" bg="light" className="bg-faded w-100 justify-content-between">
          <Navbar.Brand href="/">Chat</Navbar.Brand>
          <Navbar>
            <Select />
          </Navbar>
          <Navbar.Toggle data-toggle="collapse" data-target="#navbarSupportedContent">
            <span className="navbar-toggler-icon" />
          </Navbar.Toggle>
        </Navbar>
      </Row>
      <Row>
        <SideBar />
        <Messages />
        {renderModal(modal)}
      </Row>
    </>
  );

  const renderSpinner = () => (
    <Spinner animation="border" bsPrefix="d-flex align-items-center justify-content-center fixed-top h-100 w-100">
      <div className="spinner-border p-4 text-info" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </Spinner>
  );

  return (
    <div>
      { connectionState === 'disconnected' ? renderSpinner() : renderChat() }
    </div>
  );
};

export default App;
