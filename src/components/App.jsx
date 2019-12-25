// @ts-check

import React from 'react';
import { Row, Navbar } from 'react-bootstrap';
import { connect } from 'react-redux';

import SideBar from './SideBar';
import Messages from './Messages';
import ModalEditForm from './ModalEditForm';
import Select from './Select';
import Spinner from './Spinner';

const mapStateToProps = (state) => {
  const { connectionState } = state;
  const props = { connectionState };
  return props;
};

export default @connect(mapStateToProps)
class App extends React.Component {
  renderChat = () => (
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
        <ModalEditForm />
      </Row>
    </>
  )

  render() {
    const { connectionState } = this.props;
    return (
      <div>
        { connectionState === 'disconnected' ? <Spinner /> : this.renderChat() }
      </div>
    );
  }
}
