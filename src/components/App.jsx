import React from 'react';
import { Row, Spinner } from 'react-bootstrap';

import connect from '../connect';
import SideBar from './SideBar';
import Messages from './Messages';
import ModalEditForm from './ModalEditForm';

const mapStateToProps = (state) => {
  const { appState } = state;
  const props = { appState };
  return props;
};

export default @connect(mapStateToProps)
class App extends React.Component {
  renderSpinner = () => (
    <Spinner bsPrefix="d-flex align-items-center justify-content-center fixed-top h-100 w-100">
      <div className="spinner-border p-4 text-info" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </Spinner>
  )

  renderChat = () => (
    <Row>
      <SideBar />
      <Messages />
      <ModalEditForm />
    </Row>
  )

  renderApp = () => {
    const { appState } = this.props;
    if (appState !== 'processing') {
      return this.renderChat();
    }
    return this.renderSpinner();
  }

  render() {
    return (
      <div>
        { this.renderApp() }
      </div>
    );
  }
}
