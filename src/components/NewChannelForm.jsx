// @ts-check
import React from 'react';
import { Button } from 'react-bootstrap';

import connect from '../connect';

const mapStateToProps = (state) => {
  const { channels } = state;
  const props = {
    channels,
  };
  return props;
};

export default
@connect(mapStateToProps)
class NewChannelForm extends React.Component {
    handleClick = () => {
      const { modalStateAdd } = this.props;
      modalStateAdd();
    }

    render() {
      return (
        <Button variant="primary" onClick={this.handleClick}>Add channel</Button>
      );
    }
}
