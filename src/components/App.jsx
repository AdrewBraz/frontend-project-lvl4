import React from 'react';
import {
  Container, Row, Col,
} from 'react-bootstrap';

import SideBar from './SideBar';

export default class App extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Col xs={2}>
            <SideBar />
          </Col>
          <Col xs={6} />
        </Row>
      </Container>
    );
  }
}
