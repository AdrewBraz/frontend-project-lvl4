// @ts-check
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from '../../http';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import actions from '../../actions';
import routes from '../../routes';

const RemoveModal = (props) => {
  const { modal, channelEditId } = props;
  console.log(props)
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleRemoveChannel = async () => {
    try {
      console.log(channelEditId)
      await axios.delete(routes.channelPath(channelEditId));
    } catch (e) {
      throw new Error(e);
    }
    dispatch(actions.modalStateClose());
  };

  const handleSwitchToEdit = () => {
    dispatch(actions.modalStateEdit({ id: channelEditId }));
  };

  return (
    <Modal show={modal === 'removing'} onHide={handleSwitchToEdit}>
      <Modal.Header closeButton>
        <Modal.Title>{t('deleteChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column align-items-center">
        <p className="pb-3 border-bottom border-dark">
          {t('deleteQuestion')}
        </p>
        <div className="d-flex justify-content-around">
          <Button className="mr-3" variant="danger" type="button" onClick={handleRemoveChannel}>
            {t('deleteBtn')}
          </Button>
          <Button className="ml-3" variant="primary" type="button" onClick={handleSwitchToEdit}>
            {t('backToEdit')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveModal;
