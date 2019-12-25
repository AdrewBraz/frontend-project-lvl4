// @ts-check
import React from 'react';
import axios from 'axios';
import routes from '../routes';

import Form from './Form';
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
    handleSubmitForm = async (name, { resetForm, setSubmitting }) => {
      try {
        const data = { attributes: name };
        await axios.post(routes.channelsPath(), { data });
        resetForm();
        setSubmitting(false);
      } catch (e) {
        throw new Error('Something went wrong');
      }
    }

    render() {
      const translations = {
        btn: 'addBtn',
        placeholder: 'channelName',
      };
      return (
        <Form name="name" submitForm={this.handleSubmitForm} translation={translations} />
      );
    }
}
