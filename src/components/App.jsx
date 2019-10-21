import React from 'react';
import { connect } from 'react-redux';
import { Row, Spinner } from 'react-bootstrap';

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

  renderApp = () => (
    <Row>
      <SideBar />
      <Messages />
      <ModalEditForm />
    </Row>
  )

  render() {
    const { appState } = this.props;
    return (
      <div>
        { appState === 'processing' ? this.renderSpinner() : this.renderApp()}
      </div>
    );
  }
}
