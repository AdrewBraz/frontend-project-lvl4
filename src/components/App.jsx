import React from 'react';
import {
  Container, Row, Col,
} from 'react-bootstrap';

import SideBar from './SideBar';
import Messages from './Messages';

export default class App extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Col xs={2}>
            <SideBar />
          </Col>
          <Col xs={6}>
            <Messages />
          </Col>
        </Row>
      </Container>
    );
  }
}
