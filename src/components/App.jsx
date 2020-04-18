// @ts-check

import React from 'react';
import { Row, Navbar } from 'react-bootstrap';
import connect from '../connect';

import SideBar from './SideBar';
import Messages from './Messages';
import Select from './Select';
import Spinner from './Spinner';
import getModal from './modals/index';

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

  render() {
    const { connectionState } = this.props;
    return (
      <div>
        { connectionState === 'disconnected' ? <Spinner /> : this.renderChat() }
      </div>
    );
  }
}
