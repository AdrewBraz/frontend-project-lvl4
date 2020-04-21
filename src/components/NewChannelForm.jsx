// @ts-check
import React from 'react';
import { Button } from 'react-bootstrap';
import { Translate } from 'react-redux-i18n';


import connect from '../connect';

export default
@connect()
class NewChannelForm extends React.Component {
    handleClick = () => {
      const { modalStateAdd } = this.props;
      modalStateAdd();
    }

    render() {
      return (
        <div>
          <Button className="d-block w-100" variant="info" onClick={this.handleClick}>
            <Translate value="application.addChannel" />
          </Button>
        </div>
      );
    }
}
