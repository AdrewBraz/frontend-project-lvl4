// @ts-check
import React from 'react';
import { Button } from 'react-bootstrap';
import { Translation } from 'react-i18next';


import connect from '../connect';

export default @connect()
class NewChannelForm extends React.Component {
    handleClick = () => {
      const { modalStateAdd } = this.props;
      modalStateAdd();
    }

    render() {
      return (
        <div>
          <Button className="d-block w-100" variant="info" onClick={this.handleClick}>
            <Translation>
              {(t) => t('addChannel')}
            </Translation>
          </Button>
        </div>
      );
    }
}
