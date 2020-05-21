// @ts-check
import React from 'react';
import { Row, Navbar, Spinner } from 'react-bootstrap';
import getModal from './modals/index';
import connect from '../connect';

import SideBar from './SideBar';
import Messages from './Messages';
import Select from './Select';


const mapStateToProps = (state) => {
  const { connectionState, chatState } = state;
  const { modal, channelEditId } = chatState;
  const props = { connectionState, modal, channelEditId };
  return props;
};

export default @connect(mapStateToProps)
class App extends React.Component {
  renderModal = (modal) => {
    if (modal === 'closed') {
      return null;
    }
    const Compontnet = getModal(modal);
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Compontnet {...this.props} />;
  }

  renderChat = () => {
    const { modal } = this.props;
    return (
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
          {this.renderModal(modal)}
        </Row>
      </>
    );
  }

  renderSpinner = () => (
    <Spinner animation="border" bsPrefix="d-flex align-items-center justify-content-center fixed-top h-100 w-100">
      <div className="spinner-border p-4 text-info" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </Spinner>
  );

  render() {
    const { connectionState } = this.props;
    return (
      <div>
        { connectionState === 'disconnected' ? this.renderSpinner() : this.renderChat() }
      </div>
    );
  }
}
